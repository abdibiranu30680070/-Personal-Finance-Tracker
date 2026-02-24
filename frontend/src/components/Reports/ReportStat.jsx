import React from "react";

const ReportStat = ({ label, value, icon, color, bgColor, prefix = "" }) => (
    <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all">
        <div className={`absolute top-6 right-6 p-3 ${bgColor} ${color} rounded-2xl transition-transform group-hover:scale-110`}>
            {icon}
        </div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-2xl font-black ${color} tracking-tight`}>
            {prefix} ETB {Math.abs(value).toLocaleString()}
        </p>
    </div>
);

export default ReportStat;
