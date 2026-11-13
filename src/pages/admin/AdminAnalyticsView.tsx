import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Flame, 
  ArrowUpRight, 
  Calendar, 
  Download, 
  Users, 
  Sparkles 
} from 'lucide-react';
import { RECENT_DAILY_METRICS } from '../../data/mockData';
import { useStore } from '../../store/useStore';

export const AdminAnalyticsView: React.FC = () => {
  const { orders } = useStore();
  const [selectedRange, setSelectedRange] = useState<'7d' | '30d'>('7d');

  // Compute live additions to metrics from placed orders
  const additionalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalWeeklyRevenue = 31420 + Math.round(additionalRevenue);
  const totalOrderCount = 707 + orders.length;
  const avgTicket = (totalWeeklyRevenue / totalOrderCount).toFixed(2);
  const maxDailyRevenue = Math.max(...RECENT_DAILY_METRICS.map((day) => day.revenue));

  const topPies = [
    { name: 'Margherita Verace D.O.P.', sold: 284, revenue: 5538, share: '32%' },
    { name: 'Tartufata & Funghi di Bosco', sold: 198, revenue: 5148, share: '24%' },
    { name: 'Diavola del Vesuvio', sold: 182, revenue: 4277, share: '21%' },
    { name: 'Burrata Campana & Prosciutto', sold: 145, revenue: 3625, share: '15%' },
    { name: 'Quattro Formaggi con Miele', sold: 98, revenue: 2156, share: '8%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#D9A35F] font-semibold">
            Executive Summary
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F5]">
            Sales & Hearth Analytics
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#141414] p-1 rounded-xl border border-white/10 flex items-center text-xs">
            <button
              onClick={() => setSelectedRange('7d')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedRange === '7d'
                  ? 'bg-[#C85A32] text-white font-semibold'
                  : 'text-[#A39E93] hover:text-[#FBF9F5]'
              }`}
            >
              Past 7 Days
            </button>
            <button
              onClick={() => setSelectedRange('30d')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedRange === '30d'
                  ? 'bg-[#C85A32] text-white font-semibold'
                  : 'text-[#A39E93] hover:text-[#FBF9F5]'
              }`}
            >
              Past 30 Days
            </button>
          </div>

          <button
            onClick={() => alert('Dispatched PDF report to kitchen administrator email.')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#FBF9F5] transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#D9A35F]" />
            <span>Export Dispatches</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider text-[#A39E93]">
              Gross Wood-Fired Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#C85A32]/20 text-[#D9A35F] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-3xl font-bold text-[#FBF9F5]">
              ${totalWeeklyRevenue.toLocaleString()}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14.2% vs previous cycle</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider text-[#A39E93]">
              Pies & Items Baked
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#D9A35F]/20 text-[#D9A35F] flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#C85A32]" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-3xl font-bold text-[#FBF9F5]">
              {totalOrderCount}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+8.6% throughput</span>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider text-[#A39E93]">
              Average Ticket Size
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/5 text-[#D9A35F] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-3xl font-bold text-[#FBF9F5]">
              ${avgTicket}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+5.1% basket upgrade</span>
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 space-y-3 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-[11px] uppercase tracking-wider text-[#A39E93]">
              Fermentation Capacity
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-mono text-3xl font-bold text-[#FBF9F5]">
              94.8%
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#A39E93]">
              <span>320 / 340 dough balls proofing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Bar Chart Section: Revenue by Day */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#121212] border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">
                Weekly Revenue Trajectory
              </h3>
              <p className="text-xs text-[#A39E93]">
                Daily gross sales with weekend peak wood-fired volume.
              </p>
            </div>
            <span className="font-mono text-xs text-[#D9A35F] bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
              Peak: Saturday ($6,740)
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-4 pb-2">
            <div className="h-64 flex items-stretch justify-between gap-3 sm:gap-6 pt-8">
              {RECENT_DAILY_METRICS.map((day) => {
                const heightPct = Math.max(8, Math.round((day.revenue / maxDailyRevenue) * 100));
                return (
                  <div key={day.date} className="group min-w-0 flex-1 grid grid-rows-[1fr_auto] gap-2">
                    <div className="relative flex min-h-0 items-end rounded-t-xl bg-white/5">
                      <div
                        role="img"
                        aria-label={`${day.date}: $${day.revenue.toLocaleString()}, ${day.orderCount} orders`}
                        title={`${day.date}: $${day.revenue.toLocaleString()} (${day.orderCount} orders)`}
                        style={{ height: `${heightPct}%` }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-[#C85A32] to-[#D9A35F] shadow-[0_0_15px_rgba(200,90,50,0.3)] transition-[filter,height] group-hover:brightness-110"
                      />
                      <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-black/90 px-2 py-1 text-center text-[10px] font-mono text-[#D9A35F] opacity-0 transition-opacity group-hover:opacity-100">
                        ${day.revenue.toLocaleString()} ({day.orderCount} orders)
                      </span>
                    </div>
                    <span className="text-center text-[10px] font-mono text-[#A39E93] group-hover:text-[#FBF9F5]">
                      {day.date.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Breakdown (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#121212] border border-white/10 space-y-6">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">
              Product Mix Breakdown
            </h3>
            <p className="text-xs text-[#A39E93]">
              Share of orders across hearth departments.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#FBF9F5]">Wood-Fired Neapolitan Pies</span>
                <span className="font-mono text-[#D9A35F]">74%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="bg-[#C85A32] h-full w-[74%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#FBF9F5]">Antipasti & Garlic Focaccia</span>
                <span className="font-mono text-[#D9A35F]">14%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="bg-[#D9A35F] h-full w-[14%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#FBF9F5]">Dolci & Sicilian Cannoli</span>
                <span className="font-mono text-[#D9A35F]">8%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="bg-[#5B7052] h-full w-[8%]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#FBF9F5]">Italian Wines & Sodas</span>
                <span className="font-mono text-[#D9A35F]">4%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="bg-white/40 h-full w-[4%]" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-[#A39E93] space-y-1">
            <strong className="text-[#FBF9F5] block font-serif">Pizzaiolo Insight:</strong>
            <p className="text-[11px] leading-relaxed font-light">
              Tartufata & Funghi showed a 28% demand spike this week due to the active Autumn drop promotional banner.
            </p>
          </div>
        </div>
      </div>

      {/* Top Performing Pies Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121212] border border-white/10 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-white/10">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">
              Top Ranked Pizzas This Week
            </h3>
            <p className="text-xs text-[#A39E93]">
              Based on total ovens baked and customer order frequency.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-[#A39E93] uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Pie Name</th>
                <th className="py-3 px-4">Pies Baked</th>
                <th className="py-3 px-4">Gross Revenue</th>
                <th className="py-3 px-4">Volume Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {topPies.map((pie, i) => (
                <tr key={pie.name} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-[#FBF9F5] flex items-center gap-2">
                    <span className="font-mono text-[#A39E93] w-4">{i + 1}.</span>
                    <span>{pie.name}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#FBF9F5]">{pie.sold}</td>
                  <td className="py-3.5 px-4 font-mono text-[#D9A35F]">
                    ${pie.revenue.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#A39E93]">{pie.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
