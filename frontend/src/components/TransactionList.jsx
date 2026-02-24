import React from 'react';
import { Pencil, Trash2, ArrowUpCircle, ArrowDownCircle, Calendar, Tag, History } from 'lucide-react';
import { format } from 'date-fns';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
    if (transactions.length === 0) {
        return (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <History className="text-gray-300" size={32} />
                </div>
                <p className="text-gray-500 font-medium">No transactions yet. Add one to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 lg:hidden">
                {transactions.map((t) => (
                    <div key={t.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${t.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {t.type === 'income' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{t.category}</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t.type}</p>
                                </div>
                            </div>
                            <div className="flex gap-1">
                                <button onClick={() => onEdit(t)} className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors">
                                    <Pencil size={18} />
                                </button>
                                <button onClick={() => onDelete(t.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-1">{t.description || 'No description'}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Calendar size={14} />
                                <span className="text-xs font-medium">{format(new Date(t.date), 'MMM dd, yyyy')}</span>
                            </div>
                            <p className={`font-black text-lg ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                {t.type === 'income' ? '+' : '-'}ETB {parseFloat(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em]">Date</th>
                                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em]">Category</th>
                                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em]">Description</th>
                                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em]">Amount</th>
                                <th className="px-8 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.1em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3 text-gray-500 font-medium">
                                            <Calendar size={16} className="text-gray-300" />
                                            {format(new Date(t.date), 'MMM dd, yyyy')}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl ${t.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                {t.type === 'income' ? <ArrowUpCircle size={18} /> : <ArrowDownCircle size={18} />}
                                            </div>
                                            <span className="font-bold text-gray-900">{t.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-gray-500 font-medium">{t.description || '-'}</td>
                                    <td className="px-8 py-6">
                                        <span className={`font-black text-lg ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {t.type === 'income' ? '+' : '-'}ETB {parseFloat(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => onEdit(t)} className="p-2.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all">
                                                <Pencil size={20} />
                                            </button>
                                            <button onClick={() => onDelete(t.id)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
