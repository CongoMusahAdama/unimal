import React from 'react';

const SalesForm: React.FC<{ onSubmit: () => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    return (
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Distributor / Customer Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Takoradi Central Depot"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all font-black"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assigned Route</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all font-black">
                        <option>Route A - Kwesimintsim / Apremdo</option>
                        <option>Route B - Sekondi / Essikado</option>
                        <option>Route C - Market Circle / Beach Road</option>
                        <option>Route D - Kojokrom / Shama</option>
                        <option>Direct Depot Sale</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Truck / Vehicle #</label>
                    <input
                        type="text"
                        placeholder="e.g. WR-492-23"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all font-black"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Product Category</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all font-black">
                        <option>Voltic Cool Pac (Bags)</option>
                        <option>Unimanuel Bottle 500ml (Crates)</option>
                        <option>Unimanuel Bottle 1.5L (Crates)</option>
                        <option>Dispenser Jars (Full)</option>
                        <option>Returns / Exchanges</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Quantity</label>
                    <input
                        type="number"
                        placeholder="0"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all font-black"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Unit Price (₵)</label>
                    <input
                        type="number"
                        placeholder="3.50"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all font-black"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Payment Status</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all font-black">
                        <option className="text-green-600">Cash Received</option>
                        <option className="text-amber-600">Credit Sale (Pending)</option>
                        <option className="text-indigo-600">Mobile Money</option>
                        <option className="text-blue-600">Bank Transfer</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Sales Officer / Accountant</label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all font-black"
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
                    className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-600/20 hover:-translate-y-1 active:scale-95 transition-all"
                >
                    Record & Post Entry
                </button>
                <div className="h-10 w-px bg-slate-100 mx-2"></div>
                <button
                    type="button"
                    className="border-2 border-[#003366] text-[#003366] px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#003366] hover:text-white transition-all flex items-center space-x-2"
                >
                    <span>Print Invoice</span>
                </button>
            </div>
        </form>
    );
};

export default SalesForm;
