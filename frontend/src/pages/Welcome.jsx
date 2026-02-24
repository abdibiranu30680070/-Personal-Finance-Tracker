import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Shield } from "lucide-react";
import toast from "react-hot-toast";
import HeroSection from "../components/Welcome/HeroSection";
import AuthForm from "../components/Welcome/AuthForm";

const Welcome = () => {
    const { handleAuth } = useData();
    const [isLogin, setIsLogin] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onAuthSubmit = async (authData) => {
        setIsSubmitting(true);
        const authPromise = handleAuth(authData, isLogin);

        toast.promise(authPromise, {
            loading: isLogin ? "Logging you in..." : "Creating secure account...",
            success: {
                render: isLogin ? "Welcome back!" : "Account created successfully!",
                duration: 3000,
            },
            error: {
                render: (err) => {
                    const msg = err?.response?.data?.error;
                    return msg || "Authentication failed";
                },
                duration: 4000,
            }
        });

        try {
            await authPromise;
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-gradient-to-br from-orange-50 via-white to-slate-100 relative overflow-x-hidden">
            {/* Animated Background Glows - Contained */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden h-96">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl animate-pulse" />
            </div>
            <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none overflow-hidden h-96">
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-24 relative z-10">
                <HeroSection />
            </div>

            {/* Right Auth Section */}
            <div className="flex items-center justify-center w-full lg:w-5/12 p-4 sm:p-8 lg:p-12 relative z-10">
                <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl shadow-2xl border border-white/50">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h2>
                        <p className="text-gray-500">
                            {isLogin
                                ? "Log in to continue managing your finances"
                                : "Start your financial journey today"}
                        </p>
                    </div>

                    <AuthForm
                        isLogin={isLogin}
                        isSubmitting={isSubmitting}
                        onSubmit={onAuthSubmit}
                    />

                    <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500 uppercase font-bold">
                        <Shield size={14} className="text-green-500" />
                        Bank-Level Encryption
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        {isLogin ? "New here?" : "Already have an account?"}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-orange-600 font-bold hover:underline"
                        >
                            {isLogin ? "Register" : "Log In"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;