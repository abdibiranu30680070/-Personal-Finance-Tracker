import React from "react";
import { Printer } from "lucide-react";

const ReportsHeader = ({ onPrint, isPrintDisabled }) => (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">
                Financial <span className="text-orange-600">Intelligence</span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">Advanced reporting powered by Ethio Telecom.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
            <button
                onClick={onPrint}
                disabled={isPrintDisabled}
                className="flex-1 md:flex-none inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95 disabled:opacity-50"
            >
                <Printer size={20} className="mr-2 text-orange-500" />
                Print / Download PDF
            </button>
        </div>
    </header>
);

export default ReportsHeader;
