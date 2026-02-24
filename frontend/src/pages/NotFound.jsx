import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-slate-200 text-center border border-slate-100 flex flex-col items-center">
                <div className="bg-orange-50 p-6 rounded-full mb-8">
                    <AlertCircle size={64} className="text-orange-600" />
                </div>

                <h1 className="text-8xl font-black text-gray-900 mb-4 tracking-tighter">404</h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 italic">ገጹ አልተገኘም — Page Not Found</h2>

                <p className="text-gray-500 font-medium mb-10 leading-relaxed">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95 group"
                >
                    <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                    Back to Dashboard
                </button>

                <p className="mt-12 text-[10px] text-gray-400 font-black uppercase tracking-widest leading-loose">
                    Ethio Telecom Finance Tracker<br />
                    የኢትዮ ቴሌኮም የግል ፋይናንስ መከታተያ
                </p>
            </div>
        </div>
    );
};

export default NotFound;
