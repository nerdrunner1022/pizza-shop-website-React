import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Car, 
  Train, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Users, 
  Compass 
} from 'lucide-react';

export const LocationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '19:00',
    guests: '2 Guests',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FBF9F5] pt-32 pb-24 px-6 sm:px-12 lg:px-16 xl:px-20 w-full">
      <div className="w-full space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#D9A35F]">
            <Compass className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Storefront & Hospitality</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#FBF9F5]">
            Location & Hours
          </h1>
          <p className="text-xs sm:text-sm text-[#A39E93] font-light leading-relaxed">
            Gather around our volcanic brick oven. We seat both reservations and spontaneous walk-in guests at our open-hearth marble counter.
          </p>
        </div>

        {/* Core Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hours, Address & Logistics */}
          <div className="lg:col-span-7 space-y-6">
            {/* Hours Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                <Clock className="w-5 h-5 text-[#C85A32]" />
                <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">
                  Oven & Service Hours
                </h3>
              </div>

              <div className="space-y-3 text-xs text-[#A39E93]">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#FBF9F5]">Tuesday – Thursday</span>
                  <span className="font-mono text-[#D9A35F]">4:30 PM — 10:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#FBF9F5]">Friday & Saturday</span>
                  <span className="font-mono text-[#D9A35F]">12:00 PM — 11:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-[#FBF9F5]">Sunday Supper</span>
                  <span className="font-mono text-[#D9A35F]">12:00 PM — 9:30 PM</span>
                </div>
                <div className="flex justify-between py-1.5 text-[#A39E93]/60">
                  <span>Monday</span>
                  <span>Rest & 72-Hour Dough Cultivation</span>
                </div>
              </div>

              <p className="text-[11px] text-[#A39E93] italic pt-2">
                *The oven ceases baking 30 minutes prior to closing time to honor our overnight ember cooldown.
              </p>
            </div>

            {/* Address & Contact Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                <MapPin className="w-5 h-5 text-[#C85A32]" />
                <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">
                  Hearth Coordinates & Contact
                </h3>
              </div>

              <div className="space-y-3 text-xs text-[#A39E93]">
                <div>
                  <strong className="text-[#FBF9F5] block mb-0.5">Physical Address</strong>
                  <p>428 Via dell’Arte (Corner of 4th Street & Elm Avenue)<br />Historic Arts District, San Francisco, CA 94107</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#D9A35F] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#A39E93] block">Phone</span>
                      <span className="text-[#FBF9F5]">(415) 890-4820</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#D9A35F] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#A39E93] block">Inquiries</span>
                      <span className="text-[#FBF9F5]">ciao@antonioscorner.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transit & Parking Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D9A35F]">
                  <Car className="w-4 h-4 text-[#C85A32]" />
                  <span>Parking & Valet</span>
                </div>
                <p className="text-[11px] text-[#A39E93] leading-relaxed font-light">
                  Complimentary 90-minute validation at the Elm Street Garage (450 Elm St). Street metered parking becomes free after 6:00 PM.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D9A35F]">
                  <Train className="w-4 h-4 text-[#C85A32]" />
                  <span>Public Transit</span>
                </div>
                <p className="text-[11px] text-[#A39E93] leading-relaxed font-light">
                  2 blocks from 4th & King Station (Caltrain & Central Subway T-Line). Muni bus lines 30, 45, and 83 stop at 4th & Elm.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Table Reservation Inquiry Form */}
          <div className="lg:col-span-5">
            <div className="glass-panel-warm p-6 sm:p-8 rounded-3xl border border-[#C85A32]/30 shadow-2xl relative">
              <div className="space-y-2 mb-6">
                <span className="text-[10px] uppercase tracking-widest text-[#D9A35F] font-semibold">
                  Reserve a Table
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FBF9F5]">
                  Gather at the Hearth
                </h3>
                <p className="text-xs text-[#A39E93] font-light">
                  Reserve a table or wood-fired counter seat. For parties larger than 8, please phone us directly.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-3 bg-black/40 rounded-2xl border border-white/10 p-6 animate-in zoom-in-95">
                  <CheckCircle2 className="w-12 h-12 text-[#D9A35F] mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#FBF9F5]">
                    Reservation Requested
                  </h4>
                  <p className="text-xs text-[#A39E93] leading-relaxed">
                    Grazie, {formData.name}! We have held your request for {formData.guests} on {formData.date || 'your selected date'}. A confirmation dispatch has been sent to your email.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-[#FBF9F5]"
                  >
                    Make Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                      Guest Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Leonardo Moretti"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="leonardo@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="(415) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                        Date
                      </label>
                      <input
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                        Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                      >
                        <option value="17:00">5:00 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="21:00">9:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                        Party Size
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                      >
                        <option value="1 Guest">1 Guest</option>
                        <option value="2 Guests">2 Guests</option>
                        <option value="4 Guests">4 Guests</option>
                        <option value="6 Guests">6 Guests</option>
                        <option value="8 Guests">8 Guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                      Dietary Notes or Seating Preference
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Counter seating to watch pizza stretching, celebrating anniversary..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#D9A35F] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(200,90,50,0.35)] hover:opacity-95 transition-all"
                  >
                    <span>Request Table Booking</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
