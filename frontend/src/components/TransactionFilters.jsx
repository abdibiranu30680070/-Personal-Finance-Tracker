import React from "react";
import { Search, Filter } from "lucide-react";

const TransactionFilters = ({
    searchTerm,
    onSearchChange,
    filterType,
    onFilterTypeChange,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange,
    onReset
}) => {
    return (
        <div className="flex flex-col xl:flex-row gap-4 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search description or category..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 transition font-medium"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 bg-gray-50 rounded-xl">
                    <Filter className="text-gray-400" size={18} />
                    <select
                        className="bg-transparent border-none py-2 text-sm font-bold text-gray-700 focus:ring-0"
                        value={filterType}
                        onChange={(e) => onFilterTypeChange(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className="flex items-center gap-2 px-3 bg-gray-50 rounded-xl">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-wider">From</span>
                    <input
                        type="date"
                        className="bg-transparent border-none py-2 text-sm font-bold text-gray-700 focus:ring-0"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 px-3 bg-gray-50 rounded-xl">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-wider">To</span>
                    <input
                        type="date"
                        className="bg-transparent border-none py-2 text-sm font-bold text-gray-700 focus:ring-0"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                    />
                </div>

                {(startDate || endDate || filterType !== 'all' || searchTerm) && (
                    <button
                        onClick={onReset}
                        className="px-4 py-2 text-sm font-bold text-orange-600 hover:bg-orange-50 rounded-xl transition"
                    >
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
};

export default TransactionFilters;
