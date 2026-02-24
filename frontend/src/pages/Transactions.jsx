import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import DeleteModal from '../components/DeleteModal';
import TransactionFilters from '../components/TransactionFilters';
import Pagination from '../components/Pagination';
import { Plus } from 'lucide-react';

const Transactions = () => {
    const { transactions, loading, error, handleFormSubmit, confirmDeleteTransaction } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [deleteModalState, setDeleteModalState] = useState({ isOpen: false, transactionId: null });

    // Filtering State
    const [filterType, setFilterType] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filteredTransactions = transactions.filter(t => {
        const matchesType = filterType === 'all' || t.type === filterType;
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesDate = true;
        if (startDate || endDate) {
            const transDate = new Date(t.date);
            if (startDate) {
                matchesDate = matchesDate && transDate >= new Date(startDate);
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                matchesDate = matchesDate && transDate <= end;
            }
        }
        return matchesType && matchesSearch && matchesDate;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

    const handleAddClick = () => {
        setEditingTransaction(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (transaction) => {
        setEditingTransaction(transaction);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteModalState({ isOpen: true, transactionId: id });
    };

    const handleResetFilters = () => {
        setStartDate('');
        setEndDate('');
        setFilterType('all');
        setSearchTerm('');
        setCurrentPage(1);
    };

    if (loading && transactions.length === 0) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Transactions</h1>
                    <p className="text-gray-500 mt-1">Manage all your income and expenses.</p>
                </div>
                <button
                    onClick={handleAddClick}
                    className="inline-flex items-center px-4 py-2 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition shadow-lg shadow-orange-200"
                >
                    <Plus size={20} className="mr-2" />
                    Add Transaction
                </button>
            </header>

            <TransactionFilters
                searchTerm={searchTerm}
                onSearchChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
                filterType={filterType}
                onFilterTypeChange={(val) => { setFilterType(val); setCurrentPage(1); }}
                startDate={startDate}
                onStartDateChange={setStartDate}
                endDate={endDate}
                onEndDateChange={setEndDate}
                onReset={handleResetFilters}
            />

            <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {error && <div className="p-4 bg-red-50 text-red-600 text-sm">{error}</div>}
                    <TransactionList
                        transactions={paginatedTransactions}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                    />
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredTransactions.length}
                    startIndex={startIndex}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>

            <TransactionForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={(data) => {
                    handleFormSubmit(data, editingTransaction?.id);
                    setIsFormOpen(false);
                }}
                initialData={editingTransaction}
            />

            <DeleteModal
                isOpen={deleteModalState.isOpen}
                onClose={() => setDeleteModalState({ isOpen: false, transactionId: null })}
                onConfirm={() => {
                    confirmDeleteTransaction(deleteModalState.transactionId);
                    setDeleteModalState({ isOpen: false, transactionId: null });
                }}
                itemName="transaction"
            />
        </div>
    );
};

export default Transactions;
