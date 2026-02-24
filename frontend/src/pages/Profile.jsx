import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { User, Mail, Shield, Save, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, handleUpdateProfile } = useData();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [profilePicture, setProfilePicture] = useState(user?.profile_picture ?? '');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setProfilePicture(user.profile_picture ?? '');
        }
    }, [user]);

    const handlePictureChange = () => {
        // Simulation of profile picture change
        const demoPictures = [
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Aria',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
            'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna'
        ];
        const randomPic = demoPictures[Math.floor(Math.random() * demoPictures.length)];
        setProfilePicture(randomPic);
        toast.success('Generated a premium avatar for you!');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) return;

        setIsSaving(true);
        try {
            await handleUpdateProfile({ name, email, profile_picture: profilePicture });
            toast.success('Profile updated successfully!');
        } catch (err) {
            const errorMsg = err.response?.data?.error || 'Failed to update profile';
            toast.error(errorMsg);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-2xl px-4 py-8">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Profile Settings</h1>
                <p className="text-gray-500 mt-2 font-medium">Manage your identity and account details.</p>
            </header>

            <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl shadow-blue-500/5 overflow-hidden">
                <div className="bg-blue-600 h-40 relative">
                    <div className="absolute -bottom-16 left-12 group">
                        <div className="p-2 bg-white rounded-[32px] shadow-2xl">
                            <div className="w-32 h-32 bg-gray-100 rounded-3xl overflow-hidden relative border-4 border-gray-50">
                                {profilePicture ? (
                                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-blue-50">
                                        <User size={48} className="text-blue-300" />
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={handlePictureChange}
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                >
                                    <Camera size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-24 p-12">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 gap-8">
                            <div className="space-y-3">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-gray-50/50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-500/5 transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                        placeholder="Your official name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-gray-50/50 border-2 border-transparent rounded-[24px] focus:bg-white focus:border-blue-600 focus:ring-8 focus:ring-blue-500/5 transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                        placeholder="Your contact email"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-blue-500 font-bold mt-2 flex items-center gap-1.5 px-1">
                                    <Shield size={14} /> Account verified
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSaving || (name === user?.name && email === user?.email && profilePicture === (user?.profile_picture ?? ''))}
                                className="inline-flex items-center px-10 py-5 bg-blue-600 text-white font-black rounded-[24px] hover:bg-blue-700 transition shadow-2xl shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none hover:-translate-y-1 active:scale-95 group"
                            >
                                <Save size={24} className="mr-3 group-hover:scale-110 transition-transform" />
                                {isSaving ? 'Updating...' : 'Save Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
