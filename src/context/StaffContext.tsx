import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface Staff {
    id: string;
    name: string;
    role: string;
    dept: string;
    shift: string;
    status: string;
    salary: string; // Base or monthly expected
    hourlyRate: number; // For calculation
    lastActionTime: string | null;
    clockInTime: string | null;
    totalHoursToday: number;
    totalHoursMonth: number;
}

interface StaffContextType {
    staffList: Staff[];
    clockIn: (id: string) => void;
    clockOut: (id: string) => void;
    addStaff: (staff: Staff) => void;
    updateStaff: (staff: Staff) => void;
    deleteStaff: (id: string) => void;
    getTotalTeamHours: () => number;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [staffList, setStaffList] = useState<Staff[]>([
        { id: 'EMP-001', name: 'Kwame Mensah', role: 'Machine Operator', dept: 'Production', shift: 'Morning', status: 'Active', salary: '1,200', hourlyRate: 15, lastActionTime: '08:00 AM', clockInTime: new Date(new Date().setHours(8, 0)).toISOString(), totalHoursToday: 6.5, totalHoursMonth: 160 },
        { id: 'EMP-002', name: 'Sarah Osei', role: 'Quality Inspector', dept: 'QA / QC', shift: 'Morning', status: 'Active', salary: '1,500', hourlyRate: 18, lastActionTime: '08:15 AM', clockInTime: new Date(new Date().setHours(8, 15)).toISOString(), totalHoursToday: 6.25, totalHoursMonth: 155 },
        { id: 'EMP-003', name: 'John Doe', role: 'Driver', dept: 'Logistics', shift: 'Afternoon', status: 'On Route', salary: '1,100', hourlyRate: 12, lastActionTime: '02:30 PM', clockInTime: new Date(new Date().setHours(14, 30)).toISOString(), totalHoursToday: 0, totalHoursMonth: 140 },
        { id: 'EMP-004', name: 'Ama Boateng', role: 'Packer', dept: 'Production', shift: 'Night', status: 'Absent', salary: '900', hourlyRate: 10, lastActionTime: null, clockInTime: null, totalHoursToday: 0, totalHoursMonth: 120 },
    ]);

    const clockIn = (id: string) => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setStaffList(prev => prev.map(s =>
            s.id === id ? { ...s, status: 'Active', lastActionTime: timeStr, clockInTime: now.toISOString() } : s
        ));
    };

    const clockOut = (id: string) => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        setStaffList(prev => prev.map(s => {
            if (s.id === id) {
                let sessionHours = 0;
                if (s.clockInTime) {
                    const diffMs = now.getTime() - new Date(s.clockInTime).getTime();
                    sessionHours = Math.max(0, diffMs / (1000 * 60 * 60)); // Convert to hours
                }
                return {
                    ...s,
                    status: 'Clocked Out',
                    lastActionTime: timeStr,
                    clockInTime: null,
                    totalHoursToday: s.totalHoursToday + sessionHours,
                    totalHoursMonth: s.totalHoursMonth + sessionHours
                };
            }
            return s;
        }));
    };

    const addStaff = (staff: Staff) => {
        setStaffList(prev => [...prev, staff]);
    };

    const updateStaff = (staff: Staff) => {
        setStaffList(prev => prev.map(s => s.id === staff.id ? staff : s));
    };

    const deleteStaff = (id: string) => {
        setStaffList(prev => prev.filter(s => s.id !== id));
    };

    const getTotalTeamHours = () => {
        return staffList.reduce((acc, curr) => acc + curr.totalHoursToday, 0);
    };

    return (
        <StaffContext.Provider value={{ staffList, clockIn, clockOut, addStaff, updateStaff, deleteStaff, getTotalTeamHours }}>
            {children}
        </StaffContext.Provider>
    );
};

export const useStaff = () => {
    const context = useContext(StaffContext);
    if (!context) {
        throw new Error('useStaff must be used within a StaffProvider');
    }
    return context;
};
