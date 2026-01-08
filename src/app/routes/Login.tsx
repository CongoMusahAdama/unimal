import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth/AuthContext';
import type { UserRole } from '../../types';

const Login: React.FC = () => {
    const [role, setRole] = useState<UserRole>('OWNER');
    const [password, setPassword] = useState('admin123');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(role);
        navigate('/dashboard');
    };

    const roles: { value: UserRole; label: string; disabled?: boolean }[] = [
        { value: 'OWNER', label: 'Owner / Administrator', disabled: false },
        { value: 'ACCOUNTANT', label: 'Financial Accountant', disabled: true },
        { value: 'PRODUCTION_SUPERVISOR', label: 'Production Supervisor', disabled: true },
        { value: 'INVENTORY_OFFICER', label: 'Inventory Manager', disabled: true },
        { value: 'SALES_OFFICER', label: 'Sales & Distribution', disabled: true },
        { value: 'QC_OFFICER', label: 'Quality Control', disabled: true },
        { value: 'MAINTENANCE_OFFICER', label: 'Maintenance Engineer', disabled: true },
        { value: 'INPUTER', label: 'Data Inputer', disabled: false },
    ];

    return (
        <div className="min-h-screen bg-[#f5e6d3] flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl overflow-hidden">
                {/* Logo - Centered at Top */}
                <div className="flex justify-center pt-8 pb-4 bg-white">
                    <img src="/logo.png" alt="Unimanuel Logo" className="h-16 lg:h-20 w-auto drop-shadow-lg" />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                    {/* Left Side - Illustration */}
                    <div className="relative bg-gradient-to-br from-[#0081cc] to-[#003366] p-12 lg:p-16 flex items-center justify-center overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                            <div className="absolute bottom-20 right-10 w-24 h-24 border-4 border-white rounded-full"></div>
                            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
                        </div>

                        {/* Illustration Content */}
                        <div className="relative z-10 text-center space-y-6 w-full">
                            {/* Professional Working Person Image */}
                            <div className="w-full max-w-md mx-auto">
                                <img
                                    src="/images/login_illustration.png"
                                    alt="Professional at work"
                                    className="w-full h-auto drop-shadow-2xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">Welcome Back!</h2>
                                <p className="text-white/80 font-medium text-sm lg:text-base max-w-sm mx-auto">
                                    Access your Unimanuel Ventures management portal
                                </p>
                            </div>
                        </div>

                        {/* Bottom Decoration */}
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="p-8 lg:p-16 flex flex-col justify-center">
                        <div className="max-w-md mx-auto w-full space-y-8">
                            {/* Header */}
                            <div className="space-y-3">
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Welcome back to your portal</h1>
                                <p className="text-slate-500 text-sm font-medium">
                                    Select your role and enter your credentials to access the Unimanuel management system.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Role Selection */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Access Role</label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value as UserRole)}
                                        className="w-full bg-slate-50 border-0 text-slate-900 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#0081cc] transition-all cursor-pointer font-medium text-sm"
                                    >
                                        {roles.map((r) => (
                                            <option key={r.value} value={r.value} disabled={r.disabled}>
                                                {r.label} {r.disabled ? '(Coming Soon)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-50 border-0 text-slate-900 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#0081cc] transition-all font-medium text-sm placeholder:text-slate-400"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#0081cc] hover:bg-[#003366] text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] text-sm"
                                >
                                    Let's start!
                                </button>
                            </form>

                            {/* Footer Note */}
                            <p className="text-center text-xs text-slate-400 pt-4 border-t border-slate-100">
                                Licensed Voltic Cool Pac System • Takoradi, Western Region
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
