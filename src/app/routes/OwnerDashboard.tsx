import React from 'react';
import {
    Droplets,
    TrendingUp,
    TrendingDown,
    DollarSign,
    AlertTriangle,
    CheckCircle2,
    Users,
    Truck,
    Package,
    ArrowRight,
    ShieldAlert,
    History,
    Activity,
    Info,
    Settings,
    FileText,
    Factory
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';

// Mock Data
const kpiData = [
    { label: "Today's Production", value: "4,250", sub: "Bags", trend: "+12%", color: "bg-[#0081cc]", icon: Droplets },
    { label: "Today's Sales", value: "₵12,480", sub: "Value", trend: "+8.4%", color: "bg-[#003366]", icon: DollarSign },
    { label: "Cash Received", value: "₵9,150", sub: "Collected", trend: "+5.1%", color: "bg-green-600", icon: CheckCircle2 },
    { label: "Credit Outstanding", value: "₵3,330", sub: "Pending", trend: "-2.5%", color: "bg-amber-500", icon: ShieldAlert },
    { label: "Est. Profit (Today)", value: "₵3,120", sub: "Margin", trend: "+4.2%", color: "bg-[#ce1126]", icon: Activity },
];

const salesTrendData = [
    { date: 'Mon', cash: 4000, credit: 2400 },
    { date: 'Tue', cash: 3000, credit: 1398 },
    { date: 'Wed', cash: 2000, credit: 9800 },
    { date: 'Thu', cash: 2780, credit: 3908 },
    { date: 'Fri', cash: 1890, credit: 4800 },
    { date: 'Sat', cash: 2390, credit: 3800 },
    { date: 'Sun', cash: 3490, credit: 4300 },
];

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
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* 1. TOP SUMMARY BAR (KPI STRIP - AgriLync Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {kpiData.map((kpi, i) => (
                    <button
                        key={i}
                        className={`${kpi.color} p-8 rounded-[2rem] shadow-lg hover:shadow-2xl transition-all group text-left relative overflow-hidden h-[240px] flex flex-col justify-between`}
                    >
                        {/* Background Icon Decoration */}
                        <div className="absolute -right-6 -top-6 text-white/10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                            <kpi.icon size={120} strokeWidth={1} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                                    {kpi.label}
                                </span>
                                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white/80">
                                    <kpi.icon size={16} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-4xl font-black text-white tracking-tighter leading-none">
                                    {kpi.value}
                                </h3>
                                <p className="text-xs font-bold text-white/50 uppercase tracking-widest">{kpi.sub}</p>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                                <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full bg-white/20 text-white`}>
                                    {kpi.trend.startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    <span className="text-[9px] font-black">{kpi.trend}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 text-[10px] font-black text-white/70 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                <span>Details</span>
                                <ArrowRight size={12} />
                            </div>
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
                        <div className="bg-[#0081cc]/10 p-3 rounded-2xl text-[#0081cc]">
                            <Factory size={22} />
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={productionEfficiency} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="actual" fill="#0081cc" radius={[4, 4, 0, 0]} barSize={24} />
                                <Bar dataKey="target" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Average Waste</p>
                            <p className="text-xl font-black text-red-600 tracking-tighter">2.4%</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Lines</p>
                            <p className="text-xl font-black text-green-600 tracking-tighter">04 / 04</p>
                        </div>
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
                                <Pie
                                    data={[
                                        { name: 'Cash', value: 75 },
                                        { name: 'Credit', value: 25 },
                                    ]}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    <Cell fill="#10b981" />
                                    <Cell fill="#f59e0b" />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                            <span className="text-xs font-black text-slate-400 uppercase">Total</span>
                            <p className="text-xl font-black tracking-tighter text-slate-900">₵12.4k</p>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                <span className="font-bold text-slate-600 uppercase tracking-tight text-xs">Cash Sales</span>
                            </div>
                            <span className="font-black text-slate-900">₵9,150</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                                <span className="font-bold text-slate-600 uppercase tracking-tight text-xs">Credit Sales</span>
                            </div>
                            <span className="font-black text-slate-900">₵3,330</span>
                        </div>
                    </div>
                </div>

                {/* Inventory Alerts */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Inventory Alerts</h3>
                            <p className="text-xs font-bold text-slate-400">Low stock & critical levels</p>
                        </div>
                        <div className="bg-amber-100 p-3 rounded-2xl text-amber-700">
                            <Package size={22} />
                        </div>
                    </div>
                    <div className="space-y-6 flex-1">
                        {inventoryData.map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                                    <span className="text-slate-500">{item.name}</span>
                                    <span className={item.value < 30 ? 'text-red-600' : 'text-slate-400'}>{item.value}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full transition-all duration-1000"
                                        style={{ width: `${item.value}%`, backgroundColor: item.color }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center space-x-4">
                        <AlertTriangle className="text-red-600 shrink-0" size={24} />
                        <p className="text-xs font-bold text-red-900 leading-tight">
                            CRITICAL: Packing bags will run out in less than 48 hours based on current production rates.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. TREND & PERFORMANCE ANALYTICS */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Revenue vs Credit Trend</h3>
                        <div className="flex items-center space-x-2">
                            <span className="bg-[#10b981]/10 px-2 py-0.5 rounded text-[10px] font-black text-green-700 uppercase">Live Preview</span>
                            <p className="text-xs font-bold text-slate-400 italic">Last 7 days performance metrics</p>
                        </div>
                    </div>
                    <div className="flex items-center bg-slate-50 p-1 rounded-xl">
                        {['7 Days', '30 Days', 'Shift Mix'].map((t) => (
                            <button key={t} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${t === '7 Days' ? 'bg-white shadow-sm text-[#003366]' : 'text-slate-400 hover:text-slate-600'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorCredit" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold', fill: '#94a3b8' }} />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <Tooltip
                                contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area type="monotone" dataKey="cash" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorCash)" />
                            <Area type="monotone" dataKey="credit" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorCredit)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 4. RISK & CONTROL PANEL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Real-time Alerts */}
                <div className="bg-[#003366] p-10 rounded-[3rem] text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-brand-red/10 transition-colors"></div>
                    <div className="flex items-center justify-between mb-10 relative z-10">
                        <div className="space-y-1">
                            <h3 className="text-xl font-black tracking-tight uppercase">Operational Risks</h3>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Immediate Attention Required</p>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <ShieldAlert size={24} className="text-[#00adff]" />
                        </div>
                    </div>
                    <div className="space-y-4 relative z-10">
                        {alerts.map((alert, i) => (
                            <div key={i} className="flex items-start space-x-4 bg-white/5 p-5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${alert.type === 'High' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}></div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white/90">{alert.msg}</p>
                                    <div className="flex items-center space-x-3 mt-2">
                                        <span className="text-[10px] font-black uppercase text-[#00adff]">{alert.dept}</span>
                                        <span className="text-[10px] font-bold text-white/40">{alert.time}</span>
                                    </div>
                                </div>
                                <div className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${alert.type === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                    {alert.type}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audit & Logs */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-10">
                        <div className="space-y-1">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">Audit Logs</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Staff Data Entry History</p>
                        </div>
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                            <History size={24} />
                        </div>
                    </div>
                    <div className="space-y-6 flex-1">
                        {logs.map((log, i) => (
                            <div key={i} className="flex items-center space-x-4 group cursor-default">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#003366] group-hover:text-white transition-colors duration-300">
                                    <Info size={18} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-black text-slate-800 tracking-tight">{log.action}</p>
                                    <p className="text-xs font-bold text-slate-400 mt-1">{log.user}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-slate-300 uppercase">{log.time}</p>
                                    <span className="text-[10px] font-black text-[#0081cc] uppercase tracking-widest">#{log.dept}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-8 flex items-center justify-center space-x-2 w-full py-4 border-2 border-slate-50 rounded-2xl text-[11px] font-black uppercase text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
                        <FileText size={16} />
                        <span>View Full Audit Trail</span>
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* 5. QUICK NAVIGATION (DECISION SHORTCUTS) */}
            <div className="pt-10">
                <div className="flex items-center space-x-4 mb-8">
                    <span className="w-10 h-1 bg-brand-red rounded-full"></span>
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Decision Control Center</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {[
                        { label: 'Finance Reports', icon: FileText, color: 'hover:border-green-400' },
                        { label: 'Production Logs', icon: Factory, color: 'hover:border-[#0081cc]' },
                        { label: 'Inventory Summary', icon: Package, color: 'hover:border-amber-400' },
                        { label: 'Distributor Performance', icon: Truck, color: 'hover:border-[#003366]' },
                        { label: 'Employee Costs', icon: Users, color: 'hover:border-[#ce1126]' },
                        { label: 'System Settings', icon: Settings, color: 'hover:border-slate-800' },
                    ].map((btn, i) => (
                        <button
                            key={i}
                            className={`bg-white p-6 rounded-3xl border-2 border-slate-50 ${btn.color} shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center text-center group`}
                        >
                            <div className="w-10 h-10 mb-4 text-slate-400 group-hover:text-slate-900 transition-colors">
                                <btn.icon size={32} strokeWidth={1.5} />
                            </div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight leading-tight group-hover:text-slate-900">{btn.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Security Notice Footer */}
            <div className="flex items-center justify-center space-x-3 py-10 opacity-30 select-none grayscale">
                <ShieldAlert size={20} className="text-brand-red" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">
                    READ-ONLY OWNER ACCESS • MULTI-LAYER ENCRYPTION ACTIVE
                </p>
            </div>
        </div>
    );
};

export default OwnerDashboard;
