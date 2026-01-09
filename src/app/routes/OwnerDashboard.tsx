import React, { useState } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    Truck,
    Package,
    ArrowRight,
    ShieldAlert,
    History,
    Activity,
    Info,
    Factory,
    Wrench,
    ClipboardCheck
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

import { useStaff } from '../../context/StaffContext';
import { useNavigate } from 'react-router-dom';
import BaseModal from '../../components/modals/BaseModal';

// Mock Data
const productionEfficiency = [
    { name: 'Shift A', target: 2000, actual: 1850 },
    { name: 'Shift B', target: 2000, actual: 2100 },
    { name: 'Shift C', target: 1500, actual: 1420 },
];

const inventoryData = [
    { name: 'Preforms', value: 85, color: '#0081cc' },
    { name: 'Laminated Film', value: 65, color: '#ff8c00' },
    { name: 'Packing Bags', value: 20, color: '#ce1126' },
    { name: 'Chemicals', value: 95, color: '#10b981' },
];

const alerts = [
    { msg: 'High wastage alert in Production Line 2', time: '10:45 AM', type: 'High', dept: 'Production' },
    { msg: 'Unusual expense spike: Machine Part #402', time: '09:20 AM', type: 'Medium', dept: 'Maintenance' },
    { msg: 'Inventory mismatch: Preform stock low', time: '08:15 AM', type: 'High', dept: 'Inventory' },
    { msg: 'Repeated machine breakdown on Bagging Line 1', time: 'Yesterday', type: 'Medium', dept: 'Maintenance' },
];

const logs = [
    { action: 'Production Record Created', user: 'James (Supervisor)', time: '10:30 AM', dept: 'Prod' },
    { action: 'Sales Invoice #4928 Issued', user: 'Sarah (Sales)', time: '09:45 AM', dept: 'Sales' },
    { action: 'Inventory Withdrawal: 50 Rolls', user: 'Kofi (Store)', time: '08:20 AM', dept: 'Store' },
];

const OwnerDashboard: React.FC = () => {
    const navigate = useNavigate();
    const { getTotalTeamHours, staffList } = useStaff();
    const [isRevenueModalOpen, setIsRevenueModalOpen] = useState(false);
    const [isActiveStaffModalOpen, setIsActiveStaffModalOpen] = useState(false);
    const [isTotalStaffModalOpen, setIsTotalStaffModalOpen] = useState(false);

    const totalHours = getTotalTeamHours();
    const activeStaff = staffList.filter(s => s.status === 'Active' || s.status === 'On Route');
    const activeStaffCount = activeStaff.length;
    const totalStaffCount = staffList.length;

    const deptRevenue = [
        { name: 'Water Production', value: 8500, icon: Factory, color: 'text-blue-600', path: '/dashboard/production' },
        { name: 'Sachet Sales', value: 12480, icon: Truck, color: 'text-green-600', path: '/dashboard/sales' },
        { name: 'Spare Parts/Maint', value: 1200, icon: Wrench, color: 'text-amber-600', path: '/dashboard/maintenance' },
        { name: 'Other Services', value: 450, icon: DollarSign, color: 'text-slate-600', path: '/dashboard/finance' },
    ];

    const totalRevenue = deptRevenue.reduce((acc, curr) => acc + curr.value, 0);

    const dynamicKpis = [
        { label: "Today's Revenue", value: `₵${totalRevenue.toLocaleString()}`, sub: "Gross Daily", trend: "+15%", color: "bg-[#003366]", icon: DollarSign, onClick: () => setIsRevenueModalOpen(true) },
        { label: "Fleet Loading", value: "28", sub: "Trucks & Cars", trend: "+4", color: "bg-indigo-600", icon: Truck },
        { label: "Workforce Total", value: `${totalStaffCount}`, sub: "Full Directory", trend: "Stable", color: "bg-purple-600", icon: Users, onClick: () => setIsTotalStaffModalOpen(true) },
        { label: "Active Now", value: `${activeStaffCount}`, sub: "On-Site Team", trend: "Live", color: "bg-emerald-600", icon: Activity, onClick: () => setIsActiveStaffModalOpen(true) },
        { label: "Work Hours", value: `${totalHours.toFixed(1)}h`, sub: "Total Today", trend: "+5.1%", color: "bg-[#0081cc]", icon: History },
        { label: "Credit Risk", value: "₵3,330", sub: "Outstanding", trend: "-2.5%", color: "bg-amber-500", icon: ShieldAlert },
        { label: "Op. Health", value: "98.2%", sub: "Production Yield", trend: "+1.2%", color: "bg-rose-600", icon: ClipboardCheck },
    ];

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* 1. TOP SUMMARY BAR - ROW 1 (4 CARDS) */}
            <div className="flex xl:grid xl:grid-cols-4 gap-8 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                {dynamicKpis.slice(0, 4).map((kpi, i) => (
                    <button
                        key={i}
                        onClick={kpi.onClick}
                        className={`${kpi.color} p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group text-left relative overflow-hidden h-[220px] flex flex-col justify-between flex-shrink-0 w-[240px] xl:w-full`}
                    >
                        <div className="absolute -right-8 -bottom-8 text-white/10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                            <kpi.icon size={140} strokeWidth={1} />
                        </div>

                        <div className="relative z-10 w-full">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{kpi.label}</span>
                                <div className="p-2 bg-white/10 rounded-xl">
                                    <kpi.icon size={14} className="text-white" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{kpi.value}</h3>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1.5">{kpi.sub}</p>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between w-full mt-4">
                            <div className="bg-white/10 px-2 py-0.5 rounded-full flex items-center space-x-1">
                                {typeof kpi.trend === 'string' && kpi.trend.startsWith('+') ? <TrendingUp size={10} className="text-white" /> : <TrendingDown size={10} className="text-white" />}
                                <span className="text-[9px] font-black text-white">{kpi.trend}</span>
                            </div>
                            {kpi.onClick && (
                                <div className="flex items-center space-x-1 text-[9px] font-black text-white/70 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                    <span>Details</span>
                                    <ArrowRight size={10} />
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* 1. TOP SUMMARY BAR - ROW 2 (3 CARDS) */}
            <div className="flex xl:grid xl:grid-cols-3 gap-8 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                {dynamicKpis.slice(4).map((kpi, i) => (
                    <button
                        key={i}
                        onClick={kpi.onClick}
                        className={`${kpi.color} p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group text-left relative overflow-hidden h-[220px] flex flex-col justify-between flex-shrink-0 w-[240px] xl:w-full`}
                    >
                        <div className="absolute -right-8 -bottom-8 text-white/10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                            <kpi.icon size={140} strokeWidth={1} />
                        </div>

                        <div className="relative z-10 w-full">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">{kpi.label}</span>
                                <div className="p-2 bg-white/10 rounded-xl">
                                    <kpi.icon size={14} className="text-white" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{kpi.value}</h3>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1.5">{kpi.sub}</p>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between w-full mt-4">
                            <div className="bg-white/10 px-2 py-0.5 rounded-full flex items-center space-x-1">
                                {typeof kpi.trend === 'string' && kpi.trend.startsWith('+') ? <TrendingUp size={10} className="text-white" /> : <TrendingDown size={10} className="text-white" />}
                                <span className="text-[9px] font-black text-white">{kpi.trend}</span>
                            </div>
                            {kpi.onClick && (
                                <div className="flex items-center space-x-1 text-[9px] font-black text-white/70 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                    <span>Details</span>
                                    <ArrowRight size={10} />
                                </div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* 2. DAILY OPERATIONS SNAPSHOT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Production Snapshot */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Production</h3>
                            <p className="text-xs font-bold text-slate-400">Today's Target vs Actual</p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                            <Factory size={22} />
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={productionEfficiency} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="actual" fill="#0081cc" radius={[4, 4, 0, 0]} barSize={24} />
                                <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales Snapshot */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Sales Mix</h3>
                            <p className="text-xs font-bold text-slate-400">Cash vs Credit Breakdown</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-2xl text-green-700">
                            <TrendingUp size={22} />
                        </div>
                    </div>
                    <div className="h-64 flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={[{ name: 'Cash', value: 75 }, { name: 'Credit', value: 25 }]} innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                                    <Cell fill="#10b981" /><Cell fill="#f59e0b" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center min-w-[80px]">
                            <span className="text-[10px] font-black text-slate-400 uppercase">Total</span>
                            <p className="text-lg font-black tracking-tighter text-slate-900">₵12.4k</p>
                        </div>
                    </div>
                </div>

                {/* Inventory Alerts */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Inventory Status</h3>
                            <p className="text-xs font-bold text-slate-400">Stock Levels</p>
                        </div>
                        <div className="bg-amber-100 p-3 rounded-2xl text-amber-700"><Package size={22} /></div>
                    </div>
                    <div className="space-y-6 flex-1">
                        {inventoryData.map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-500">
                                    <span>{item.name}</span><span>{item.value}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Audit & Logs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#003366] p-10 rounded-[3rem] text-white shadow-xl">
                    <h3 className="text-xl font-black uppercase mb-8">Operational Risks</h3>
                    <div className="space-y-4">
                        {alerts.map((alert, i) => (
                            <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5">
                                <p className="text-sm font-bold">{alert.msg}</p>
                                <p className="text-[10px] text-white/40 mt-1 uppercase">{alert.dept} • {alert.time}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm">
                    <h3 className="text-xl font-black uppercase text-slate-900 mb-8">Audit Logs</h3>
                    <div className="space-y-6">
                        {logs.map((log, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Info size={18} /></div>
                                <div className="flex-1">
                                    <p className="text-sm font-black text-slate-800 leading-none">{log.action}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">{log.user}</p>
                                </div>
                                <div className="text-right"><p className="text-xs font-black text-slate-300">{log.time}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <BaseModal
                isOpen={isRevenueModalOpen}
                onClose={() => setIsRevenueModalOpen(false)}
                title="Revenue Intelligence"
            >
                <div className="p-4 space-y-8">
                    <div className="relative bg-[#003366] p-8 rounded-[2.5rem] text-white overflow-hidden shadow-2xl">
                        <div className="absolute -right-10 -top-10 opacity-10">
                            <TrendingUp size={180} strokeWidth={1} />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2">Aggregate Factory Revenue (Today)</p>
                            <h3 className="text-4xl font-black tracking-tighter">₵{totalRevenue.toLocaleString()}</h3>
                            <div className="mt-6 flex items-center space-x-3">
                                <span className="px-3 py-1 bg-white/20 rounded-lg text-[10px] font-black uppercase tracking-widest">+15% vs Yesterday</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {deptRevenue.map((dept, i) => (
                            <div key={i} className="bg-white p-6 rounded-[2rem] border-2 border-slate-50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className={`p-4 rounded-2xl ${dept.color.replace('text', 'bg')}/10 ${dept.color}`}><dept.icon size={24} /></div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{dept.name}</h4>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{((dept.value / totalRevenue) * 100).toFixed(1)}% Share</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black text-slate-900">₵{dept.value.toLocaleString()}</p>
                                        <button onClick={() => { setIsRevenueModalOpen(false); navigate(dept.path); }} className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline mt-1">Dept Dashboard</button>
                                    </div>
                                </div>
                                <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                                    <div className={`h-full opacity-80 ${dept.color.replace('text', 'bg')}`} style={{ width: `${(dept.value / totalRevenue) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </BaseModal>

            <BaseModal
                isOpen={isActiveStaffModalOpen}
                onClose={() => setIsActiveStaffModalOpen(false)}
                title="Active Shift Team"
            >
                <div className="p-4 space-y-6">
                    <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-1">Live Deployment</p>
                        <h3 className="text-3xl font-black tracking-tighter">{activeStaffCount} Employees On-Site</h3>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                        {activeStaff.map((staff, i) => (
                            <div key={i} className="flex items-center justify-between p-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black text-xs uppercase">
                                        {staff.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-800 leading-none">{staff.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{staff.dept} • {staff.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1">Clocked In</p>
                                    <p className="text-xs font-black text-slate-900">{staff.clockInTime ? new Date(staff.clockInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '---'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => { setIsActiveStaffModalOpen(false); navigate('/dashboard/hr'); }} className="w-full py-5 rounded-[2rem] bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-[#003366] hover:text-white transition-all">Go to HR Module</button>
                </div>
            </BaseModal>

            <BaseModal
                isOpen={isTotalStaffModalOpen}
                onClose={() => setIsTotalStaffModalOpen(false)}
                title="Workforce Directory"
            >
                <div className="p-4 space-y-6">
                    <div className="bg-purple-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 opacity-10"><Users size={160} /></div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-1">Full Organization</p>
                            <h3 className="text-3xl font-black tracking-tighter">{totalStaffCount} Registered Employees</h3>
                            <div className="mt-4 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/70">{activeStaffCount} Currently Working</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 max-h-[450px] overflow-y-auto no-scrollbar">
                        {staffList.map((staff, i) => (
                            <div key={i} className="flex items-center justify-between p-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:border-purple-200 transition-all">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 font-black text-xs uppercase">
                                        {staff.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-800 leading-none">{staff.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1.5">{staff.dept} • {staff.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{staff.status}</span>
                                    <p className="text-[9px] font-bold text-slate-300 uppercase mt-2">{staff.shift} Shift</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </BaseModal>

            <div className="flex items-center justify-center space-x-3 py-10 opacity-30 select-none grayscale">
                <ShieldAlert size={20} className="text-brand-red" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">READ-ONLY OWNER ACCESS • ENCRYPTION ACTIVE</p>
            </div>
        </div>
    );
};

export default OwnerDashboard;
