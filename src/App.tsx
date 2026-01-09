import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/auth/AuthContext';
import { StaffProvider } from './context/StaffContext';
import ProtectedRoute from './app/guards/ProtectedRoute';
import DashboardLayout from './app/layouts/DashboardLayout';
import Login from './app/routes/Login';
import Homepage from './app/routes/Homepage';
import OwnerDashboard from './app/routes/OwnerDashboard';
import FinanceModule from './modules/finance/FinanceModule';
import ProductionModule from './modules/production/ProductionModule';
import QCModule from './modules/quality-control/QCModule';
import InventoryModule from './modules/inventory/InventoryModule';
import SalesModule from './modules/sales/SalesModule';
import MaintenanceModule from './modules/maintenance/MaintenanceModule';
import HRModule from './modules/hr/HRModule';
import ReportsModule from './modules/reports/ReportsModule';
import InputerDashboard from './app/routes/InputerDashboard';

const Unauthorized = () => <div className="p-8 text-center text-rose-500 font-bold text-2xl uppercase tracking-tighter">You are not authorized to view this page.</div>;

function App() {
  return (
    <AuthProvider>
      <StaffProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              {/* Role-based Redirection */}
              <Route index element={<DashboardSelector />} />

              {/* Explicit Dashboard Routes */}
              <Route path="admin" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />
              <Route path="inputer" element={<ProtectedRoute><InputerDashboard /></ProtectedRoute>} />

              {/* Module Routes - Open Access */}
              <Route path="finance" element={<ProtectedRoute><FinanceModule /></ProtectedRoute>} />
              <Route path="production" element={<ProtectedRoute><ProductionModule /></ProtectedRoute>} />
              <Route path="qc" element={<ProtectedRoute><QCModule /></ProtectedRoute>} />
              <Route path="inventory" element={<ProtectedRoute><InventoryModule /></ProtectedRoute>} />
              <Route path="sales" element={<ProtectedRoute><SalesModule /></ProtectedRoute>} />
              <Route path="maintenance" element={<ProtectedRoute><MaintenanceModule /></ProtectedRoute>} />
              <Route path="hr" element={<ProtectedRoute><HRModule /></ProtectedRoute>} />

              <Route path="reports" element={
                <ProtectedRoute>
                  <ReportsModule />
                </ProtectedRoute>
              } />

              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </StaffProvider>
    </AuthProvider>
  );
}

function DashboardSelector() {
  const { user } = useAuth();
  if (user?.role === 'INPUTER') return <Navigate to="/dashboard/inputer" replace />;
  return <Navigate to="/dashboard/admin" replace />;
}

export default App;
