import React, { useState } from 'react';
import { ShieldAlert, Users, Briefcase, CalendarClock, Pencil, Trash2, Plus, ArrowRight } from 'lucide-react';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import BaseModal from '../../components/modals/BaseModal';
import HRForm from '../../components/forms/HRForm';

import { useStaff } from '../../context/StaffContext';
import { useAuth } from '../../services/auth/AuthContext';

const HRModule: React.FC = () => {
    const { staffList, deleteStaff, clockIn, clockOut } = useStaff();
    const { user } = useAuth();
    const isInputer = user?.role === 'INPUTER';

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

    const [selectedDept, setSelectedDept] = useState<string>('All');
    const departments = ['All', ...new Set(staffList.map(s => s.dept))];

    // Filtered lists
    const filteredStaff = selectedDept === 'All'
        ? staffList
        : staffList.filter(s => s.dept === selectedDept);

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



            {/* Department Filter Strip */}
            <div className="bg-white p-4 rounded-3xl border border-slate-50 shadow-sm flex items-center space-x-3 overflow-x-auto no-scrollbar flex-nowrap">
                <div className="flex items-center space-x-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 flex-shrink-0">
                    <Briefcase size={14} className="text-slate-400" />
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Filter by Department:</span>
                </div>
                {departments.map(dept => (
                    <button
                        key={dept}
                        onClick={() => setSelectedDept(dept)}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedDept === dept
                            ? 'bg-[#003366] text-white shadow-lg'
                            : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'
                            }`}
                    >
                        {dept}
                    </button>
                ))}
            </div>

            {/* 3. Dedicated Attendance Duty Register Table */}
            <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500 opacity-5 rounded-full -mr-48 -mt-48 blur-[80px]"></div>

                <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className="flex items-center space-x-3">
                        <div className="bg-white/10 p-3 rounded-2xl">
                            <CalendarClock size={24} className="text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Daily Attendance Register</h3>
                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest"> Formal Shift Enrollment Ledger {selectedDept !== 'All' ? `• ${selectedDept}` : ''}</p>
                        </div>
                    </div>
                    {isInputer && (
                        <div className="flex items-center space-x-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Entry Active</span>
                        </div>
                    )}
                </div>

                <div className="overflow-x-auto relative z-10">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-white/40">Employee Name</th>
                                <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-white/40">Shift</th>
                                <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-white/40">Clock-In Time</th>
                                <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-white/40">Duty Duration</th>
                                <th className="py-4 px-2 text-[10px] font-black uppercase tracking-widest text-right text-white/40">Presence Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredStaff.map((staff) => (
                                <tr key={staff.id} className="hover:bg-white/5 transition-colors group/register">
                                    <td className="py-5 px-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black">
                                                {staff.name.charAt(0)}
                                            </div>
                                            <span className="text-sm font-bold text-white/90">{staff.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{staff.shift}</span>
                                    </td>
                                    <td className="py-5 px-2">
                                        {staff.clockInTime ? (
                                            <span className="text-xs font-black text-emerald-400">
                                                {new Date(staff.clockInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-bold text-white/20 uppercase">Not Recorded</span>
                                        )}
                                    </td>
                                    <td className="py-5 px-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${staff.status === 'Active' ? 'bg-emerald-500' : 'bg-white/20'}`}
                                                    style={{ width: `${Math.min(100, (staff.totalHoursToday / 8) * 100)}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-black text-white/60">{staff.totalHoursToday.toFixed(1)}h</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-2 text-right">
                                        {isInputer ? (
                                            <div className="flex items-center justify-end space-x-2">
                                                {staff.status !== 'Active' ? (
                                                    <button
                                                        onClick={() => { clockIn(staff.id); alert(`${staff.name} Clocked In`); }}
                                                        className="px-4 py-2 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/10"
                                                    >
                                                        Register In
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => { clockOut(staff.id); alert(`${staff.name} Clocked Out`); }}
                                                        className="px-4 py-2 bg-[#ce1126] text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-500/10"
                                                    >
                                                        Confirm Out
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${staff.status === 'Active' ? 'text-emerald-400 bg-emerald-400/10' : 'text-white/20 bg-white/5'
                                                }`}>
                                                {staff.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Work Hours</th>
                                <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredStaff.map((staff, i) => (
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
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm font-black text-[#003366]">{staff.totalHoursToday.toFixed(1)} hrs</span>
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Today's Accumulation</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 text-right">
                                        <div className="flex items-center justify-end space-x-2 transition-opacity">
                                            <button onClick={() => handleEdit(staff)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                                <Pencil size={14} />
                                            </button>
                                            {!isInputer && (
                                                <button onClick={() => handleDelete(staff.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Data Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weekly Attendance (Tabular) */}
                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none">Weekly Headcount</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Attendance Tabulation</p>
                        </div>
                        <CalendarClock size={20} className="text-[#0081cc]" />
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-[#003366] text-white">
                                <tr>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest rounded-tl-2xl">Day of Week</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Staff Present</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right rounded-tr-2xl">Utilization</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {attendanceTrend.map((row, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-black text-slate-700 text-sm uppercase">{row.day}</td>
                                        <td className="py-4 px-6 text-center">
                                            <span className="bg-blue-50 text-[#003366] px-3 py-1 rounded-lg text-xs font-black">{row.count}</span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <span className="text-xs font-bold text-slate-500">{((row.count / 148) * 100).toFixed(1)}%</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payroll Distribution */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm flex flex-col">
                    <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">Role Distribution</h3>
                    <div className="h-64 relative flex-1">
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
                            <p className="text-[9px] uppercase tracking-widest text-slate-400">Deployed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Only: Monthly Timesheet & Salary Breakdown */}
            {!isInputer && (
                <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-sm animate-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Monthly Timesheet & Payroll</h3>
                            <p className="text-[10px] font-bold text-[#ce1126] uppercase tracking-[0.2em] mt-1">Authorized Personnel Only • Automated Calculation</p>
                        </div>
                        <div className="bg-[#ce1126] text-white p-3 rounded-2xl shadow-lg shadow-red-900/10">
                            <Briefcase size={24} />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#003366] text-white">
                                <tr>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest rounded-tl-2xl">Employee</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Rate (₵/hr)</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-center">Monthly Hours</th>
                                    <th className="py-4 px-6 text-[10px] font-black uppercase tracking-widest text-right rounded-tr-2xl">Final Salary (₵)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredStaff.map((staff, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="py-6 px-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[10px] font-black">
                                                    {staff.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-black text-slate-800">{staff.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6 text-center text-sm font-bold text-slate-500">₵{staff.hourlyRate}</td>
                                        <td className="py-6 px-6 text-center">
                                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-black">
                                                {staff.totalHoursMonth.toFixed(1)} hrs
                                            </span>
                                        </td>
                                        <td className="py-6 px-6 text-right">
                                            <span className="text-lg font-black text-slate-900 tracking-tighter">
                                                ₵{(staff.totalHoursMonth * staff.hourlyRate).toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-slate-900 text-white">
                                <tr>
                                    <td colSpan={3} className="py-4 px-6 text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">Total Payroll Liability</td>
                                    <td className="py-4 px-6 text-right text-xl font-black tracking-tighter rounded-br-2xl">
                                        ₵{filteredStaff.reduce((acc, s) => acc + (s.totalHoursMonth * s.hourlyRate), 0).toLocaleString()}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal */}
            <BaseModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
                title={modalConfig.mode === 'add' ? 'New Employee Record' : 'Update Employee / Attendance'}
            >
                <HRForm
                    onSubmit={handleSubmit}
                    onCancel={() => setModalConfig({ ...modalConfig, isOpen: false })}
                />
            </BaseModal>
        </div>
    );
};

export default HRModule;
