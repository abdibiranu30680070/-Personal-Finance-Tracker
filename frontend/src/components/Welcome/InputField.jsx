import React from "react";

const InputField = ({ icon, type, placeholder, value, onChange, error, children, autoComplete }) => (
    <div className="space-y-1">
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className={`w-full pl-12 pr-4 py-4 bg-white border ${error ? "border-red-500" : "border-gray-200"
                    } rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none font-semibold`}
            />
            {children}
        </div>
        {error && (
            <p className="text-red-500 text-xs font-bold">{error}</p>
        )}
    </div>
);

export default InputField;
