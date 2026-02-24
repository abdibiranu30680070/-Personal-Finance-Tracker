import React from "react";
import { Pie } from "react-chartjs-2";

const CategoryChart = ({ categoryData }) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-8">Categories</h2>
        <div className="h-72">
            <Pie
                data={categoryData}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { usePointStyle: true, font: { weight: 'bold' } } }
                    }
                }}
            />
        </div>
    </div>
);

export default CategoryChart;
