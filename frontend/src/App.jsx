import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import { useData } from './context/DataContext';
import Welcome from './pages/Welcome';

function AppContent() {
    const { isLoggedIn, loading } = useData();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <Routes>
                <Route path="*" element={<Welcome />} />
            </Routes>
        );
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Transactions />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

function App() {
    return (
        <DataProvider>
            <Router>
                <AppContent />
            </Router>
            <Toaster position="top-right" />
        </DataProvider>
    );
}

export default App;
