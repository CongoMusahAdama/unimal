import React from 'react';

const HRForm: React.FC<{ initialData?: any; onSubmit: () => void; onCancel: () => void }> = ({ initialData, onSubmit, onCancel }) => {
    return (
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Employee Name</label>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Department</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all">
                        <option>Production</option>
                        <option>Sales & Logistics</option>
                        <option>Administration</option>
                        <option>Maintenance</option>
                        <option>Security</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assigned Shift</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all">
                        <option>Morning (06:00 - 14:00)</option>
                        <option>Afternoon (14:00 - 22:00)</option>
                        <option>Night (22:00 - 06:00)</option>
                        <option>General (08:00 - 17:00)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Attendance Status</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button type="button" className="py-4 bg-teal-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-teal-500/20">Present</button>
                        <button type="button" className="py-4 bg-slate-50 text-slate-400 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest">Absent</button>
                    </div>
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
                    className="bg-teal-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-teal-600/20 hover:-translate-y-1 active:scale-95 transition-all"
                >
                    Update Staff Log
                </button>
            </div>
        </form>
    );
};

export default HRForm;
