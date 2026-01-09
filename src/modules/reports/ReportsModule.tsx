import React, { useState } from 'react';
import {
    FileText,
    Download,
    FileSpreadsheet,
    Printer,
    Table,
    CheckCircle2,
    Factory,
    Truck,
    DollarSign,
    Users,
    ClipboardCheck,
    Wrench,
    Search,
    ChevronDown,
    TrendingUp
} from 'lucide-react';
import {
    AreaChart,
    Area,
    ResponsiveContainer
} from 'recharts';

// Mock Data for Report Preview
const mockReportData = [
    { id: 'REC-001', dept: 'Production', date: '2024-03-20', activity: 'Morning Shift Output', metric: '4,200 Bags', status: 'Completed', value: '85% Efficiency' },
    { id: 'REC-002', dept: 'Sales', date: '2024-03-20', activity: 'Wholesale Distribution', metric: '₵12,480', status: 'Settled', value: 'Cash' },
    { id: 'REC-003', dept: 'Logistics', date: '2024-03-21', activity: 'Fuel & Maintenance', metric: '₵850', status: 'Pending', value: 'Maintenance' },
    { id: 'REC-004', dept: 'QC', date: '2024-03-21', activity: 'Water Purity Test', metric: '100% Pass', status: 'Verified', value: 'Lab' },
];

const ReportsModule: React.FC = () => {
    const [duration, setDuration] = useState('This Month');
    const [department, setDepartment] = useState('All Departments');
    const [isGenerating, setIsGenerating] = useState(false);

    const departments = [
        { name: 'All Departments', icon: FileText, color: 'text-slate-500' },
        { name: 'Production', icon: Factory, color: 'text-blue-600' },
        { name: 'Sales & Dist.', icon: Truck, color: 'text-green-600' },
        { name: 'Finance', icon: DollarSign, color: 'text-amber-600' },
        { name: 'HR / Payroll', icon: Users, color: 'text-purple-600' },
        { name: 'Quality Control', icon: ClipboardCheck, color: 'text-rose-600' },
        { name: 'Maintenance', icon: Wrench, color: 'text-orange-600' },
    ];

    const durations = ['Today', 'This Week', 'This Month', 'Last quarter', 'Custom Range'];

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 1500);
    };

    const handlePrintOrExport = () => {
        window.print();
    };

    return (
        <div className="space-y-10 pb-20">
            {/* 1. REPORT ENGINE HEADER */}
            <div className="bg-[#003366] p-10 md:p-14 rounded-[3.5rem] text-white overflow-hidden relative shadow-2xl">
                <div className="absolute -right-20 -top-20 opacity-10">
                    <FileText size={300} strokeWidth={1} />
                </div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <div className="inline-block bg-[#0081cc] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/90 mb-2">
                            Report Intelligence Engine
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                            Generate Analytical <br />
                            <span className="text-[#00adff]">Operational Data</span>
                        </h1>
                        <p className="text-white/60 text-lg font-medium max-w-lg">
                            Customizable data aggregation across all factory departments. Export ready-to-use business intelligence.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#00adff] tracking-widest pl-2">Duration</label>
                                <div className="relative group">
                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#00adff] transition-all appearance-none cursor-pointer"
                                    >
                                        {durations.map(d => <option key={d} value={d} className="text-slate-900">{d}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-hover:text-white transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#00adff] tracking-widest pl-2">Filter By Dept</label>
                                <div className="relative group">
                                    <select
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#00adff] transition-all appearance-none cursor-pointer"
                                    >
                                        {departments.map(d => <option key={d.name} value={d.name} className="text-slate-900">{d.name}</option>)}
                                    </select>
                                    <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            className="w-full py-5 bg-white text-[#003366] rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-[#00adff] hover:text-white transition-all active:scale-95 flex items-center justify-center space-x-3"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-[#003366] border-t-transparent rounded-full animate-spin"></div>
                                    <span>Compiling Data...</span>
                                </>
                            ) : (
                                <>
                                    <Search size={18} />
                                    <span>Generate Report Preview</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. REPORT ACTIONS & EXPORT */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar pb-2">
                    {departments.slice(0, 5).map((dept, i) => (
                        <button
                            key={i}
                            onClick={() => setDepartment(dept.name)}
                            className={`flex items-center space-x-3 px-6 py-3 rounded-2xl border-2 transition-all whitespace-nowrap ${department === dept.name ? 'border-[#0081cc] bg-[#0081cc]/5 text-[#003366]' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                        >
                            <dept.icon size={16} className={department === dept.name ? dept.color : 'text-slate-300'} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{dept.name}</span>
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handlePrintOrExport}
                        className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#003366] hover:border-[#003366] transition-all shadow-sm group"
                        title="Download PDF"
                    >
                        <Download size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={handlePrintOrExport}
                        className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all shadow-sm group"
                        title="Export Excel"
                    >
                        <FileSpreadsheet size={20} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={handlePrintOrExport}
                        className="bg-[#003366] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-[#0081cc] transition-all flex items-center space-x-3"
                    >
                        <Printer size={18} />
                        <span>Print Report</span>
                    </button>
                </div>
            </div>

            {/* 3. LIVE REPORT PREVIEW (This is what gets printed) */}
            <div className="bg-white p-10 md:p-20 rounded-[4rem] border border-slate-50 shadow-sm min-h-[1000px] relative overflow-hidden print:p-0 print:m-0 print:shadow-none print:border-none">

                {/* PDF/PRINT HEADER - Only visible in preview and print */}
                <div className="flex flex-col md:flex-row justify-between items-start border-b-4 border-[#003366] pb-10 mb-12 space-y-6 md:space-y-0">
                    <div className="flex items-center space-x-6">
                        <img src="/logo.png" alt="UniEmmanuel Logo" className="h-24 w-auto object-contain" />
                        <div className="h-16 w-px bg-slate-200 hidden md:block"></div>
                        <div>
                            <h2 className="text-3xl font-black text-[#003366] tracking-tighter leading-none mb-1 uppercase">UniEmmanuel Ventures</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Voltic Cool Pac • Pure Water Licensed Producer</p>
                            <div className="flex items-center space-x-3 mt-3">
                                <span className="bg-[#ce1126] text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest">Takoradi, Ghana</span>
                                <span className="text-[10px] font-bold text-slate-500">Contact: 0244925320 / 0244925320</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-right">Operational Report ID</h4>
                            <p className="text-xl font-black text-[#003366] tracking-tighter font-mono">#REP-2024-{Math.floor(Math.random() * 9000) + 1000}</p>
                            <p className="text-[9px] font-bold text-slate-300 uppercase mt-1">Generated: {new Date().toLocaleDateString('en-GB')}</p>
                        </div>
                    </div>
                </div>

                {/* REPORT TITLE */}
                <div className="mb-14 text-center">
                    <h1 className="text-4xl font-black text-[#003366] uppercase tracking-tighter mb-2">Comprehensive {department} Report</h1>
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-12 h-1 bg-[#0081cc] rounded-full"></div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Evaluation Period: {duration}</p>
                        <div className="w-12 h-1 bg-[#ff8c00] rounded-full"></div>
                    </div>
                </div>

                {/* LAYER 1: KEY PERFORMANCE INDICATORS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {[
                        { label: 'Total Output', val: '124,500', sub: 'Bags Produced', icon: Factory, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { label: 'Revenue Generated', val: '₵342,880', sub: 'Gross Daily', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'Asset Health', val: '98.4%', sub: 'Avg Efficiency', icon: Wrench, color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'Workforce Hub', val: '48', sub: 'Active Personnel', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
                    ].map((kpi, i) => (
                        <div key={i} className={`p-8 rounded-[2.5rem] border border-slate-100 shadow-sm ${kpi.bg}`}>
                            <kpi.icon size={24} className={kpi.color + " mb-4"} />
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{kpi.label}</h4>
                            <p className="text-3xl font-black text-[#003366] tracking-tighter mb-1">{kpi.val}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{kpi.sub}</p>
                        </div>
                    ))}
                </div>

                {/* LAYER 2: ACTIVITY TABLE */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center space-x-3">
                            <Table size={18} className="text-[#0081cc]" />
                            <h3 className="text-sm font-black text-[#003366] uppercase tracking-widest">Granular Activity Log</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full italic">Filtered by {department} • Source: Factory Core</span>
                    </div>

                    <div className="overflow-hidden border border-slate-100 rounded-[2.5rem]">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#003366] text-white">
                                <tr>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest">Record ID</th>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest">Dept</th>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest">Timestamp</th>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest">Operational Activity</th>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest">Key Metric</th>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 font-medium">
                                {mockReportData.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-6"><span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black text-slate-500 font-mono tracking-tighter">{row.id}</span></td>
                                        <td className="p-6 text-xs font-black uppercase tracking-tight text-[#003366]">{row.dept}</td>
                                        <td className="p-6 text-xs text-slate-400">{row.date}</td>
                                        <td className="p-6 text-sm font-bold text-slate-700">{row.activity}</td>
                                        <td className="p-6 text-sm font-black text-[#0081cc]">{row.metric}</td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${row.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* LAYER 3: VISUAL INTELLIGENCE */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 px-2">
                            <TrendingUp size={18} className="text-emerald-500" />
                            <h3 className="text-sm font-black text-[#003366] uppercase tracking-widest">Performance Trend</h3>
                        </div>
                        <div className="h-64 bg-slate-50/50 p-8 rounded-[3rem] border border-dashed border-slate-200">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[{ n: 'M', v: 40 }, { n: 'T', v: 70 }, { n: 'W', v: 45 }, { n: 'T', v: 90 }, { n: 'F', v: 65 }, { n: 'S', v: 85 }]}>
                                    <Area type="monotone" dataKey="v" stroke="#0081cc" fill="#0081cc" fillOpacity={0.1} strokeWidth={4} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3 px-2">
                            <CheckCircle2 size={18} className="text-blue-500" />
                            <h3 className="text-sm font-black text-[#003366] uppercase tracking-widest">Compliance Audit</h3>
                        </div>
                        <div className="space-y-4">
                            {[
                                { t: 'GSA Standards Protocol', s: 'Verified' },
                                { t: 'FDA Hygiene Compliance', s: 'Certified' },
                                { t: 'Wastage Variance Check', s: 'Passed (0.4%)' }
                            ].map((audit, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <span className="text-xs font-bold text-slate-700">{audit.t}</span>
                                    <span className="text-[9px] font-black uppercase text-emerald-600 tracking-widest">{audit.s}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* REPORT FOOTER - Only visible in print/export */}
                <div className="mt-32 pt-10 border-t border-slate-100 flex flex-col items-center">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] mb-4">Official Business Intelligence Log • UniEmmanuel Ventures</p>
                    <div className="flex space-x-20">
                        <div className="text-center pt-10 px-10 border-t-2 border-slate-900/10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#003366]">Factory Manager Signature</p>
                        </div>
                        <div className="text-center pt-10 px-10 border-t-2 border-slate-900/10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#003366]">Accountant Verification</p>
                        </div>
                    </div>
                </div>

                {/* WATERMARK */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pointer-events-none opacity-[0.03] select-none text-[120px] font-black whitespace-nowrap text-slate-900 uppercase">
                    UniEmmanuel Official
                </div>

            </div>

            {/* Print Styling Helper */}
            <style>{`
                @media print {
                    @page { margin: 20mm; size: auto; }
                    body { background: white !important; }
                    nav, header, aside, .no-print, button { display: none !important; }
                    .main-content { margin: 0 !important; padding: 0 !important; }
                    .print-container { width: 100% !important; border: none !important; box-shadow: none !important; }
                }
            `}</style>
        </div>
    );
};

export default ReportsModule;
