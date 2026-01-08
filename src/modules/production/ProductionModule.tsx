import React from 'react';
import {
    Zap,
    Droplets,
    TrendingUp,
    ShieldAlert,
    History,
    Layers,
    Plus,
    Pencil,
    Trash2
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';
import BaseModal from '../../components/modals/BaseModal';
import ProductionForm from '../../components/forms/ProductionForm';

const kpiData = [
    { label: "Today's Yield", value: "3,840", sub: "Bags Produced", trend: "+450", color: "bg-[#003366]", icon: Droplets },
    { label: "OEE Efficiency", value: "94.2%", sub: "Operational", trend: "+2.1%", color: "bg-[#0081cc]", icon: Zap },
    { label: "Wastage Rate", value: "1.8%", sub: "Material Loss", trend: "-0.4%", color: "bg-[#ce1126]", icon: ShieldAlert },
    { label: "Shift Output", value: "1.2k", sub: "Curr. Shift", trend: "Steady", color: "bg-emerald-600", icon: Layers },
];

const hourlyOutput = [
    { time: '08:00', output: 450 },
    { time: '10:00', output: 520 },
    { time: '12:00', output: 380 },
    { time: '14:00', output: 610 },
    { time: '16:00', output: 490 },
    { time: '18:00', output: 550 },
];

const ProductionModule: React.FC = () => {
    const [logs, setLogs] = React.useState([
        { id: '1', date: '2026-01-08', shift: 'Morning', line: 'Sachet Line #1', qty: '1,200', waste: '12', type: 'Bagging' },
        { id: '2', date: '2026-01-08', shift: 'Morning', line: 'Sachet Line #2', qty: '850', waste: '24', type: 'Bagging' },
        { id: '3', date: '2026-01-07', shift: 'Night', line: 'Bottling Line A', qty: '2,100', waste: '5', type: 'Bottling' },
        { id: '4', date: '2026-01-07', shift: 'Afternoon', line: 'Dispenser Unit', qty: '400', waste: '0', type: 'Dispenser' },
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

    const handleAdd = () => {
        setModalConfig({ isOpen: true, mode: 'add', initialData: null });
    };

    const handleEdit = (log: any) => {
        setModalConfig({ isOpen: true, mode: 'edit', initialData: log });
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this production record?')) {
            setLogs(logs.filter(l => l.id !== id));
        }
    };

    const handleSubmit = () => {
        // Mocking save
        alert(modalConfig.mode === 'add' ? 'Production record added!' : 'Production record updated!');
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Production Oversight</h1>
                    <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Real-time Yield, Efficiency & Wastage Monitoring</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleAdd}
                        className="bg-[#0081cc] text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-[#0081cc]/20 hover:-translate-y-1 transition-all flex items-center"
                    >
                        <Plus size={16} className="mr-2" /> Log Production
                    </button>
                    <button className="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-slate-700 font-black uppercase text-[10px] tracking-widest shadow-sm hover:shadow-md transition-all flex items-center">
                        <History size={16} className="mr-2" /> Shift Logs
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
                                <div className="p-2 bg-white/10 rounded-xl text-white">
                                    <kpi.icon size={14} />
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{kpi.value}</h3>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1.5 leading-none">{kpi.sub}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="bg-white/10 px-2 py-0.5 rounded-full flex items-center space-x-1">
                                    <TrendingUp size={10} className="text-white" />
                                    <span className="text-[9px] font-black text-white tracking-tight">{kpi.trend}</span>
                                </div>
                                <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest italic leading-none">Live Pulse</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Hourly Velocity */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase leading-none">Hourly Production Velocity</h3>
                            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest text-[10px]">Real-time output per hour</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="w-3 h-3 bg-[#0081cc] rounded-full animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 leading-none">Syncing Active</span>
                        </div>
                    </div>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={hourlyOutput}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontStyle: 'normal', fontWeight: 'bold', fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontStyle: 'normal', fontWeight: 'bold', fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                <Line type="monotone" dataKey="output" stroke="#003366" strokeWidth={5} dot={{ r: 6, fill: '#003366', strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 10, strokeWidth: 0 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Machine Performance */}
                <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#0081cc] opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col h-full uppercase tracking-tighter">
                        <div className="mb-10">
                            <h3 className="text-xl font-black uppercase leading-none">Line Deployment</h3>
                            <p className="text-xs font-black text-white/40 mt-2">Active Machines Status</p>
                        </div>
                        <div className="space-y-6 flex-1">
                            {[
                                { name: 'Bottling Line 1', status: 'Optimal', load: '94%' },
                                { name: 'Sachet Line A', status: 'Optimal', load: '82%' },
                                { name: 'Sachet Line B', status: 'Service Due', load: '65%' },
                                { name: 'Packaging Unit', status: 'Optimal', load: '91%' },
                            ].map((line, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center justify-between group-hover:bg-white/10 transition-all">
                                    <div>
                                        <p className="text-sm font-black">{line.name}</p>
                                        <p className={`text-[9px] font-black uppercase mt-1 ${line.status === 'Optimal' ? 'text-emerald-400' : 'text-amber-400'}`}>{line.status}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-black">{line.load}</p>
                                        <p className="text-[9px] font-black text-white/20">Load</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Production History Table */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Production Runs</h3>
                        <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest text-[10px]">Filter, Edit or Delete entries</p>
                    </div>
                    <div className="flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="bg-transparent border-none focus:ring-0 text-xs font-bold px-4 py-2 w-48"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#003366] text-white">
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest rounded-tl-2xl">Date</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Type</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Shift</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Line</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Quantity</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Wastage</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {logs.map((log) => (
                                <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-5 px-4 text-xs font-bold text-slate-600">{log.date}</td>
                                    <td className="py-5 px-4 text-xs font-black text-blue-600 uppercase italic">{log.type}</td>
                                    <td className="py-5 px-4 text-xs font-black text-slate-900 uppercase">{log.shift}</td>
                                    <td className="py-5 px-4 text-xs font-bold text-slate-600">{log.line}</td>
                                    <td className="py-5 px-4 text-xs font-black text-[#003366]">{log.qty}</td>
                                    <td className="py-5 px-4 text-xs font-black text-red-500">{log.waste}</td>
                                    <td className="py-5 px-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(log)}
                                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors"
                                            >
                                                <Pencil size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(log.id)}
                                                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                                            >
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

            {/* Modal */}
            <BaseModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.mode === 'add' ? 'Log New Production' : 'Edit Production Record'}
            >
                <ProductionForm onSubmit={handleSubmit} onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })} />
            </BaseModal>
        </div>
    );
};

export default ProductionModule;
