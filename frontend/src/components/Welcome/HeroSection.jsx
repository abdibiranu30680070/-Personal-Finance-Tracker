import React from "react";
import { Wallet } from "lucide-react";
import Stat from "./Stat";

const HeroSection = () => {
    return (
        <div className="w-full relative py-6 md:py-8 lg:py-0">
            <div className="space-y-6 md:space-y-10 z-10 max-w-full sm:max-w-3xl relative">
                {/* Logo */}
                <div className="flex items-center gap-3 animate-fade-in-down">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 sm:p-3 rounded-2xl shadow-lg shadow-orange-500/30">
                        <Wallet className="text-white" size={22} sm:size={28} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-gray-900 italic tracking-tighter">
                        Ethio<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500">Finance</span>
                    </h1>
                </div>

                {/* Headline */}
                <div className="space-y-4">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] text-gray-900 tracking-tight break-words">
                        Own Your Money.
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600">
                            Control Your Future.
                        </span>
                    </h2>

                    <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed font-semibold">
                        The smartest way to track, analyze and grow your finances
                        in Ethiopia. Built specifically for <span className="text-gray-900 font-bold">Ethiopian Birr (ETB)</span> transactions.
                    </p>
                </div>

                {/* Removed Stats Section - Non Functional */}
            </div>
        </div>
    );
};

export default HeroSection;
