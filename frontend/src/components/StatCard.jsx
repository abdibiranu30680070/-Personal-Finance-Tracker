import React from 'react';

const StatCard = ({ title, amount, icon, color }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-black text-gray-900 mt-1">ETB {Number(amount || 0).toLocaleString()}</p>
        </div>
        <div className={`p-4 bg-${color}-50 rounded-2xl`}>
            {icon}
        </div>
    </div>
);

export default StatCard;
