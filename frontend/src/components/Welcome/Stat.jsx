import React from "react";

const Stat = ({ label, value }) => (
    <div className="hover:-translate-y-2 transition duration-300">
        <p className="text-xs uppercase font-bold text-gray-400 mb-1">
            {label}
        </p>
        <p className="text-3xl font-black text-gray-900">
            {value}
        </p>
    </div>
);

export default Stat;
