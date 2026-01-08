import React, { useState, useEffect } from 'react';
import {
    Droplets,
    DollarSign,
    AlertTriangle,
    Users,
    Truck,
    Package,
    Plus,
    History,
    Activity,
    Factory,
    Calculator,
    ClipboardCheck,
    Wrench,
    FileText,
    ArrowRight
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import BaseModal from '../../components/modals/BaseModal';
import { useStaff } from '../../context/StaffContext';
import ProductionForm from '../../components/forms/ProductionForm';
import SalesForm from '../../components/forms/SalesForm';
import InventoryForm from '../../components/forms/InventoryForm';
import ExpenseForm from '../../components/forms/ExpenseForm';
import QCForm from '../../components/forms/QCForm';
import HRForm from '../../components/forms/HRForm';

// Mock Data
const summaryStats = [
    { label: "Today's Production", value: "4,250", sub: "Bags", trend: "+12%", color: "bg-[#0081cc]", icon: Droplets },
    { label: "Current Stock", value: "8,500", sub: "Units", trend: "-5%", color: "bg-amber-500", icon: Package },
    { label: "Daily Sales", value: "₵12,480", sub: "Value", trend: "+8.4%", color: "bg-[#003366]", icon: DollarSign },
    { label: "Pending Tasks", value: "12", sub: "Alerts", trend: "Active", color: "bg-[#ce1126]", icon: AlertTriangle },
];

const pendingApprovals = [
    { id: '1', task: 'Inventory Adjustment', dept: 'Store', priority: 'High', time: '10 mins ago' },
    { id: '2', task: 'Wastage Report #402', dept: 'Production', priority: 'Medium', time: '1 hr ago' },
    { id: '3', task: 'New Vendor Entry', dept: 'Finance', priority: 'Low', time: '3 hrs ago' },
];

const InputerDashboard: React.FC = () => {
    //const { staffList, clockIn, clockOut } = useStaff();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        title: string;
        type: 'production' | 'sales' | 'inventory' | 'expense' | 'qc' | 'hr' | null;
    }>({
        isOpen: false,
        title: '',
        type: null
    });

    const openModal = (type: 'production' | 'sales' | 'inventory' | 'expense' | 'qc' | 'hr', title: string) => {
        setModalConfig({ isOpen: true, title, type });
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    const handleSubmit = () => {
        // Here we would typically handle the API call
        alert(`${modalConfig.title} record saved successfully!`);
        closeModal();
    };

    const quickActions = [
        { label: 'Add Production', icon: Factory, color: 'text-blue-600', bgColor: 'bg-blue-50', description: 'Log daily production runs', type: 'production' },
        { label: 'Record Sales', icon: Truck, color: 'text-green-600', bgColor: 'bg-green-50', description: 'Entry for truck loading & deliveries', type: 'sales' },
        { label: 'Issue Stock', icon: Package, color: 'text-amber-600', bgColor: 'bg-amber-50', description: 'Manage inventory withdrawals', type: 'inventory' },
        { label: 'Log Expense', icon: Calculator, color: 'text-rose-600', bgColor: 'bg-rose-50', description: 'Record petty cash & operational costs', type: 'expense' },
        { label: 'Quality Log', icon: ClipboardCheck, color: 'text-indigo-600', bgColor: 'bg-indigo-50', description: 'Water tests & batch sign-offs', type: 'qc' },
        { label: 'Attendance', icon: Users, color: 'text-teal-600', bgColor: 'bg-teal-50', description: 'Track employee shift presence', type: 'hr' },
    ] as const;

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* 1. HEADER & KPIS */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter mb-2">Data Entry Command Center</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Primary CRUD Portal for Operational Records</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
                    {/* 1. Digital Clock (Left) */}
                    <div className="w-full lg:w-[280px] bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 flex flex-col items-center justify-center text-center text-white shadow-2xl relative overflow-hidden group min-h-[280px] md:min-h-[320px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-center space-x-2 mb-4 opacity-80">
                                <History size={20} />
                                <span className="text-xs font-bold uppercase tracking-[0.2em]">Digital Time Keeper</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter tabular-nums mb-2 leading-none">
                                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                            </h2>
                            <p className="text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed mt-2">
                                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    {/* 2. Metrics Grid (Center) */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 content-start">
                        {summaryStats.map((stat, i) => (
                            <div key={i} className={`${stat.color} p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] shadow-xl relative overflow-hidden group min-h-[140px] md:min-h-[160px]`}>
                                <div className="absolute -right-8 -top-8 text-white/10 group-hover:scale-110 transition-transform duration-500">
                                    <stat.icon size={120} strokeWidth={1} />
                                </div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">{stat.label}</span>
                                        <div className="p-2 bg-white/10 rounded-xl text-white">
                                            <stat.icon size={14} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter">{stat.value}</h3>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1.5">{stat.sub} • {stat.trend}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 3. Pending Tasks Sidebar (Right) */}
                    <div className="w-full lg:w-[320px] bg-white p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-slate-50 shadow-sm h-fit">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Pending Tasks</h3>
                            <Activity size={16} className="text-[#ce1126]" />
                        </div>
                        <div className="space-y-4">
                            {pendingApprovals.map((task) => (
                                <div key={task.id} className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                                    <div className={`w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-slate-800 tracking-tight">{task.task}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{task.dept} • {task.time}</p>
                                    </div>
                                    <button className="text-slate-300 group-hover:text-slate-900 transition-colors">
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all">
                            View All Tasks
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. QUICK ACTIONS (CRUD HUB) */}
            <div>
                <div className="flex items-center space-x-4 mb-8">
                    <span className="w-10 h-1 bg-[#0081cc] rounded-full"></span>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Quick Entry Actions</h3>
                </div>

                {/* (Staff Control Moved to HR Module) */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                    {quickActions.map((action, i) => (
                        <button
                            key={i}
                            onClick={() => openModal(action.type, action.label)}
                            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group text-left flex flex-col justify-between h-auto min-h-[220px]"
                        >
                            <div className={`${action.bgColor} ${action.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <action.icon size={24} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">{action.label}</h4>
                                <p className="text-[10px] font-bold text-slate-400 leading-tight">{action.description}</p>
                            </div>
                            <div className="mt-4 flex items-center text-[10px] font-black text-[#0081cc] uppercase tracking-widest transition-opacity">
                                <span>Open Form</span>
                                <Plus size={12} className="ml-1" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <BaseModal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                title={modalConfig.title}
            >
                {modalConfig.type === 'production' && <ProductionForm onSubmit={handleSubmit} onCancel={closeModal} />}
                {modalConfig.type === 'sales' && <SalesForm onSubmit={handleSubmit} onCancel={closeModal} />}
                {modalConfig.type === 'inventory' && <InventoryForm onSubmit={handleSubmit} onCancel={closeModal} />}
                {modalConfig.type === 'expense' && <ExpenseForm onSubmit={handleSubmit} onCancel={closeModal} />}
                {modalConfig.type === 'qc' && <QCForm onSubmit={handleSubmit} onCancel={closeModal} />}
                {modalConfig.type === 'hr' && <HRForm onSubmit={handleSubmit} onCancel={closeModal} />}
            </BaseModal>

            {/* 3. DEPARTMENTAL STATUS RECAP */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Production Recap */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm overflow-hidden relative">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Production Flow</h3>
                            <p className="text-xs font-bold text-slate-400">Shift A vs Shift B Output</p>
                        </div>
                        <div className="flex space-x-2">
                            <div className="h-8 w-8 bg-[#0081cc]/10 rounded-lg flex items-center justify-center text-[#0081cc]">
                                <Factory size={16} />
                            </div>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Sachets', a: 1200, b: 1100 },
                                { name: 'Bottles 500ml', a: 800, b: 950 },
                                { name: 'Bottles 1.5L', a: 400, b: 380 },
                                { name: 'Dispenser', a: 200, b: 220 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="a" fill="#003366" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="b" fill="#0081cc" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activities / Audit Trail */}
                <div className="bg-[#1e1e2d] p-10 rounded-[3rem] text-white shadow-xl flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tight">Recent Logs</h3>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Your Data Entry History</p>
                        </div>
                        <History size={20} className="text-white/20" />
                    </div>
                    <div className="space-y-6 flex-1">
                        {[
                            { action: 'Production Log', item: '450 Bags Sachets', time: '20 mins ago', user: 'Self' },
                            { action: 'Stock Issue', item: '5 Rolls Film', time: '1 hr ago', user: 'Self' },
                            { action: 'Expense Record', item: 'Fuel - GH₵200', time: '3 hrs ago', user: 'Self' },
                            { action: 'Sales Entry', item: 'Invoice #882', time: '5 hrs ago', user: 'Self' },
                        ].map((log, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40 border border-white/5">
                                    <FileText size={16} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-black text-white leading-tight">{log.action}</p>
                                    <p className="text-[10px] font-bold text-white/30 uppercase mt-0.5">{log.item}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-white/20 uppercase">{log.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-8 text-xs font-black uppercase text-[#00adff] hover:text-white transition-colors flex items-center justify-center space-x-2">
                        <span>View All My Entries</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* Department Quick Links */}
            <div className="bg-slate-900 p-12 rounded-[4rem] text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0081cc] opacity-5 rounded-full -mr-[250px] -mt-[250px] blur-[120px] pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter">Department Modules</h3>
                            <p className="text-sm font-bold text-white/40 uppercase tracking-widest mt-2">Direct access for deeper operations</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Finance', icon: Calculator, path: '/dashboard/finance' },
                            { name: 'Production', icon: Factory, path: '/dashboard/production' },
                            { name: 'Inventory', icon: Package, path: '/dashboard/inventory' },
                            { name: 'Sales', icon: Truck, path: '/dashboard/sales' },
                            { name: 'QC Control', icon: ClipboardCheck, path: '/dashboard/qc' },
                            { name: 'Maintenance', icon: Wrench, path: '/dashboard/maintenance' },
                            { name: 'HR / Staff', icon: Users, path: '/dashboard/hr' },
                            { name: 'Reports', icon: FileText, path: '/dashboard/reports' },
                        ].map((module, i) => (
                            <a
                                key={i}
                                href={module.path}
                                className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all group flex flex-col items-center text-center"
                            >
                                <module.icon size={24} className="text-white/40 group-hover:text-white transition-colors mb-3" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{module.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputerDashboard;
