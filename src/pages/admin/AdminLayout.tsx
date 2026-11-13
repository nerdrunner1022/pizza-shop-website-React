import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  BarChart3, 
  Flame,
  LogOut, 
  ArrowUpRight, 
  Bell, 
  UtensilsCrossed,
  Boxes,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import pizzaLogo from '../../assets/SVGs/pizza-svgrepo-com.svg';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logoutAdmin, adminUser, orders } = useStore();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  // Route protection
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const incomingCount = orders.filter((o) => o.status === 'Incoming').length;

  const sidebarLinks = [
    {
      label: 'Sales & Analytics',
      path: '/admin',
      icon: BarChart3,
      badge: null,
    },
    {
      label: 'Live Order Stream',
      path: '/admin/orders',
      icon: Flame,
      badge: incomingCount > 0 ? `${incomingCount} New` : null,
      badgeColor: 'bg-[#C85A32] text-white',
    },
    {
      label: 'Menu & Content CMS',
      path: '/admin/menu',
      icon: UtensilsCrossed,
      badge: null,
    },
    {
      label: 'Pantry & Inventory',
      path: '/admin/inventory',
      icon: Boxes,
      badge: null,
    },
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FBF9F5] flex flex-col md:flex-row font-sans">
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0D0D0D] border-b border-white/10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C85A32] to-[#8B261E] flex items-center justify-center text-white shadow-md">
            <img src={pizzaLogo} alt="" className="w-6 h-6 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base font-bold text-[#FBF9F5] leading-tight">
              Antonio’s Corner
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#D9A35F] font-mono">
              Kitchen Brigade
            </span>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-label={mobileNavOpen ? 'Close admin navigation' : 'Open admin navigation'}
          aria-expanded={mobileNavOpen}
          className="p-2 rounded-full text-[#FBF9F5] hover:bg-white/10"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`${mobileNavOpen ? 'flex' : 'hidden'} md:flex w-full md:w-64 lg:w-72 bg-[#0D0D0D] border-r border-white/10 flex-col justify-between shrink-0`}>
        {/* Top Header */}
        <div className="p-6 space-y-8">
          <div className="hidden md:flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C85A32] to-[#8B261E] flex items-center justify-center text-white shadow-md">
                <img src={pizzaLogo} alt="" className="w-6 h-6 object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base font-bold text-[#FBF9F5] leading-tight">
                  Antonio’s Corner
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#D9A35F] font-mono">
                  Kitchen Brigade
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#A39E93] px-3 font-semibold">
              Management Modules
            </span>
            {sidebarLinks.map((item) => {
              const isActive =
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#C85A32]/20 border border-[#C85A32]/50 text-[#FBF9F5] shadow-[0_0_15px_rgba(200,90,50,0.15)] font-semibold'
                      : 'text-[#A39E93] hover:text-[#FBF9F5] hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#D9A35F]' : 'text-[#A39E93]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info & Exit */}
        <div className="p-6 border-t border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={adminUser?.avatarUrl}
              alt="Chef Antonio"
              className="w-10 h-10 rounded-full object-cover border border-[#D9A35F]/40"
            />
            <div className="overflow-hidden">
              <h5 className="text-xs font-semibold text-[#FBF9F5] truncate">
                {adminUser?.name || 'Antonio De Luca'}
              </h5>
              <p className="text-[10px] text-[#A39E93] truncate">
                {adminUser?.role || 'Head Pizzaiolo'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
            <Link
              to="/"
              className="text-[#A39E93] hover:text-[#FBF9F5] flex items-center gap-1 transition-colors text-[11px]"
            >
              <span>Public Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-[#A39E93] hover:text-[#C85A32] flex items-center gap-1 transition-colors text-[11px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-10 py-3 sm:py-4 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline text-xs text-[#A39E93]">Client Terminal:</span>
            <span className="text-xs font-mono text-[#D9A35F] bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
              <span className="sm:hidden">Station #1</span>
              <span className="hidden sm:inline">Station #1 (Hearth Counter)</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/orders"
              className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#A39E93] hover:text-[#FBF9F5] transition-colors"
              title="Live Orders"
            >
              <Bell className="w-4 h-4" />
              {incomingCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C85A32]" />
              )}
            </Link>

            <span className="text-xs font-mono text-[#A39E93]">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </header>

        {/* Dynamic Nested View */}
        <div className="p-6 sm:p-10 max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
