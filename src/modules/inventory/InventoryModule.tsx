import React from 'react';
import {
    Package,
    AlertTriangle,
    ArrowDown,
    ArrowUp,
    TrendingUp,
    Search,
    ArrowRight,
    Plus,
    Pencil,
    Trash2
} from 'lucide-react';
import BaseModal from '../../components/modals/BaseModal';
import InventoryForm from '../../components/forms/InventoryForm';

const stockData = [
    { label: "Total Items", value: "248", sub: "SKUs", trend: "+2", color: "bg-[#0081cc]", icon: Package },
    { label: "Low Stock Items", value: "12", sub: "Alerts", trend: "-3", color: "bg-amber-500", icon: AlertTriangle },
    { label: "Critical Shortage", value: "05", sub: "Urgent", trend: "+1", color: "bg-[#ce1126]", icon: AlertTriangle },
    { label: "Inventory Value", value: "₵84.2k", sub: "Asset", trend: "+4.1%", color: "bg-[#003366]", icon: TrendingUp },
];

const InventoryModule: React.FC = () => {
    const [items, setItems] = React.useState([
        { id: 'PR-101', name: 'Water Preforms (20g)', cat: 'Raw Material', qty: '45,200', unit: 'pcs', status: 'Healthy' },
        { id: 'LF-202', name: 'Laminated Roll Film', cat: 'Packaging', qty: '12', unit: 'rolls', status: 'Low' },
        { id: 'PB-303', name: 'Packing Bags (Outer)', cat: 'Packaging', qty: '850', unit: 'bags', status: 'Critical' },
        { id: 'CH-404', name: 'Water Treatment Chem A', cat: 'Chemicals', qty: '120', unit: 'liters', status: 'Healthy' },
        { id: 'CH-405', name: 'Water Treatment Chem B', cat: 'Chemicals', qty: '45', unit: 'liters', status: 'Healthy' },
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
    const handleEdit = (item: any) => setModalConfig({ isOpen: true, mode: 'edit', initialData: item });

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this inventory item?')) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    const handleSubmit = () => {
        alert(modalConfig.mode === 'add' ? 'Stock record adjusted!' : 'Stock record updated!');
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Inventory Control</h1>
                    <p className="text-slate-500 font-medium mt-1.5 uppercase tracking-widest text-[10px]">Stock Movement & Supply Chain Analytics</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleAdd}
                        className="bg-amber-500 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-amber-500/20 hover:-translate-y-1 transition-all flex items-center"
                    >
                        <Plus size={16} className="mr-2" /> Stock Adjustment
                    </button>
                    <div className="bg-white border border-slate-200 rounded-2xl flex items-center px-4 py-2 shadow-sm">
                        <Search size={16} className="text-slate-400 mr-2" />
                        <input type="text" placeholder="Search stock..." className="bg-transparent border-none outline-none text-sm font-black uppercase tracking-widest w-48" />
                    </div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stockData.map((kpi, i) => (
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
                                    {kpi.trend.startsWith('+') ? <ArrowUp size={10} className="text-emerald-400" /> : <ArrowDown size={10} className="text-rose-400" />}
                                    <span className="text-[9px] font-black text-white">{kpi.trend}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Registry */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase leading-none">Stock Registry</h3>
                        <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Inventory Health & Distribution</p>
                    </div>
                    <button className="text-[#0081cc] text-[10px] font-black uppercase tracking-widest hover:underline flex items-center">
                        Inventory Audit <ArrowRight size={14} className="ml-1" />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#003366] text-white">
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest rounded-tl-2xl">Item Registry</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Category</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right">Available Qty</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {items.map((item) => (
                                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-6">
                                        <p className="text-sm font-black text-slate-800 leading-none uppercase tracking-tight">{item.name}</p>
                                        <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-1.5">{item.id}</p>
                                    </td>
                                    <td className="py-6">
                                        <span className="text-[10px] font-black text-[#0081cc] bg-[#0081cc]/5 px-3 py-1 rounded-lg uppercase">{item.cat}</span>
                                    </td>
                                    <td className="py-6 text-right">
                                        <p className="text-sm font-black text-slate-900 leading-none">{item.qty}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">units</p>
                                    </td>
                                    <td className="py-6 text-center">
                                        <span className={`text-[9px] font-black uppercase px-3 py-1.5 rounded-xl shadow-sm ${item.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                            item.status === 'Low' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-rose-50 text-rose-600 border border-rose-100 animate-pulse'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-6 px-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 transition-opacity">
                                            <button onClick={() => handleEdit(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                                <Pencil size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
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

            {/* Bottom Alert Strip */}
            <div className="bg-[#ce1126] p-10 rounded-[3rem] flex items-center justify-between relative overflow-hidden group shadow-2xl">
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-black/20 to-transparent"></div>
                <div className="flex items-center space-x-6 relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                        <AlertTriangle className="text-white" size={32} />
                    </div>
                    <div>
                        <h4 className="text-white font-black text-2xl uppercase tracking-tighter leading-none">Critical Shortage Alert</h4>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-2">Outer Packing Bags reaching zero in approx. 12 hours</p>
                    </div>
                </div>
                <button className="bg-white text-[#ce1126] px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:-translate-y-1 transition-all active:scale-95 relative z-10">
                    Review Order
                </button>
            </div>

            {/* Modal */}
            <BaseModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.mode === 'add' ? 'Stock Adjustment (Manual)' : 'Update Stock Item'}
            >
                <InventoryForm onSubmit={handleSubmit} onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })} />
            </BaseModal>
        </div>
    );
};

export default InventoryModule;
