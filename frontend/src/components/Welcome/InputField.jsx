import React from "react";

const InputField = ({ icon, type, placeholder, value, error, onChange, autoComplete, children }) => (
    <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors">
            {icon}
        </div>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
            className={`w-full bg-gray-50 border-2 ${error ? 'border-red-300 focus:border-red-500' : 'border-transparent focus:border-orange-500'} pl-12 pr-12 py-4 rounded-2xl outline-none transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400 hover:bg-white focus:bg-white shadow-sm`}
        />
        {children}
        {error && <p className="absolute -bottom-5 left-1 text-xs text-red-500 font-bold animate-pulse">{error}</p>}
    </div>
);

export default InputField;