import React, { useState } from 'react';
import { ShieldAlert, Users, Briefcase, CalendarClock, Pencil, Trash2, Plus, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import BaseModal from '../../components/modals/BaseModal';
import HRForm from '../../components/forms/HRForm';

import { useStaff } from '../../context/StaffContext';

const HRModule: React.FC = () => {
    const { staffList, deleteStaff, clockIn, clockOut } = useStaff();

    // 1. Mock Data (KPIs, Charts...)
    const attendanceTrend = [
        { day: 'Mon', count: 142 },
        { day: 'Tue', count: 145 },
        { day: 'Wed', count: 148 },
        { day: 'Thu', count: 144 },
        { day: 'Fri', count: 146 },
        { day: 'Sat', count: 130 },
        { day: 'Sun', count: 85 },
    ];

    const payrollByDept = [
        { name: 'Production', value: 45000, color: '#0081cc' },
        { name: 'Distribution', value: 35000, color: '#ff8c00' },
        { name: 'Admin', value: 25000, color: '#10b981' },
    ];

    const kpiData = [
        { label: 'Total Headcount', value: '148', sub: '98% Active', trend: '+12%', icon: Users, color: 'bg-[#0081cc] text-white' },
        { label: 'Today Attendance', value: '142', sub: '6 Absent', trend: '+4%', icon: CalendarClock, color: 'bg-[#ff8c00] text-white' },
        { label: 'Payroll Forecast', value: '₵62k', sub: 'Monthly Est.', trend: '-2%', icon: Briefcase, color: 'bg-[#10b981] text-white' },
        { label: 'Safety Incidents', value: '0', sub: 'Year to Date', trend: '0%', icon: ShieldAlert, color: 'bg-[#ce1126] text-white' },
    ];

    // Modal State
    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        mode: 'add' | 'edit';
        initialData: any | null;
    }>({
        isOpen: false,
        mode: 'add',
        initialData: null,
    });

    // Handlers
    const handleAdd = () => {
        setModalConfig({ isOpen: true, mode: 'add', initialData: null });
    };

    const handleEdit = (employee: any) => {
        setModalConfig({ isOpen: true, mode: 'edit', initialData: employee });
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to remove this employee record?')) {
            deleteStaff(id);
        }
    };

    const handleSubmit = () => {
        alert(modalConfig.mode === 'add' ? 'Employee record added!' : 'Employee record updated!');
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    const handleClockIn = (id: string) => {
        clockIn(id);
        alert('Staff Member Clocked In Successfully');
    };

    const handleClockOut = (id: string) => {
        clockOut(id);
        alert('Staff Member Clocked Out Successfully');
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">HR & Workforce Control</h1>
                    <p className="text-slate-500 font-medium mt-1.5 uppercase tracking-widest text-[10px]">Headcount, Payroll Oversight & Reliability</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleAdd}
                        className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-purple-600/20 hover:-translate-y-1 transition-all flex items-center"
                    >
                        <Plus size={16} className="mr-2" /> Add Employee
                    </button>
                    <button className="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-slate-700 font-black uppercase text-[10px] tracking-widest shadow-sm hover:shadow-md transition-all flex items-center">
                        <ShieldAlert size={16} className="mr-2" /> Compliance
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
                                <div className="p-2 bg-white/10 rounded-xl text-white">
                                    <kpi.icon size={14} />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-4xl font-black text-white tracking-tighter">{kpi.value}</span>
                                    <span className={`text-xs font-bold ${kpi.trend.startsWith('+') ? 'text-emerald-300' : 'text-rose-300'}`}>{kpi.trend}</span>
                                </div>
                                <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{kpi.sub}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>



            {/* Active Staff Control Grid (Rapid Access) */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#003366] p-3 rounded-2xl text-white shadow-lg shadow-blue-900/20">
                            <Users size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Team Control</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Shift Management</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
                    {staffList.map((staff) => (
                        <div key={staff.id} className="group bg-slate-50 hover:bg-white p-6 rounded-[2rem] border border-transparent hover:border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                            {/* Status Indicator Line */}
                            <div className={`absolute top-0 left-0 w-full h-1.5 transition-colors duration-300 ${staff.status === 'Active' ? 'bg-emerald-500' :
                                staff.status === 'Clocked Out' ? 'bg-slate-300' : 'bg-amber-400'
                                }`}></div>

                            <div className="flex items-start justify-between mb-6 pt-2">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner transition-colors duration-300 ${staff.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                        'bg-white text-slate-400 border border-slate-100'
                                        }`}>
                                        {staff.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 leading-tight group-hover:text-[#003366] transition-colors">{staff.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{staff.role}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-white rounded-xl p-1.5 border border-slate-100 shadow-sm gap-2">
                                <button
                                    onClick={() => { clockIn(staff.id); alert(`${staff.name} Clocked In!`); }}
                                    disabled={staff.status === 'Active' || staff.status === 'On Route'}
                                    className="flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-200 flex items-center justify-center space-x-1 hover:-translate-y-0.5 disabled:translate-y-0 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white disabled:opacity-30 disabled:hover:bg-emerald-50 disabled:hover:text-emerald-600"
                                >
                                    <span>Clock In</span>
                                </button>
                                <button
                                    onClick={() => { clockOut(staff.id); alert(`${staff.name} Clocked Out!`); }}
                                    disabled={staff.status === 'Clocked Out'}
                                    className="flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-200 flex items-center justify-center space-x-1 hover:-translate-y-0.5 disabled:translate-y-0 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white disabled:opacity-30 disabled:hover:bg-rose-50 disabled:hover:text-rose-600"
                                >
                                    <span>Clock Out</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Employee List Table */}
            <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                    <div className="space-y-1.5">
                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter leading-none group-hover:text-[#003366] transition-colors">Workforce Accountability Log</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time attendance & role deployment</p>
                    </div>
                    <button className="flex items-center space-x-2 text-[#003366] text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-[#003366]">
                        Full HR Portal <ArrowRight size={14} />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#003366] text-white">
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest rounded-tl-2xl">Employee Profile</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Department</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Deployment</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Duty Status</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Time Clock</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {staffList.map((staff, i) => (
                                <tr key={i} className="group/row hover:bg-slate-50/50 transition-all cursor-default">
                                    <td className="py-6 px-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#003366] font-black text-xs shadow-inner uppercase tracking-tighter">
                                                {staff.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-800 leading-none">{staff.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{staff.id} • {staff.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="flex items-center space-x-2">
                                            <Briefcase size={14} className="text-[#003366]" />
                                            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{staff.dept}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.1em]">{staff.shift} Shift</span>
                                            {staff.lastActionTime && (
                                                <span className="text-[8px] font-bold text-slate-300 uppercase leading-none mt-1">
                                                    {staff.status === 'Clocked Out' ? 'Out at: ' : 'In at: '} {staff.lastActionTime}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 text-center">
                                        <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                            staff.status === 'On Route' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                                staff.status === 'Clocked Out' ? 'bg-slate-100 text-slate-400 border border-slate-200' :
                                                    'bg-rose-50 text-rose-500 border border-rose-100 animate-pulse'
                                            }`}>
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td className="py-6 px-6 text-center">
                                        <div className="flex items-center justify-center space-x-2">
                                            <button
                                                onClick={() => handleClockIn(staff.id)}
                                                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={staff.status === 'Active' || staff.status === 'On Route'}
                                            >
                                                IN
                                            </button>
                                            <button
                                                onClick={() => handleClockOut(staff.id)}
                                                className="bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={staff.status === 'Clocked Out'}
                                            >
                                                OUT
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 text-right">
                                        <div className="flex items-center justify-end space-x-2 transition-opacity">
                                            <button onClick={() => handleEdit(staff)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                                <Pencil size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(staff.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
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

            {/* Charts Section (Moved to Bottom) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Attendance Trend */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">Weekly Attendance</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={attendanceTrend}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ stroke: '#8b5cf6', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Payroll Distribution */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm">
                    <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">Payroll Split</h3>
                    <div className="h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={payrollByDept}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {payrollByDept.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <span className="text-2xl font-black text-slate-800">100%</span>
                            <p className="text-[9px] uppercase tracking-widest text-slate-400">Allocated</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <BaseModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.mode === 'add' ? 'New Employee Record' : 'Update Employee / Attendance'}
            >
                <HRForm
                    initialData={modalConfig.initialData}
                    onSubmit={handleSubmit}
                    onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })}
                />
            </BaseModal>
        </div>
    );
};

export default HRModule;
