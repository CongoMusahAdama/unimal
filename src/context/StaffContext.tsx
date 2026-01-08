import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Staff {
    id: string;
    name: string;
    role: string;
    dept: string;
    shift: string;
    status: string;
    salary: string;
    lastActionTime: string | null;
}

interface StaffContextType {
    staffList: Staff[];
    clockIn: (id: string) => void;
    clockOut: (id: string) => void;
    addStaff: (staff: Staff) => void;
    updateStaff: (staff: Staff) => void;
    deleteStaff: (id: string) => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [staffList, setStaffList] = useState<Staff[]>([
        { id: 'EMP-001', name: 'Kwame Mensah', role: 'Machine Operator', dept: 'Production', shift: 'Morning', status: 'Active', salary: '1,200', lastActionTime: '08:00 AM' },
        { id: 'EMP-002', name: 'Sarah Osei', role: 'Quality Inspector', dept: 'QA / QC', shift: 'Morning', status: 'Active', salary: '1,500', lastActionTime: '08:15 AM' },
        { id: 'EMP-003', name: 'John Doe', role: 'Driver', dept: 'Logistics', shift: 'Afternoon', status: 'On Route', salary: '1,100', lastActionTime: '02:30 PM' },
        { id: 'EMP-004', name: 'Ama Boateng', role: 'Packer', dept: 'Production', shift: 'Night', status: 'Absent', salary: '900', lastActionTime: null },
    ]);

    const clockIn = (id: string) => {
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setStaffList(prev => prev.map(s => s.id === id ? { ...s, status: 'Active', shift: 'Morning', lastActionTime: time } : s));
    };

    const clockOut = (id: string) => {
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setStaffList(prev => prev.map(s => s.id === id ? { ...s, status: 'Clocked Out', shift: 'Ended', lastActionTime: time } : s));
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

    return (
        <StaffContext.Provider value={{ staffList, clockIn, clockOut, addStaff, updateStaff, deleteStaff }}>
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
