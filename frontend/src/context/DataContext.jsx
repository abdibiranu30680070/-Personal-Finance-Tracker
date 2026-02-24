import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import * as api from '../api';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser && storedUser !== 'undefined') {
                return JSON.parse(storedUser);
            }
        } catch (err) {
            console.error('Error parsing user from localStorage:', err);
            localStorage.removeItem('user');
        }
        return null;
    });
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ total_income: 0, total_expenses: 0, balance: 0, category_totals: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isLoggedIn = !!user;

    const fetchData = useCallback(async (currentUser = null) => {
        // Use either the passed user (for immediate fetch after login) or the current state user
        const activeUser = currentUser || user;

        if (!activeUser) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const [transRes, summaryRes] = await Promise.all([
                api.getTransactions(),
                api.getSummary()
            ]);
            setTransactions(transRes.data);
            setSummary(summaryRes.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            if (err.response?.status === 401) {
                logout();
            } else {
                setError('Failed to load data. Is the backend running?');
            }
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [isLoggedIn, fetchData]);

    const handleAuth = async (authData, isLogin) => {
        try {
            const authPromise = isLogin
                ? api.login({ email: authData.email, password: authData.password })
                : api.register({ name: authData.name, email: authData.email, password: authData.password });

            const res = await authPromise;
            const { user: userData, token } = res.data;

            // Set token first so subsequent API calls in fetchData use it
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            // Set loading true BEFORE setting user to ensure AppContent stays in loading state
            setLoading(true);
            setUser(userData);

            // Fetch data immediately with the new user data
            await fetchData(userData);

            return userData;
        } catch (err) {
            console.error('Authentication error:', err);
            throw err;
        }
    };

    const handleUpdateProfile = async (profileData) => {
        try {
            const res = await api.updateProfile(profileData);
            const { user: updatedUser } = res.data;
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        } catch (err) {
            console.error('Update profile error:', err);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setTransactions([]);
        setSummary({ total_income: 0, total_expenses: 0, balance: 0, category_totals: [] });
    };

    const handleFormSubmit = async (formData, editingTransactionId) => {
        if (!user) {
            toast.error('User profile not found. Please refresh.');
            return;
        }
        const savePromise = editingTransactionId
            ? api.updateTransaction(editingTransactionId, formData)
            : api.createTransaction(formData);

        return toast.promise(savePromise, {
            loading: editingTransactionId ? 'Updating...' : 'Saving...',
            success: () => {
                fetchData();
                return editingTransactionId ? 'Transaction updated!' : 'Transaction saved!';
            },
            error: 'Failed to save transaction',
        });
    };

    const confirmDeleteTransaction = async (id) => {
        const deletePromise = api.deleteTransaction(id);

        return toast.promise(deletePromise, {
            loading: 'Deleting...',
            success: () => {
                fetchData();
                return 'Transaction deleted';
            },
            error: 'Failed to delete transaction',
        });
    };

    return (
        <DataContext.Provider value={{
            user,
            isLoggedIn,
            transactions,
            summary,
            loading,
            error,
            fetchData,
            handleAuth,
            handleUpdateProfile,
            logout,
            handleFormSubmit,
            confirmDeleteTransaction
        }}>
            {children}
        </DataContext.Provider>
    );
};
