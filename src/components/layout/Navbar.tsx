import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Lock, Menu as MenuIcon, X, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { hearthAudio } from '../../utils/hearthAudio';
import pizzaLogo from '../../assets/SVGs/pizza-svgrepo-com.svg';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { cart, toggleCart, isAuthenticated } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleHearthAudio = () => {
    const active = hearthAudio.toggle();
    setIsAudioPlaying(active);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Location & Hours', path: '/location' },
    { label: 'Order Online', path: '/order' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2.5 sm:px-8 lg:px-12 py-2 sm:py-3 transition-all duration-300">
      <nav
        className={`w-full flex items-center justify-between px-2.5 min-[380px]:px-3.5 sm:px-8 lg:px-10 py-2 sm:py-3 rounded-full transition-all duration-300 border ${
          isScrolled
            ? 'bg-[#121212]/90 backdrop-blur-xl border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)]'
            : 'bg-[#121212]/60 backdrop-blur-md border-white/5 shadow-lg'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#C85A32] to-[#8B261E] flex items-center justify-center text-white shadow-[0_0_15px_rgba(200,90,50,0.4)] group-hover:scale-105 transition-transform duration-300">
            <img src={pizzaLogo} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-[13px] min-[380px]:text-sm sm:text-lg lg:text-xl font-bold tracking-tight text-[#FBF9F5] group-hover:text-[#D9A35F] transition-colors whitespace-nowrap">
              Antonio’s Corner
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-[#A39E93] font-sans -mt-0.5 sm:-mt-1 font-light">
              Pizzeria Napoletana
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-xs uppercase tracking-[0.16em] font-medium transition-colors duration-200 py-1 ${
                  isActive
                    ? 'text-[#D9A35F]'
                    : 'text-[#FBF9F5]/75 hover:text-[#FBF9F5]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C85A32] rounded-full shadow-[0_0_8px_#C85A32]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions: Hearth Sound, Cart & Staff Login */}
        <div className="flex items-center gap-1.5 min-[380px]:gap-2.5 sm:gap-3">
          {/* Ambient Wood-Oven Sound Toggle */}
          <button
            onClick={toggleHearthAudio}
            title={isAudioPlaying ? 'Mute Hearth Ambience' : 'Play Hearth Ambience'}
            className={`p-1.5 min-[380px]:p-2 rounded-full border transition-all duration-200 flex items-center justify-center ${
              isAudioPlaying
                ? 'bg-[#C85A32]/25 border-[#C85A32] text-[#D9A35F] shadow-[0_0_12px_rgba(200,90,50,0.5)]'
                : 'bg-white/5 border-white/10 text-[#A39E93] hover:text-[#FBF9F5] hover:bg-white/10'
            }`}
            aria-label="Toggle Hearth Sound"
          >
            {isAudioPlaying ? (
              <Volume2 className="w-4 h-4 text-[#D9A35F] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 px-2.5 min-[380px]:px-3.5 py-1.5 rounded-full bg-[#1A1A1A] hover:bg-[#222222] border border-white/10 hover:border-[#D9A35F]/40 text-[#FBF9F5] transition-all duration-200 group"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#D9A35F] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium tracking-wider hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-[10px] font-bold rounded-full bg-[#C85A32] text-white shadow-[0_0_10px_rgba(200,90,50,0.6)]">
                {totalItems}
              </span>
            )}
          </button>

          {/* Discreet Staff Login */}
          <Link
            to={isAuthenticated ? '/admin' : '/admin/login'}
            title={isAuthenticated ? 'Open Admin Console' : 'Staff Portal'}
            className="hidden min-[380px]:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#A39E93] hover:text-[#FBF9F5] bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
          >
            <Lock className="w-3.5 h-3.5 text-[#A39E93] hover:text-[#D9A35F] transition-colors" />
            <span className="hidden lg:inline text-[11px] tracking-wide font-light">
              {isAuthenticated ? 'Admin Dashboard' : 'Staff Login'}
            </span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#FBF9F5] hover:bg-white/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 w-full bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-wider py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#C85A32]/20 text-[#D9A35F] font-semibold'
                      : 'text-[#FBF9F5]/80 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <Link
                to={isAuthenticated ? '/admin' : '/admin/login'}
                className="flex items-center gap-2 text-xs text-[#A39E93] hover:text-[#FBF9F5] py-1 px-3"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isAuthenticated ? 'Admin Dashboard' : 'Staff Access Portal'}</span>
              </Link>
              <button
                onClick={toggleCart}
                className="flex items-center gap-2 text-xs font-medium text-[#D9A35F] py-1 px-3 bg-white/5 rounded-full"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Cart ({totalItems})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
