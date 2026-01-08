import React from 'react';

const ExpenseForm: React.FC<{ onSubmit: () => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    return (
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Expense Category</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-black">
                        <option>Production (Power / Fuel / Treatment)</option>
                        <option>Packaging Material Costs</option>
                        <option>Salaries & Wages</option>
                        <option>Machine Maintenance & Repairs</option>
                        <option>Logistics / Truck Maintenance</option>
                        <option>Administrative / Office Expenses</option>
                        <option>Miscellaneous / Petty Cash</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Amount (₵)</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-black"
                    />
                </div>
                <div className="space-y-2 lg:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Payee / Description</label>
                    <input
                        type="text"
                        placeholder="Who was paid and for what specifically?"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-black"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Voucher / Reference #</label>
                    <input
                        type="text"
                        placeholder="e.g. EXP-2026-001"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-black"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Accountant Sign-off</label>
                    <input
                        type="text"
                        placeholder="Name of poster"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-black"
                    />
                </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-rose-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-rose-600/20 hover:-translate-y-1 active:scale-95 transition-all"
                >
                    Post & Record Expense
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
