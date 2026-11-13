import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { CustomCursor } from './components/ui/CustomCursor';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { ItemCustomizeModal } from './components/ui/ItemCustomizeModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { LocationPage } from './pages/LocationPage';
import { OrderPage } from './pages/OrderPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminAnalyticsView } from './pages/admin/AdminAnalyticsView';
import { AdminOrdersView } from './pages/admin/AdminOrdersView';
import { AdminMenuView } from './pages/admin/AdminMenuView';
import { AdminInventoryView } from './pages/admin/AdminInventoryView';

export const App: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <SmoothScroll>
      <CustomCursor />
      
      {/* Public layout elements only appear on non-admin routes */}
      {!isAdminRoute && <Navbar />}
      <CartDrawer />
      <ItemCustomizeModal />

      <main className={!isAdminRoute ? 'w-full' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/order" element={<OrderPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminAnalyticsView />} />
            <Route path="orders" element={<AdminOrdersView />} />
            <Route path="menu" element={<AdminMenuView />} />
            <Route path="inventory" element={<AdminInventoryView />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </SmoothScroll>
  );
};
