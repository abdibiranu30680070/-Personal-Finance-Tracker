import React from "react";
import { Bar } from "react-chartjs-2";

const OverviewChart = ({ comparisonData }) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-8">Overview</h2>
        <div className="h-64">
            <Bar
                data={comparisonData}
                options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
                        x: { grid: { display: false } }
                    }
                }}
            />
        </div>
    </div>
);

export default OverviewChart;
