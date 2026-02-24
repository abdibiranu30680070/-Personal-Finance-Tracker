import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Shield } from "lucide-react";
import toast from "react-hot-toast";
import HeroSection from "../components/Welcome/HeroSection";
import AuthForm from "../components/Welcome/AuthForm";
import BackgroundBlobs from "../components/Welcome/BackgroundBlobs";
import { useRef } from "react";

const Welcome = () => {
    const { handleAuth } = useData();
    const [isLogin, setIsLogin] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const authRef = useRef(null);

    const onAuthSubmit = async (authData) => {
        setIsSubmitting(true);
        const authPromise = handleAuth(authData, isLogin);

        toast.promise(authPromise, {
            loading: isLogin ? "Logging you in..." : "Creating secure account...",
            success: isLogin ? "Welcome back!" : "Account created successfully!",
            error: (err) => {
                const msg = err?.response?.data?.error;
                return msg || "Authentication failed";
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

    const scrollToAuth = () => {
        authRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row font-sans bg-gradient-to-br from-orange-50 via-white to-slate-100 relative overflow-x-hidden">
            {/* decorative animated blobs */}
            <BackgroundBlobs />

            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 lg:p-16 xl:p-24 relative z-10">
                <HeroSection onGetStarted={scrollToAuth} />
            </div>

            {/* Right Auth Section */}
            <div ref={authRef} className="flex items-center justify-center w-full lg:w-5/12 p-4 sm:p-8 lg:p-12 relative z-10 animate-fade-in">
                <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow border border-white/50">
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
                            className="ml-2 text-orange-600 font-bold hover:underline hover:text-orange-700 transition-colors"
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