import React from 'react';

const InventoryForm: React.FC<{ onSubmit: () => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    return (
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 lg:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Transaction Type</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Stock In', 'Stock Out', 'Adjustment'].map((t) => (
                            <button key={t} type="button" className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${t === 'Stock Out' ? 'bg-amber-500 text-white border-amber-500 shadow-lg' : 'bg-slate-50 text-slate-400 border-slate-100 hover:border-amber-200'}`}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Item Name</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all">
                        <option>Sachet Film (Rolls)</option>
                        <option>Preforms (Units)</option>
                        <option>PE Resin (Bags)</option>
                        <option>Chlorine (Buckets)</option>
                        <option>Packing Bags (Bales)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quantity</label>
                    <input
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                </div>
                <div className="space-y-2 lg:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Reason / Notes</label>
                    <textarea
                        rows={3}
                        placeholder="e.g. Issued for Shift A production..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-none"
                    ></textarea>
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
                    className="bg-amber-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-amber-600/20 hover:-translate-y-1 active:scale-95 transition-all"
                >
                    Record Inventory Move
                </button>
            </div>
        </form>
    );
};

export default InventoryForm;
