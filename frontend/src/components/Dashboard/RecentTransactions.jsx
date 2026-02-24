import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const RecentTransactions = ({ transactions }) => (
    <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-gray-800">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
            <a href="/transactions" className="text-sm font-bold text-blue-600 hover:underline">View All</a>
        </div>
        <div className="space-y-4">
            {transactions.map(t => (
                <div key={t.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">{t.description}</p>
                            <p className="text-sm text-gray-500 font-medium">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p className={`text-lg font-black ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {t.type === 'income' ? '+' : '-'}ETB {Number(t.amount).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

export default RecentTransactions;
