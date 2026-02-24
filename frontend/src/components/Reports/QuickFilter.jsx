import React from "react";

const QuickFilter = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="px-4 py-2 text-xs font-black text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
    >
        {label}
    </button>
);

export default QuickFilter;
