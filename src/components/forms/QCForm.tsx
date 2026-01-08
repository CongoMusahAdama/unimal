import React from 'react';

const QCForm: React.FC<{ onSubmit: () => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    return (
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Test Type</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all">
                        <option>Raw Water Analysis</option>
                        <option>Treated Water Analysis</option>
                        <option>Bacteriological Test</option>
                        <option>PH Level Check</option>
                        <option>Residual Chlorine</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Batch Number</label>
                    <input
                        type="text"
                        placeholder="e.g. BATCH-2026-001"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-black"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">PH Level Test</label>
                    <input
                        type="number"
                        step="0.1"
                        placeholder="7.0"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-black"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">TDS / Conductivity (ppm)</label>
                    <input
                        type="number"
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-black"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Final Result / Decision</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-black">
                        <option className="text-emerald-600 font-black">PASS (Safe for Production)</option>
                        <option className="text-rose-600 font-black">FAIL (Contaminated / Adjustment needed)</option>
                        <option className="text-amber-600 font-black">PENDING LAB RESULTS</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">QC Officer Sign-off</label>
                    <input
                        type="text"
                        placeholder="Inspector Name"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-black"
                    />
                </div>
                <div className="lg:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Odour / Taste / Clarity Observation</label>
                    <textarea
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all min-h-[80px] font-black"
                        placeholder="Describe any physical anomalies..."
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
                    className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-indigo-600/20 hover:-translate-y-1 active:scale-95 transition-all"
                >
                    Save & Certify Batch
                </button>
            </div>
        </form>
    );
};

export default QCForm;
