import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone, Instagram, ArrowUpRight } from 'lucide-react';
import pizzaLogo from '../../assets/SVGs/pizza-svgrepo-com.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A] text-[#FBF9F5] pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-[#C85A32]/10 blur-[100px] pointer-events-none" />

      <div className="w-full px-6 sm:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C85A32] to-[#8B261E] flex items-center justify-center text-white shadow-[0_0_15px_rgba(200,90,50,0.4)]">
                <img src={pizzaLogo} alt="" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FBF9F5]">
                Antonio’s Corner
              </span>
            </div>
            <p className="text-xs text-[#A39E93] leading-relaxed font-light">
              Artisanal Neapolitan wood-fired pizzeria celebrating 72-hour cold-fermented dough, volcanic Vesuvian stone, and hand-selected Italian D.O.P. ingredients.
            </p>
            <div className="pt-2 text-[11px] tracking-widest uppercase text-[#D9A35F] font-medium flex items-center gap-1.5">
              <span>Fatta con Amore e Fuoco</span>
              <span className="text-[#C85A32]">🔥</span>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A35F]">
              The Pizzeria
            </h4>
            <div className="space-y-2 text-xs text-[#A39E93] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                <span>428 Via dell’Arte (Corner of 4th & Elm)<br />Historic District, CA 94107</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>(415) 890-4820</span>
              </div>
              <div className="pt-2">
                <Link
                  to="/location"
                  className="inline-flex items-center gap-1 text-[11px] text-[#FBF9F5] hover:text-[#D9A35F] transition-colors"
                >
                  <span>Directions & Parking</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A35F]">
              Wood-Fired Hours
            </h4>
            <div className="space-y-1.5 text-xs text-[#A39E93] font-light">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Tuesday – Thursday</span>
                <span className="text-[#FBF9F5]">4:30 PM – 10:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Friday – Saturday</span>
                <span className="text-[#FBF9F5]">12:00 PM – 11:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span>Sunday</span>
                <span className="text-[#FBF9F5]">12:00 PM – 9:30 PM</span>
              </div>
              <div className="flex justify-between py-1 text-[#A39E93]/60">
                <span>Monday</span>
                <span>Rest & Dough Prep</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A35F]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#A39E93] font-light">
              <li>
                <Link to="/menu" className="hover:text-[#FBF9F5] transition-colors">
                  Seasonal Artisanal Menu
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="hover:text-[#FBF9F5] transition-colors">
                  Our Heritage & Dough Science
                </Link>
              </li>
              <li>
                <Link to="/location" className="hover:text-[#FBF9F5] transition-colors">
                  Storefront & Dine-in Reservation
                </Link>
              </li>
              <li>
                <Link to="/order" className="hover:text-[#FBF9F5] transition-colors">
                  Online Takeaway & Delivery
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-[#D9A35F] text-[#A39E93]/80 transition-colors">
                  Staff Administrative Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A35F] mb-4">
            3D Model Credits
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-[#A39E93] font-light leading-relaxed">
            <li>
              <a href="https://skfb.ly/o7YYy" target="_blank" rel="noreferrer" className="text-[#FBF9F5] hover:text-[#D9A35F] underline underline-offset-2">
                &quot;Pizza &quot;BigBoss&quot; Pancho&quot;
              </a>{' '}
              by ponomarovmax is licensed under{' '}
              <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" className="hover:text-[#D9A35F] underline underline-offset-2">
                Creative Commons Attribution
              </a>.
            </li>
            <li>
              <a href="https://skfb.ly/oMOyp" target="_blank" rel="noreferrer" className="text-[#FBF9F5] hover:text-[#D9A35F] underline underline-offset-2">
                “Pizza”
              </a>{' '}
              by darklord3d is licensed under{' '}
              <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" className="hover:text-[#D9A35F] underline underline-offset-2">
                Creative Commons Attribution
              </a>.
            </li>
            <li>
              <a href="https://skfb.ly/oITIC" target="_blank" rel="noreferrer" className="text-[#FBF9F5] hover:text-[#D9A35F] underline underline-offset-2">
                “Pizza Realistic”
              </a>{' '}
              by neshallads is licensed under{' '}
              <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" className="hover:text-[#D9A35F] underline underline-offset-2">
                Creative Commons Attribution
              </a>.
            </li>
            <li>
              <a href="https://skfb.ly/oqzZn" target="_blank" rel="noreferrer" className="text-[#FBF9F5] hover:text-[#D9A35F] underline underline-offset-2">
                “Pizza Napoletana”
              </a>{' '}
              by Ronen is licensed under{' '}
              <a href="http://creativecommons.org/licenses/by-nd/4.0/" target="_blank" rel="noreferrer" className="hover:text-[#D9A35F] underline underline-offset-2">
                Creative Commons Attribution-NoDerivs
              </a>.
            </li>
          </ul>
        </div>

        <div className="border-t border-white/10 py-5 flex flex-col gap-2 text-[11px] text-[#A39E93] font-light sm:flex-row sm:items-center sm:justify-between">
          <p>
            Designed &amp; Developed by <span className="text-[#FBF9F5]">Neirah Tech</span>
          </p>
          <p>
            Contact:{' '}
            <a
              href="tel:+94760041594"
              className="text-[#FBF9F5] hover:text-[#D9A35F] transition-colors"
            >
              +94 760041594
            </a>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A39E93] font-light gap-4">
          <p>© {new Date().getFullYear()} Antonio’s Corner Pizzeria. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>D.O.P. Certified Ingredients</span>
            <span>•</span>
            <span>900°F Acunto Wood Oven</span>
            <span>•</span>
            <span>72h Cold Fermentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
