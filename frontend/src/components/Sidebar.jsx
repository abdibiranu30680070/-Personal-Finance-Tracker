import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, User, Wallet, X, LogOut, FileBarChart } from 'lucide-react';
import { useData } from '../context/DataContext';

const Sidebar = ({ isOpen, onClose }) => {
    const { logout, user } = useData();
    const navItems = [
        { path: '/', name: 'Transactions', icon: <Receipt size={20} /> },
        { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/reports', name: 'Reports', icon: <FileBarChart size={20} /> },
        { path: '/profile', name: 'Profile', icon: <User size={20} /> },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <aside
                aria-label="Main Navigation"
                className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col 
                transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-600 p-2.5 rounded-2xl shadow-lg shadow-orange-200">
                            <Wallet className="text-white" size={24} />
                        </div>
                        <h1 className="text-2xl font-black text-gray-900 tracking-tighter italic">Ethio<span className="text-orange-600">Finance</span></h1>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close Sidebar"
                        className="lg:hidden p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* User Profile Summary */}
                <div className="px-6 mb-4">
                    <div className="p-5 bg-slate-50 rounded-[32px] border border-slate-100 flex items-center gap-4 group hover:bg-white hover:border-orange-100 transition-all duration-300">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-orange-100 flex items-center justify-center shrink-0 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
                            {user?.profile_picture ? (
                                <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="text-orange-600" size={24} />
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="text-sm font-black text-gray-900 truncate leading-none mb-1.5">{user?.name || 'User'}</h3>
                            <p className="text-[11px] font-bold text-gray-400 truncate uppercase tracking-widest">{user?.email || 'Guest'}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 mt-8">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    onClick={() => {
                                        // Auto-close on mobile when a link is clicked
                                        if (window.innerWidth < 1024) {
                                            onClose();
                                        }
                                    }}
                                    aria-label={`Go to ${item.name}`}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive
                                            ? 'bg-orange-600 text-white shadow-xl shadow-orange-200 font-bold scale-[1.02]'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
                                        }`
                                    }
                                >
                                    {item.icon}
                                    <span className="text-sm tracking-wide">{item.name}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-6">
                    <button
                        onClick={logout}
                        aria-label="Sign Out"
                        className="w-full mt-6 flex items-center gap-3 px-4 py-3.5 rounded-2xl text-red-500 hover:bg-red-50 font-bold transition-all duration-300"
                    >
                        <LogOut size={20} />
                        <span className="text-sm tracking-wide">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
