import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../services/auth/AuthContext';
import PageLoader from '../../components/shared/PageLoader';
import {
    LayoutDashboard,
    Droplets,
    Calculator,
    Package,
    Truck,
    Users,
    Menu,
    LogOut,
    ClipboardCheck,
    Wrench,
    Bell,
    Moon,
    ChevronLeft,
    UserCircle,
    FileText
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const DashboardLayout: React.FC = () => {
    const { user, logout } = useAuth();
    const [isDesktopSidebarExpanded, setIsDesktopSidebarExpanded] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Trigger loader on navigation
    useEffect(() => {
        setIsPageLoading(true);
        setIsMobileMenuOpen(false); // Close mobile menu on navigation
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: user?.role === 'INPUTER' ? '/dashboard/inputer' : '/dashboard/admin', icon: LayoutDashboard, roles: ['OWNER', 'ACCOUNTANT', 'PRODUCTION_SUPERVISOR', 'INPUTER'] },
        { name: 'Finance', path: '/dashboard/finance', icon: Calculator, roles: ['OWNER', 'ACCOUNTANT', 'INPUTER'] },
        { name: 'Production', path: '/dashboard/production', icon: Droplets, roles: ['OWNER', 'PRODUCTION_SUPERVISOR', 'INPUTER'] },
        { name: 'Quality Control', path: '/dashboard/qc', icon: ClipboardCheck, roles: ['OWNER', 'QC_OFFICER', 'INPUTER'] },
        { name: 'Inventory', path: '/dashboard/inventory', icon: Package, roles: ['OWNER', 'INVENTORY_OFFICER', 'INPUTER'] },
        { name: 'Sales & Dist.', path: '/dashboard/sales', icon: Truck, roles: ['OWNER', 'SALES_OFFICER', 'INPUTER'] },
        { name: 'Maintenance', path: '/dashboard/maintenance', icon: Wrench, roles: ['OWNER', 'MAINTENANCE_OFFICER', 'INPUTER'] },
        { name: 'HR / Employees', path: '/dashboard/hr', icon: Users, roles: ['OWNER', 'INPUTER'] },
        { name: 'Reports', path: '/dashboard/reports', icon: FileText, roles: ['OWNER', 'INPUTER'] },
    ];

    const filteredNavItems = navItems.filter(item =>
        !item.roles || (user && item.roles.includes(user.role))
    );

    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        return 'evening';
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans relative">
            {isPageLoading && <PageLoader />}

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[45] md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-[#003366] text-white transition-all duration-300 ease-in-out flex flex-col z-[50] shadow-2xl overflow-hidden fixed md:static inset-y-0 left-0 h-full",
                    // Mobile: Fixed, slide in/out
                    isMobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0",
                    // Desktop: Toggle width
                    isDesktopSidebarExpanded ? "md:w-72" : "md:w-24"
                )}
            >
                <div className="p-6 flex items-center justify-between border-b border-white/5 mb-4">
                    <div className="flex items-center">
                        <div className={cn("transition-all", (!isDesktopSidebarExpanded && "md:scale-0 md:opacity-0 md:w-0"))}>
                            <img src="/logo.png" alt="Unimanuel Logo" className="h-10 w-auto object-contain" />
                        </div>
                        {/* Collapsed Logo for Desktop */}
                        <div className={cn("absolute transition-all duration-300", (isDesktopSidebarExpanded ? "opacity-0 scale-0" : "opacity-100 scale-100"))}>
                            <div className="bg-white rounded-lg p-1.5 shadow-lg">
                                <Droplets className="w-5 h-5 text-brand-red" />
                            </div>
                        </div>
                    </div>
                    {/* Desktop Toggle Button */}
                    <button
                        onClick={() => setIsDesktopSidebarExpanded(!isDesktopSidebarExpanded)}
                        className="text-white/40 hover:text-white transition-colors hidden md:block"
                    >
                        {isDesktopSidebarExpanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
                    </button>
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white/40 hover:text-white transition-colors md:hidden"
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                {/* Profile Section */}
                <div className={cn(
                    "px-6 py-8 text-center border-b border-white/5 mx-4 mb-4 bg-white/5 rounded-3xl transition-all duration-300",
                    !isDesktopSidebarExpanded && "md:hidden"
                )}>
                    <div className="relative inline-block group mb-3">
                        <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl ring-4 ring-white/10 group-hover:scale-105 transition-transform duration-300">
                            {user?.name.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-[#003366] rounded-full"></div>
                    </div>
                    <h3 className="font-bold text-lg text-white truncate px-2">{user?.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00adff] mb-1">
                        {user?.role.replace('_', ' ')}
                    </p>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                    {filteredNavItems.map((item) => {
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                        // Tooltip logic for collapsed state could go here
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex items-center p-3.5 rounded-xl transition-all group relative duration-200",
                                    isActive
                                        ? "bg-white/10 text-white shadow-lg"
                                        : "text-white/50 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 w-1.5 h-6 bg-brand-red rounded-full -ml-4" />
                                )}
                                <item.icon className={cn("w-5 h-5 transition-transform duration-200 group-hover:scale-110", isDesktopSidebarExpanded ? "mr-4" : "md:mx-auto mr-4")} />
                                <span className={cn("text-sm font-bold tracking-tight whitespace-nowrap", !isDesktopSidebarExpanded && "md:hidden")}>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-white/5 space-y-2">
                    <button className="flex items-center w-full p-3 text-white/50 hover:text-white transition-colors group">
                        <Moon className={cn("w-5 h-5", isDesktopSidebarExpanded ? "mr-4" : "md:mx-auto mr-4")} />
                        <span className={cn("text-sm font-bold", !isDesktopSidebarExpanded && "md:hidden")}>Dark Mode</span>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full p-3 text-white/50 hover:bg-brand-red/10 hover:text-brand-red rounded-xl transition-all group"
                    >
                        <LogOut className={cn("w-5 h-5", isDesktopSidebarExpanded ? "mr-4" : "md:mx-auto mr-4")} />
                        <span className={cn("text-sm font-bold", !isDesktopSidebarExpanded && "md:hidden")}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Header */}
                <header className="bg-white border-b border-slate-100 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between sticky top-0 z-30 shadow-sm md:shadow-none flex-nowrap overflow-hidden">
                    <div className="flex items-center flex-shrink-0">
                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="mr-4 p-2 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden"
                        >
                            <Menu size={24} />
                        </button>

                        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight truncate max-w-[140px] xs:max-w-[200px] md:max-w-none whitespace-nowrap">
                            {location.pathname === '/dashboard' ? 'Overview' : location.pathname.split('/').pop()?.replace('-', ' ')}
                        </h2>
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-6 flex-nowrap flex-shrink-0">
                        <div className="flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-100 hidden md:flex">
                            <button className="p-2 text-slate-500 hover:text-brand-red transition-colors">
                                <Moon size={18} />
                            </button>
                            <div className="w-px h-4 bg-slate-200 mx-2"></div>
                            <button className="flex items-center space-x-2 px-3 py-1.5 bg-white shadow-sm border border-slate-200 rounded-lg text-slate-700 hover:shadow-md transition-shadow">
                                <Bell size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest hidden lg:inline">Notifications</span>
                                <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
                            </button>
                        </div>

                        <div className="flex items-center space-x-3 pl-3 md:pl-6 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-900 leading-none">{user?.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                    {user?.role.replace('_', ' ')}
                                </p>
                            </div>
                            <div className="w-9 h-9 md:w-10 md:h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-xl">
                                <UserCircle size={20} className="md:w-6 md:h-6" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto px-4 md:px-10 py-6 md:py-12 bg-[#fafbfc]">
                    <div className="w-full max-w-full mx-auto space-y-6 md:space-y-10">
                        {location.pathname === '/dashboard' && (
                            <div className="mb-8 md:mb-12">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
                                    Good {getTimeOfDay()}, {user?.name.split(' ')[0]}!
                                </h1>
                                <p className="text-slate-500 font-medium mt-2 text-sm md:text-base">
                                    Track your production, sales, and distribution metrics in real-time.
                                </p>
                            </div>
                        )}
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
