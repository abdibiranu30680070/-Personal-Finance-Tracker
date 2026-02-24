import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Apple } from "lucide-react";

// Inline Input Component for consistent styling
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

const AuthForm = ({ isLogin, onSubmit, isSubmitting }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!isLogin && name.trim().length < 2)
            newErrors.name = "Please enter your full name";

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Min. 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit(isLogin ? { email, password } : { name, email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
                <InputField
                    icon={<User size={20} />}
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    error={errors.name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                />
            )}

            <InputField
                icon={<Mail size={20} />}
                type="email"
                placeholder="Email Address"
                value={email}
                error={errors.email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
            />

            <InputField
                icon={<Lock size={20} />}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                error={errors.password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isLogin ? "current-password" : "new-password"}
            >
                <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-orange-600 transition-colors"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
            </InputField>

            {isLogin && (
                <div className="flex justify-end">
                    <button type="button" className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline">
                        Forgot Password?
                    </button>
                </div>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black hover:shadow-lg hover:shadow-gray-900/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isSubmitting ? (
                    <span className="animate-pulse">Processing...</span>
                ) : (
                    <>
                        {isLogin ? "Log In" : "Create Account"}
                        <ArrowRight size={18} />
                    </>
                )}
            </button>

            {/* Social login removed per UX request */}
        </form>
    );
};

export default AuthForm;