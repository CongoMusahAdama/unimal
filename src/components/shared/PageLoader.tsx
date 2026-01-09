import React from 'react';
import { Droplets } from 'lucide-react';

const PageLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#003366] overflow-hidden animate-in fade-in duration-500">
            {/* Background Animated Elements */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#0081cc] rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ce1126] rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Main Liquid Container */}
                <div className="relative w-40 h-40 mb-12">
                    {/* Outer Glow Ring */}
                    <div className="absolute inset-x-0 inset-y-0 rounded-full border border-white/5 animate-spin-slow"></div>
                    <div className="absolute inset-x-[-10px] inset-y-[-10px] rounded-full border border-white/5 animate-reverse-spin opacity-50"></div>

                    {/* The Sachet / Drop Shape */}
                    <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex items-center justify-center group border-4 border-white/10">
                        {/* Internal Liquid Fill */}
                        <div className="absolute inset-0 bg-slate-50">
                            <div className="absolute bottom-0 left-0 w-[200%] h-[120%] bg-[#0081cc] opacity-10 animate-liquid-rise transition-all"></div>
                            <div className="absolute bottom-[-10%] left-[-50%] w-[200%] h-[100%] bg-[#00adff] opacity-10 animate-liquid-wavetwo"></div>
                        </div>

                        {/* Logo Central */}
                        <div className="relative z-20 transform group-hover:scale-110 transition-transform duration-700">
                            <img src="/logo.png" alt="Unimanuel" className="w-24 h-24 object-contain animate-float" />
                        </div>
                    </div>

                    {/* Floating Droplets */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-bounce-slow">
                        <Droplets className="text-[#00adff] opacity-40" size={24} />
                    </div>
                </div>

                {/* Typography & Branding */}
                <div className="text-center space-y-4">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.6em] mb-2 animate-pulse mt-4">Operational Intelligence</span>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic flex items-center space-x-3">
                            <span className="text-[#00adff]">VOLTIC</span>
                            <span className="w-2 h-2 rounded-full bg-brand-red animate-ping mt-1"></span>
                            <span>COOL PAC</span>
                        </h2>
                    </div>

                    {/* Technical Progress Bar */}
                    <div className="w-48 h-1 bg-white/10 rounded-full mx-auto relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00adff] to-[#ce1126] w-full animate-progress-flow origin-left"></div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translate(-50%, 0px); opacity: 0.2; }
                    50% { transform: translate(-50%, -20px); opacity: 0.6; }
                }
                @keyframes liquid-rise {
                    0% { transform: translateX(-50%) translateY(20%) rotate(0deg); }
                    100% { transform: translateX(-50%) translateY(-20%) rotate(360deg); }
                }
                @keyframes liquid-wavetwo {
                    0% { transform: translateX(0%) translateY(30%) rotate(0deg); }
                    100% { transform: translateX(-50%) translateY(-30%) rotate(-360deg); }
                }
                @keyframes progress-flow {
                    0% { transform: scaleX(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: scaleX(1); opacity: 0; }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes reverse-spin {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
                .animate-liquid-rise { animation: liquid-rise 8s linear infinite; border-radius: 40%; }
                .animate-liquid-wavetwo { animation: liquid-wavetwo 10s linear infinite; border-radius: 35%; }
                .animate-progress-flow { animation: progress-flow 2s ease-in-out infinite; }
                .animate-spin-slow { animation: spin-slow 12s linear infinite; }
                .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
            `}</style>
        </div>
    );
};

export default PageLoader;
