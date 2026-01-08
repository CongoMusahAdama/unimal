import React from 'react';

const MaintenanceForm: React.FC<{ onSubmit: () => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    return (
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset / Machine</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all">
                        <option>Sachet Line A</option>
                        <option>Sachet Line B</option>
                        <option>Bottling Line 1</option>
                        <option>Purification Unit</option>
                        <option>Delivery Truck (GT-1234)</option>
                        <option>Electric Generator</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Log Type</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all">
                        <option>Scheduled Maintenance</option>
                        <option>Emergency Breakdown</option>
                        <option>Component Replacement</option>
                        <option>Routine Inspection</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Issue Severity</label>
                    <div className="grid grid-cols-3 gap-2">
                        <button type="button" className="py-3 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest">Low</button>
                        <button type="button" className="py-3 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20">Mid</button>
                        <button type="button" className="py-3 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest">High</button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Down-time (mins)</label>
                    <input
                        type="number"
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                    />
                </div>
                <div className="space-y-2 lg:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Maintenance Notes</label>
                    <textarea
                        rows={3}
                        placeholder="Detail the repair or maintenance work performed..."
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
                    Log Activity
                </button>
            </div>
        </form>
    );
};

export default MaintenanceForm;
