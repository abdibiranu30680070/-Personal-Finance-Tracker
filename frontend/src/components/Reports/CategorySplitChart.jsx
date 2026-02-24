import React from "react";
import { PieChart as PieChartIcon } from "lucide-react";
import { Pie } from "react-chartjs-2";

const CategorySplitChart = ({ data, hasData }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3 italic">
            <PieChartIcon className="text-blue-600" size={24} />
            Category Split
        </h3>
        <div className="h-[400px] flex flex-col justify-center">
            {hasData ? (
                <Pie
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, font: { weight: 'bold' } } } }
                    }}
                />
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-400 font-bold">No data for this period</p>
                </div>
            )}
        </div>
    </div>
);

export default CategorySplitChart;
