export type UserRole =
    | 'OWNER'
    | 'ACCOUNTANT'
    | 'PRODUCTION_SUPERVISOR'
    | 'INVENTORY_OFFICER'
    | 'SALES_OFFICER'
    | 'QC_OFFICER'
    | 'MAINTENANCE_OFFICER'
    | 'INPUTER';

export interface User {
    id: string;
    name: string;
    role: UserRole;
    email: string;
}

export interface ProductionRecord {
    id: string;
    date: string;
    shift: 'MORNING' | 'AFTERNOON' | 'NIGHT';
    machineId: string;
    quantityProduced: number;
    wastage: number;
    supervisorId: string;
}

export interface SalesRecord {
    id: string;
    date: string;
    distributorId: string;
    quantitySold: number;
    amount: number;
    paymentStatus: 'PAID' | 'PENDING' | 'CREDIT';
    recordedBy: string;
}

export interface InventoryItem {
    id: string;
    name: string;
    category: 'RAW_MATERIAL' | 'FINISHED_GOODS' | 'SPARE_PARTS';
    quantity: number;
    unit: string;
    reorderLevel: number;
}
