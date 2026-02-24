import React from "react";
import { BarChart3 } from "lucide-react";
import { Bar } from "react-chartjs-2";

const FinancialOverviewChart = ({ income, expense }) => (
    <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
        <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3 italic">
            <BarChart3 className="text-orange-600" size={24} />
            Financial Overview
        </h3>
        <div className="h-[400px]">
            <Bar
                data={{
                    labels: ['Income', 'Expense'],
                    datasets: [{
                        label: 'Amount (ETB)',
                        data: [income, expense],
                        backgroundColor: ['#56a717', '#f27021'],
                        borderRadius: 16,
                        barThickness: 60,
                    }]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { display: false } },
                        x: { grid: { display: false } }
                    }
                }}
            />
        </div>
    </div>
);

export default FinancialOverviewChart;
