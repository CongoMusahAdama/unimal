import React from 'react';
import {
    Truck,
    DollarSign,
    CreditCard,
    TrendingUp,
    TrendingDown,
    Users,
    PackageCheck,
    History,
    AlertTriangle,
    Plus,
    Pencil,
    Trash2
} from 'lucide-react';
import BaseModal from '../../components/modals/BaseModal';
import SalesForm from '../../components/forms/SalesForm';

const kpiData = [
    { label: "Daily Revenue", value: "₵12,480", sub: "Today", trend: "+8.4%", color: "bg-[#003366]", icon: DollarSign },
    { label: "Cash Collected", value: "₵9,150", sub: "In-Hand", trend: "+5.1%", color: "bg-emerald-600", icon: DollarSign },
    { label: "Credit Value", value: "₵3,330", sub: "Outstanding", trend: "-2.2%", color: "bg-amber-600", icon: CreditCard },
    { label: "Total Deliveries", value: "1,450", sub: "Bags Delivered", trend: "+120", color: "bg-[#0081cc]", icon: Truck },
];

const SalesModule: React.FC = () => {
    const [salesList, setSalesList] = React.useState([
        { id: 'DIST-001', name: 'Kwesi Appiah', route: 'Takoradi Central', delivered: 450, returned: 2, status: 'Delivered' },
        { id: 'DIST-002', name: 'Linda Mensah', route: 'Sekondi Market', delivered: 320, returned: 15, status: 'Delivered' },
        { id: 'DIST-003', name: 'Samuel Boateng', route: 'Axim Road', delivered: 400, returned: 5, status: 'In-Transit' },
        { id: 'DIST-004', name: 'Abena Darko', route: 'Effiakuma Sub', delivered: 280, returned: 0, status: 'Loading' },
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
    const handleEdit = (dist: any) => setModalConfig({ isOpen: true, mode: 'edit', initialData: dist });

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this sales record?')) {
            setSalesList(salesList.filter(s => s.id !== id));
        }
    };

    const handleSubmit = () => {
        alert(modalConfig.mode === 'add' ? 'Sales record saved!' : 'Sales record updated!');
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Sales & Distribution</h1>
                    <p className="text-slate-500 font-medium mt-1.5 uppercase tracking-widest text-[10px]">Real-time revenue & logistics tracking</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleAdd}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-600/20 hover:-translate-y-1 transition-all flex items-center"
                    >
                        <Plus size={16} className="mr-2" /> Record Sale
                    </button>
                    <button className="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-slate-700 font-black uppercase text-[10px] tracking-widest shadow-sm hover:shadow-md transition-all flex items-center">
                        <History size={16} className="mr-2" /> Sales Ledger
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
                                    {kpi.trend.startsWith('+') ? <TrendingUp size={10} className="text-white" /> : <TrendingDown size={10} className="text-white" />}
                                    <span className="text-[9px] font-black text-white">{kpi.trend}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Route Tracking Table */}
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-50 shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">Logistics Tracking</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time distributor accountability</p>
                    </div>
                    <div className="flex items-center bg-slate-50 p-1.5 rounded-2xl">
                        {['All Drops', 'In-Transit', 'Delivered'].map((t) => (
                            <button key={t} className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${t === 'All Drops' ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {salesList.map((dist) => (
                        <div key={dist.id} className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-[2.5rem] border border-slate-50 hover:border-emerald-100 hover:bg-emerald-50/10 transition-all group">
                            <div className="flex items-center space-x-8">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                    <Users size={28} />
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 tracking-tighter text-xl leading-none uppercase">{dist.name}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{dist.id} • <span className="text-emerald-600">{dist.route}</span></p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-12 mt-8 md:mt-0">
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Volume</p>
                                    <p className="text-xl font-black text-slate-800 tracking-tighter mt-1.5">{dist.delivered} Bags</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Returns</p>
                                    <p className="text-xl font-black text-rose-500 tracking-tighter mt-1.5">{dist.returned} Bags</p>
                                </div>
                                <div className="min-w-[120px] flex justify-end">
                                    <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${dist.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                        dist.status === 'In-Transit' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                            'bg-slate-100 text-slate-400 border border-slate-200'
                                        }`}>
                                        {dist.status}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(dist)} className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                                        <Pencil size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(dist.id)} className="p-3 bg-white shadow-sm border border-slate-100 rounded-xl text-rose-600 hover:bg-rose-600 hover:text-white transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logistics Health Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Late Deliveries</p>
                        <h5 className="text-xl font-black text-slate-900 tracking-tighter">02 Trucks</h5>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center space-x-4">
                    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Return Spike</p>
                        <h5 className="text-xl font-black text-slate-900 tracking-tighter">+45 Bags</h5>
                    </div>
                </div>
                <div className="bg-[#003366] p-6 rounded-[2rem] shadow-xl flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                        <PackageCheck size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Warehouse Ready</p>
                        <h5 className="text-xl font-black text-white tracking-tighter">4,850 Bags</h5>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <BaseModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.mode === 'add' ? 'Record New Sales Entry' : 'Update Distributor Load'}
            >
                <SalesForm onSubmit={handleSubmit} onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })} />
            </BaseModal>
        </div>
    );
};

export default SalesModule;
