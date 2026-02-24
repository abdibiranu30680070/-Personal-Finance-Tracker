import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Toaster } from 'react-hot-toast';
import { Menu, Wallet } from 'lucide-react';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Toaster position="top-right" />

            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-xl">
                            <Wallet className="text-white" size={20} />
                        </div>
                        <h1 className="text-lg font-black text-gray-900 tracking-tighter">Finance<span className="text-blue-600">Pro</span></h1>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto w-full max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
