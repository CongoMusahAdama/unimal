import React from 'react';
import {
    DollarSign,
    History,
    Wallet,
    Plus,
    TrendingUp,
    TrendingDown,
    Pencil,
    Trash2
} from 'lucide-react';
import BaseModal from '../../components/modals/BaseModal';
import ExpenseForm from '../../components/forms/ExpenseForm';
import SalesForm from '../../components/forms/SalesForm';

const kpiData = [
    { label: "Total Revenue", value: "₵142,480", sub: "Monthly", trend: "+12.4%", color: "bg-[#003366]", icon: DollarSign },
    { label: "Accounts Receivable", value: "₵32,150", sub: "Credit", trend: "+5.1%", color: "bg-amber-600", icon: Wallet },
    { label: "Op. Expenses", value: "₵58,330", sub: "Monthly", trend: "-2.2%", color: "bg-[#ce1126]", icon: History },
    { label: "Net Margin", value: "24.5%", sub: "Profitability", trend: "+3.2%", color: "bg-emerald-600", icon: TrendingUp },
];


const FinanceModule: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'expense' | 'sales'>('expense');
    const [expenses, setExpenses] = React.useState([
        { id: '1', date: '2026-01-08', category: 'Production (Fuel)', amount: '₵450.00', payee: 'Shell Filling Station', ref: 'EXP-402' },
        { id: '2', date: '2026-01-08', category: 'Maintenance', amount: '₵1,200.00', payee: 'Mechanical Solutions Ltd', ref: 'EXP-403' },
        { id: '3', date: '2026-01-07', category: 'Salaries', amount: '₵8,500.00', payee: 'Staff Payroll (Jan)', ref: 'PAY-001' },
    ]);

    const [salesList, setSalesList] = React.useState([
        { id: '1', date: '2026-01-08', customer: 'Takoradi Central Depot', amount: '₵4,250.00', route: 'Route A', status: 'Cash' },
        { id: '2', date: '2026-01-08', customer: 'Kofi Manu (Distributor)', amount: '₵1,120.00', route: 'Route B', status: 'Credit' },
        { id: '3', date: '2026-01-07', customer: 'Beach Road Retailers', amount: '₵850.00', route: 'Direct', status: 'Cash' },
    ]);

    const [modalConfig, setModalConfig] = React.useState<{
        isOpen: boolean;
        type: 'expense' | 'sales';
        mode: 'add' | 'edit';
        initialData: any | null;
    }>({
        isOpen: false,
        type: 'expense',
        mode: 'add',
        initialData: null
    });

    const handleAddExpense = () => setModalConfig({ isOpen: true, type: 'expense', mode: 'add', initialData: null });
    const handleAddSales = () => setModalConfig({ isOpen: true, type: 'sales', mode: 'add', initialData: null });

    const handleEdit = (data: any, type: 'expense' | 'sales') => {
        setModalConfig({ isOpen: true, type, mode: 'edit', initialData: data });
    };

    const handleDelete = (id: string, type: 'expense' | 'sales') => {
        if (window.confirm(`Delete this ${type} record?`)) {
            if (type === 'expense') setExpenses(expenses.filter(e => e.id !== id));
            else setSalesList(salesList.filter(s => s.id !== id));
        }
    };

    const handleSubmit = () => {
        alert(`${modalConfig.type === 'expense' ? 'Expense' : 'Sales'} record saved!`);
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Financial Control</h1>
                    <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-[10px]">Accounts Receivable, Sales & OpEx Tracker</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleAddSales}
                        className="bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-600/20 hover:-translate-y-1 transition-all flex items-center"
                    >
                        <Plus size={16} className="mr-2" /> New Sales Entry
                    </button>
                    <button
                        onClick={handleAddExpense}
                        className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-rose-600/20 hover:-translate-y-1 transition-all flex items-center"
                    >
                        <Plus size={16} className="mr-2" /> Log Expense
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {kpiData.map((kpi, i) => (
                    <div key={i} className={`${kpi.color} p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group`}>
                        <div className="absolute -right-8 -bottom-8 text-white/5 group-hover:scale-110 transition-transform duration-500">
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
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1.5">{kpi.sub}</p>
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

            {/* Finance Ledger CRUD */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        <button
                            onClick={() => setActiveTab('expense')}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'expense' ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Expense Ledger
                        </button>
                        <button
                            onClick={() => setActiveTab('sales')}
                            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'sales' ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Sales Journal
                        </button>
                    </div>
                    <div className="flex items-center bg-slate-50 px-5 py-3 rounded-xl border border-slate-100 min-w-[300px]">
                        <input
                            type="text"
                            placeholder={`Search ${activeTab}...`}
                            className="bg-transparent border-none focus:ring-0 text-xs font-black uppercase tracking-widest w-full"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#003366] text-white">
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest rounded-tl-2xl">Date</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">{activeTab === 'expense' ? 'Category / Payee' : 'Customer / Route'}</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Value</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">{activeTab === 'expense' ? 'Ref #' : 'Status'}</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {(activeTab === 'expense' ? expenses : salesList).map((item: any) => (
                                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-6 px-4 text-xs font-bold text-slate-400">{item.date}</td>
                                    <td className="py-6 px-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{activeTab === 'expense' ? item.category : item.customer}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{activeTab === 'expense' ? item.payee : item.route}</span>
                                        </div>
                                    </td>
                                    <td className={`py-6 px-4 text-sm font-black ${activeTab === 'expense' ? 'text-rose-600' : 'text-emerald-600'}`}>{item.amount}</td>
                                    <td className="py-6 px-4 text-[10px] font-black uppercase tracking-widest">
                                        {activeTab === 'expense' ? (
                                            <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-500">{item.ref}</span>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-lg ${item.status === 'Cash' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{item.status}</span>
                                        )}
                                    </td>
                                    <td className="py-6 px-4 text-right">
                                        <div className="flex items-center justify-end space-x-2 transition-opacity">
                                            <button onClick={() => handleEdit(item, activeTab)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"><Pencil size={14} /></button>
                                            <button onClick={() => handleDelete(item.id, activeTab)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"><Trash2 size={14} /></button>
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
                title={modalConfig.mode === 'add' ? `Record New ${modalConfig.type}` : `Edit ${modalConfig.type} Entry`}
            >
                {modalConfig.type === 'expense' ? (
                    <ExpenseForm onSubmit={handleSubmit} onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })} />
                ) : (
                    <SalesForm onSubmit={handleSubmit} onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })} />
                )}
            </BaseModal>
        </div>
    );
};

export default FinanceModule;
