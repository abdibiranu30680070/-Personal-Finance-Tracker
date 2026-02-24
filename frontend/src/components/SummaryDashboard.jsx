import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

const SummaryDashboard = ({ summary }) => {
    const { total_income, total_expenses, balance } = summary;

    const cards = [
        {
            title: 'Total Income',
            amount: total_income,
            icon: <TrendingUp className="text-green-500" />,
            bgColor: 'bg-green-100',
        },
        {
            title: 'Total Expenses',
            amount: total_expenses,
            icon: <TrendingDown className="text-red-500" />,
            bgColor: 'bg-red-100',
        },
        {
            title: 'Current Balance',
            amount: balance,
            icon: <Wallet className="text-blue-500" />,
            bgColor: 'bg-blue-100',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-6 mb-8">
            {cards.map((card, index) => (
                <div key={index} className="bg-white p-6 2xl:p-8 rounded-xl shadow-sm border border-gray-100 transition-transform hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 2xl:p-4 rounded-lg ${card.bgColor}`}>
                            {React.cloneElement(card.icon, { size: 24, className: `${card.icon.props.className} 2xl:w-8 2xl:h-8` })}
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm 2xl:text-base font-medium">{card.title}</h3>
                    <p className="text-2xl 2xl:text-4xl font-bold text-gray-900">
                        ${parseFloat(card.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default SummaryDashboard;
