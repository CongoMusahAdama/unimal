import React from 'react';
import {
    Activity,
    Clock,
    DollarSign,
    ArrowUp,
    ArrowDown,
    Calendar,
    Settings,
    Hammer,
    Cog,
    Plus,
    Pencil,
    Trash2
} from 'lucide-react';
import BaseModal from '../../components/modals/BaseModal';
import MaintenanceForm from '../../components/forms/MaintenanceForm';
import {
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const kpiData = [
    { label: "Active Machines", value: "08 / 10", sub: "Operational", trend: "+1", color: "bg-[#0081cc]", icon: Activity },
    { label: "Due Service", value: "02", sub: "Units", trend: "Normal", color: "bg-amber-600", icon: Calendar },
    { label: "Downtime (24h)", value: "3.2h", sub: "Production Loss", trend: "-1.5h", color: "bg-[#ce1126]", icon: Clock },
    { label: "Maintenance Cost", value: "₵4,850", sub: "Monthly Spend", trend: "+12.4%", color: "bg-[#003366]", icon: DollarSign },
];

const machineStatusData = [
    { name: 'Bottling A', uptime: 98, downtime: 2, status: 'Online' },
    { name: 'Bottling B', uptime: 94, downtime: 6, status: 'Online' },
    { name: 'Sachet Line 1', uptime: 82, downtime: 18, status: 'Warning' },
    { name: 'Sachet Line 2', uptime: 99, downtime: 1, status: 'Online' },
    { name: 'Sachet Line 3', uptime: 0, downtime: 100, status: 'Offline' },
    { name: 'Compressor X', uptime: 95, downtime: 5, status: 'Online' },
];

const downtimeHistory = [
    { day: 'Mon', hours: 2.1 },
    { day: 'Tue', hours: 4.5 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 0.5 },
    { day: 'Fri', hours: 3.2 },
    { day: 'Sat', hours: 5.1 },
    { day: 'Sun', hours: 1.2 },
];

const MaintenanceModule: React.FC = () => {
    const [logs, setLogs] = React.useState([
        { id: '1', machine: 'Sachet Line 3', issue: 'Main motor failure - Cooling system', type: 'Breakdown', cost: '₵1,200', date: '08 Jan 2024', tech: 'K. Owusu' },
        { id: '2', machine: 'Bottling B', issue: 'Conveyor belt calibration / Routine', type: 'Service', cost: '₵450', date: '07 Jan 2024', tech: 'S. Adobe' },
        { id: '3', machine: 'Water Filter B2', issue: 'Carbon filter replacement (Manual)', type: 'Routine', cost: '₵180', date: '06 Jan 2024', tech: 'A. Tetteh' },
    ]);

    const [modalConfig, setModalConfig] = React.useState<{
        isOpen: boolean;
        mode: 'add' | 'edit';
        initialData: any | null;
    }>({
        isOpen: false,
        mode: 'add',
        initialData: null
    });

    const handleAdd = () => setModalConfig({ isOpen: true, mode: 'add', initialData: null });
    const handleEdit = (log: any) => setModalConfig({ isOpen: true, mode: 'edit', initialData: log });

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this maintenance record?')) {
            setLogs(logs.filter(l => l.id !== id));
        }
    };

    const handleSubmit = () => {
        alert(modalConfig.mode === 'add' ? 'Maintenance activity logged!' : 'Maintenance activity updated!');
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Maintenance Monitoring</h1>
                    <p className="text-slate-500 font-medium mt-1.5 uppercase tracking-widest text-[10px]">Machine health & technical oversight</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleAdd}
                        className="bg-amber-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-amber-600/20 hover:-translate-y-1 transition-all flex items-center"
                    >
                        <Plus size={16} className="mr-2" /> Log Maintenance
                    </button>
                    <button className="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-slate-700 font-black uppercase text-[10px] tracking-widest shadow-sm hover:shadow-md transition-all flex items-center">
                        <Calendar size={16} className="mr-2" /> Service Schedule
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {kpiData.map((kpi, i) => (
                    <div key={i} className={`${kpi.color} p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group`}>
                        <div className="absolute -right-8 -top-8 text-white/5 group-hover:scale-110 transition-transform duration-500">
                            <kpi.icon size={140} strokeWidth={1} />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">{kpi.label}</span>
                                <div className="p-2 bg-white/10 rounded-xl">
                                    <kpi.icon size={14} className="text-white" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{kpi.value}</h3>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1.5 leading-none">{kpi.sub}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="bg-white/10 px-2 py-0.5 rounded-full flex items-center space-x-1">
                                    {kpi.trend.startsWith('+') ? <ArrowUp size={10} className="text-white" /> : <ArrowDown size={10} className="text-white" />}
                                    <span className="text-[9px] font-black text-white">{kpi.trend}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Health & Downtime Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Machine Health Table */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase leading-none">Machine Status Registry</h3>
                            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Real-time Uptime vs Downtime breakdown</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Optimal</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Critical</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {machineStatusData.map((mac, i) => (
                            <div key={i} className="bg-slate-50/50 border border-slate-50 p-6 rounded-[2.5rem] hover:border-blue-100 hover:bg-blue-50/10 transition-all group">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${mac.status === 'Online' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' :
                                            mac.status === 'Warning' ? 'bg-amber-100 text-amber-600' : 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white'
                                            }`}>
                                            <Cog size={28} className={mac.status === 'Online' ? 'animate-spin-slow' : ''} />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-slate-800 tracking-tight text-lg leading-none uppercase">{mac.name}</h4>
                                            <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg mt-1 inline-block ${mac.status === 'Online' ? 'bg-emerald-100/50 text-emerald-600' :
                                                mac.status === 'Warning' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                                                }`}>{mac.status}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{mac.uptime}%</p>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 inline-block">Uptime</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-slate-200 rounded-full overflow-hidden flex shadow-inner">
                                    <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${mac.uptime}%` }}></div>
                                    <div className="bg-rose-500 h-full" style={{ width: `${mac.downtime}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Downtime Pulse Chart */}
                <div className="bg-[#003366] p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-xl">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="mb-10">
                            <h3 className="text-xl font-black tracking-tight uppercase leading-none">Downtime Pulse</h3>
                            <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-2 leading-none">Total lost hours per day</p>
                        </div>
                        <div className="flex-1 min-h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={downtimeHistory}>
                                    <defs>
                                        <linearGradient id="colorDowntime" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ce1126" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#ce1126" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: 'rgba(255,255,255,0.4)' }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#003366', border: 'none', borderRadius: '1rem' }} />
                                    <Area type="monotone" dataKey="hours" stroke="#ce1126" strokeWidth={3} fillOpacity={1} fill="url(#colorDowntime)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-8 p-6 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Efficiency Status</p>
                                <span className="text-xs font-black text-emerald-400 tracking-tight uppercase">Improved</span>
                            </div>
                            <p className="text-xs text-white/60 font-medium leading-relaxed italic">"Preventive maintenance scheduled twice monthly has reduced downtime by 14%."</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Maintenance Log Table */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase leading-none">Maintenance & Repair Log</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-none">Machine breakdown & routine service history</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#003366] text-white">
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest rounded-tl-2xl">Machine Unit</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Log Type</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Issue / Resolution</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right">Technician</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right">Cost</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {logs.map((log) => (
                                <tr key={log.id} className="group hover:bg-slate-50/50 transition-all">
                                    <td className="py-6 px-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <Settings size={18} />
                                            </div>
                                            <p className="text-sm font-black text-slate-800 leading-none uppercase tracking-tight">{log.machine}</p>
                                        </div>
                                    </td>
                                    <td className="py-6 px-4">
                                        <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${log.type === 'Breakdown' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                                            }`}>
                                            {log.type}
                                        </span>
                                    </td>
                                    <td className="py-6 px-4 max-w-xs">
                                        <p className="text-[11px] font-bold text-slate-500 line-clamp-1 italic">"{log.issue}"</p>
                                    </td>
                                    <td className="py-6 px-4 text-right">
                                        <span className="text-xs font-black text-slate-700 uppercase tracking-tighter">{log.tech}</span>
                                    </td>
                                    <td className="py-6 px-4 text-right">
                                        <p className="text-sm font-black text-rose-600 tracking-tighter">{log.cost}</p>
                                    </td>
                                    <td className="py-6 px-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 transition-opacity">
                                            <button onClick={() => handleEdit(log)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                                <Pencil size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(log.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Proactive Notice */}
            <div className="flex flex-col md:flex-row items-center gap-10 bg-slate-900 p-12 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#0081cc] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity"></div>
                <div className="w-24 h-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center text-white group-hover:scale-110 transition-all duration-500">
                    <Hammer size={48} strokeWidth={1} />
                </div>
                <div className="flex-1 space-y-3 text-center md:text-left relative z-10">
                    <h4 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">Preventive Strategy Active</h4>
                    <p className="text-sm font-bold text-white/40 max-w-2xl uppercase tracking-widest leading-relaxed">
                        Regular service schedules are optimized based on operational hours. Machines due for service will automatically flag the technician app 48 hours in advance for minimal production interference.
                    </p>
                </div>
                <button className="bg-white text-slate-900 px-10 py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-widest shadow-xl hover:-translate-y-1 transition-all active:scale-95 relative z-10">
                    View Schedule
                </button>
            </div>

            {/* Modal */}
            <BaseModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.mode === 'add' ? 'Log Maintenance / Repair' : 'Update Technical Log'}
            >
                <MaintenanceForm onSubmit={handleSubmit} onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })} />
            </BaseModal>
        </div>
    );
};

export default MaintenanceModule;
