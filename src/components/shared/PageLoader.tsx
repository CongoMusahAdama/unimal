import React from 'react';

const PageLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#003366]/95 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="relative group">
                {/* 1. Outer Spinning High-End Ring */}
                <div className="w-32 h-32 rounded-full border-[1px] border-white/10 border-t-brand-red animate-spin-slow"></div>

                {/* 2. Secondary Pulse Ring */}
                <div className="absolute inset-0 w-32 h-32 rounded-full border-[1px] border-[#00adff]/20 animate-ping opacity-20"></div>

                {/* 3. Logo Container with Waterfall/Wave Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-24 h-24 overflow-hidden rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-white/10 group-hover:scale-110 transition-transform duration-500">
                        {/* The Actual Logo */}
                        <img src="/logo.png" alt="Unimanuel" className="w-16 h-16 object-contain z-10 relative" />

                        {/* Waterfall / Wave Overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none">
                            <div className="absolute bottom-0 left-0 w-[200%] h-[40%] bg-[#0081cc]/20 animate-wave-slow"></div>
                            <div className="absolute bottom-0 left-[-50%] w-[200%] h-[35%] bg-[#00adff]/30 animate-wave-fast"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center space-y-3">
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] mb-1">Unimanuel Ventures</span>
                    <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] relative overflow-hidden">
                        Refreshing Data
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00adff] to-transparent animate-shimmer"></span>
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
