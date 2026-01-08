import React from 'react';
import {
    ShieldCheck,
    AlertTriangle,
    CheckCircle2,
    Droplets,
    FlaskConical,
    ClipboardCheck,
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
    AreaChart,
    Area
} from 'recharts';
import BaseModal from '../../components/modals/BaseModal';
import QCForm from '../../components/forms/QCForm';

const kpiData = [
    { label: "Compliance Rate", value: "99.8%", sub: "Safety Standard", trend: "Stable", color: "bg-[#003366]", icon: ShieldCheck },
    { label: "Failed Batches", value: "01", sub: "Last 7 Days", trend: "-2", color: "bg-[#ce1126]", icon: AlertTriangle },
    { label: "Lab Tests", value: "24", sub: "Today", trend: "+4", color: "bg-[#0081cc]", icon: FlaskConical },
    { label: "Safety Score", value: "A+", sub: "Health Audit", trend: "Normal", color: "bg-emerald-600", icon: CheckCircle2 },
];

const testResults = [
    { time: '08:00', ph: 7.2, purity: 98 },
    { time: '10:00', ph: 7.0, purity: 99 },
    { time: '12:00', ph: 7.1, purity: 97 },
    { time: '14:00', ph: 7.3, purity: 99 },
    { time: '16:00', ph: 7.1, purity: 98 },
    { time: '18:00', ph: 7.2, purity: 99 },
];

const QCModule: React.FC = () => {
    const [testLogs, setTestLogs] = React.useState([
        { id: '1', date: '2026-01-08', batch: 'BTH-2401', source: 'Borehole A', ph: '7.2', tds: '45 ppm', result: 'Pass', officer: 'Dr. K. Mensah' },
        { id: '2', date: '2026-01-08', batch: 'BTH-2402', source: 'Borehole B', ph: '7.0', tds: '52 ppm', result: 'Pass', officer: 'A. Tetteh' },
        { id: '3', date: '2026-01-07', batch: 'BTH-2398', source: 'Borehole A', ph: '6.8', tds: '48 ppm', result: 'Fail', officer: 'Dr. K. Mensah' },
        { id: '4', date: '2026-01-07', batch: 'BTH-2399', source: 'Treatment Tank', ph: '7.1', tds: '50 ppm', result: 'Pass', officer: 'S. Owusu' },
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
        if (window.confirm('Delete this QC test record?')) {
            setTestLogs(testLogs.filter(t => t.id !== id));
        }
    };

    const handleSubmit = () => {
        alert(modalConfig.mode === 'add' ? 'QC test logged successfully!' : 'QC test updated!');
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Quality Control & Safety</h1>
                    <p className="text-slate-500 font-medium mt-1.5 uppercase tracking-widest text-[10px]">Purity Tracking, Lab Results & Compliance Audit</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleAdd}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-indigo-600/20 hover:-translate-y-1 transition-all flex items-center"
                    >
                        <Plus size={16} className="mr-2" /> Log QC Test
                    </button>
                    <button className="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-slate-700 font-black uppercase text-[10px] tracking-widest shadow-sm hover:shadow-md transition-all flex items-center">
                        <ClipboardCheck size={16} className="mr-2" /> Lab Reports
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
                                    <span className="text-[9px] font-black text-white tracking-tight uppercase tracking-widest">{kpi.trend}</span>
                                </div>
                                <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest italic leading-none">Global Standard</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Purity Levels */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase leading-none">Real-time Purity Pulse</h3>
                            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest text-[10px]">Water purity & pH measurement trend</p>
                        </div>
                        <div className="flex items-center bg-[#0081cc]/5 px-4 py-2 rounded-xl text-[#0081cc] border border-[#0081cc]/10">
                            <Droplets size={16} className="mr-2" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[10px]">Avg Purity: 98.4%</span>
                        </div>
                    </div>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={testResults}>
                                <defs>
                                    <linearGradient id="colorPurity" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0081cc" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0081cc" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }} />
                                <Tooltip contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="purity" stroke="#0081cc" strokeWidth={4} fillOpacity={1} fill="url(#colorPurity)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Audit Trail Hook */}
                <div className="bg-[#003366] p-10 rounded-[3.5rem] text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-[#ce1126]/10 transition-colors"></div>
                    <div className="relative z-10 flex flex-col h-full uppercase tracking-tighter">
                        <div className="mb-10">
                            <h3 className="text-xl font-black uppercase leading-none">Compliance Audit</h3>
                            <p className="text-xs font-black text-white/40 mt-2 lowercase">Strict Regulatory Adherence</p>
                        </div>
                        <div className="space-y-6 flex-1">
                            {[
                                { name: 'Batch QC Check', status: 'Passed', time: '10:30 AM' },
                                { name: 'Water Purity Lab', status: 'Verified', time: '09:45 AM' },
                                { name: 'Health Inspection', status: 'Compliant', time: 'Yesterday' },
                                { name: 'Line 2 Sterilization', status: 'Verified', time: 'Yesterday' },
                            ].map((audit, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all cursor-default">
                                    <div>
                                        <p className="text-sm font-black">{audit.name}</p>
                                        <p className="text-[9px] font-black text-white/40 mt-1 uppercase tracking-widest">{audit.time}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg text-[9px] font-black">{audit.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* QC Test Logs Table */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Test Log Registry</h3>
                        <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Water quality & batch compliance records</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#003366] text-white">
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest rounded-tl-2xl">Date</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Batch ID</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Water Source</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right">PH Level</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right">TDS</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Result</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right">QC Officer</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {testLogs.map((log) => (
                                <tr key={log.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-6 px-4">
                                        <p className="text-sm font-black text-slate-700 tracking-tight">{log.date}</p>
                                    </td>
                                    <td className="py-6 px-4">
                                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{log.batch}</p>
                                    </td>
                                    <td className="py-6 px-4">
                                        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase border border-blue-100">{log.source}</span>
                                    </td>
                                    <td className="py-6 px-4 text-right">
                                        <p className="text-sm font-black text-slate-900">{log.ph}</p>
                                    </td>
                                    <td className="py-6 px-4 text-right">
                                        <p className="text-sm font-black text-slate-700">{log.tds}</p>
                                    </td>
                                    <td className="py-6 px-4 text-center">
                                        <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-xl shadow-sm ${log.result === 'Pass' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                                            {log.result}
                                        </span>
                                    </td>
                                    <td className="py-6 px-4 text-right">
                                        <p className="text-xs font-black text-slate-700 uppercase tracking-tight">{log.officer}</p>
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

            {/* Critical Safety Notice */}
            <div className="bg-slate-900 p-8 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group shadow-2xl">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#0081cc] opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity"></div>
                <div className="flex items-center space-x-6 relative z-10">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h4 className="text-white font-black text-xl uppercase tracking-tighter leading-none">ISO Audit Readiness</h4>
                        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Quality documentation is synced with live production batches</p>
                    </div>
                </div>
                <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:-translate-y-1 transition-all active:scale-95 relative z-10">
                    Review Compliance
                </button>
            </div>

            {/* Modal */}
            <BaseModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.mode === 'add' ? 'New Quality Control Log' : 'Update QC Test Record'}
            >
                <QCForm onSubmit={handleSubmit} onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })} />
            </BaseModal>
        </div>
    );
};

export default QCModule;
