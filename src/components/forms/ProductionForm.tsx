import React from 'react';

const ProductionForm: React.FC<{ onSubmit: () => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    return (
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Date</label>
                    <input
                        type="date"
                        defaultValue={new Date().toISOString().split('T')[0]}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0081cc]/20 focus:border-[#0081cc] transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Production Type</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0081cc]/20 focus:border-[#0081cc] transition-all">
                        <option>Bagging (New Production)</option>
                        <option>Rebagging (Repackaging)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Shift Selection</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0081cc]/20 focus:border-[#0081cc] transition-all">
                        <option>Morning (06:00 - 14:00)</option>
                        <option>Afternoon (14:00 - 22:00)</option>
                        <option>Night (22:00 - 06:00)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Machine / Line Used</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0081cc]/20 focus:border-[#0081cc] transition-all">
                        <option>Sachet Line #1</option>
                        <option>Sachet Line #2</option>
                        <option>Bottling A (500ml)</option>
                        <option>Bottling B (1.5L)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Total Yield (Bags/Units)</label>
                    <input
                        type="number"
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0081cc]/20 focus:border-[#0081cc] transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Rejected / Wastage</label>
                    <input
                        type="number"
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#ce1126]/20 focus:border-[#ce1126] transition-all text-red-600"
                    />
                </div>
                <div className="lg:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Reason for Rejects / Remarks</label>
                    <textarea
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0081cc]/20 focus:border-[#0081cc] transition-all min-h-[100px]"
                        placeholder="Explain any production issues or reject reasons..."
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
                    className="bg-[#003366] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-[#003366]/20 hover:-translate-y-1 active:scale-95 transition-all"
                >
                    Save & Record Production
                </button>
            </div>
        </form>
    );
};

export default ProductionForm;
