import React from "react";
import { Line } from "react-chartjs-2";

const ActivityChart = ({ trendData }) => (
    <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-800">Weekly Activity</h2>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Last 7 Days</span>
        </div>
        <div className="h-72">
            <Line
                data={trendData}
                options={{
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, font: { weight: 'bold' } } } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
                        x: { grid: { display: false } }
                    }
                }}
            />
        </div>
    </div>
);

export default ActivityChart;
