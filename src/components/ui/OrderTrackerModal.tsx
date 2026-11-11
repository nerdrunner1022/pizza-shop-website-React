import React, { useState } from 'react';
import { X, Search, Flame, CheckCircle2, Truck, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Order } from '../../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultOrderId?: string;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  defaultOrderId,
}) => {
  const { orders } = useStore();
  const [searchTerm, setSearchTerm] = useState(defaultOrderId || '');

  if (!isOpen) return null;

  const matchedOrder = orders.find(
    (o) =>
      o.orderNumber.toLowerCase() === searchTerm.trim().toLowerCase() ||
      o.id === searchTerm.trim() ||
      (searchTerm.trim() !== '' && o.customerName.toLowerCase().includes(searchTerm.trim().toLowerCase()))
  ) || orders[0];

  const getStepActiveIndex = (status: Order['status']) => {
    switch (status) {
      case 'Incoming':
        return 0;
      case 'In the Oven':
        return 1;
      case 'Out for Delivery':
        return 2;
      case 'Completed':
        return 3;
    }
  };

  const currentStep = matchedOrder ? getStepActiveIndex(matchedOrder.status) : 0;

  const steps = [
    { title: 'Dough Stretched', desc: 'Mother starter shaped & topped' },
    { title: 'In the Oven (900°F)', desc: 'Blistering over oak embers' },
    { title: 'Boxed & En Route', desc: 'Hot in ventilated carrier' },
    { title: 'Delivered / Ready', desc: 'Buon Appetito!' },
  ];

  return (
    <div className="fixed inset-0 z-[150] overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md animate-in fade-in" />

      <div className="relative w-full max-w-xl bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 z-10 shadow-2xl animate-in zoom-in-95">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#C85A32]/20 text-[#D9A35F] flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#C85A32]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">
                Hearth Dispatch Tracker
              </h3>
              <p className="text-[11px] text-[#A39E93]">
                Live 4-stage kitchen order tracking
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 text-[#A39E93] hover:text-[#FBF9F5]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by order number (e.g. #AC-8492) or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
          />
        </div>

        {matchedOrder ? (
          <div className="space-y-6">
            {/* Header info card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A39E93] block">
                  Active Dispatch
                </span>
                <span className="font-mono text-base font-bold text-[#D9A35F]">
                  {matchedOrder.orderNumber}
                </span>
                <span className="text-xs text-[#FBF9F5] block mt-0.5">
                  Guest: {matchedOrder.customerName}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#A39E93] block">
                  Estimated Ready
                </span>
                <span className="font-mono text-sm font-bold text-[#C85A32]">
                  {matchedOrder.status === 'Completed' ? 'Completed ✓' : `~${matchedOrder.estimatedMinutesRemaining} mins`}
                </span>
              </div>
            </div>

            {/* Stepper progress */}
            <div className="space-y-4">
              {steps.map((st, idx) => {
                const isPassed = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={idx} className="flex items-start gap-3.5 relative">
                    {idx < steps.length - 1 && (
                      <div
                        className={`absolute top-6 left-3 w-[1.5px] h-8 ${
                          isPassed ? 'bg-[#C85A32]' : 'bg-white/10'
                        }`}
                      />
                    )}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0 z-10 transition-colors ${
                        isPassed
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-[#C85A32] text-white shadow-[0_0_12px_rgba(200,90,50,0.8)] animate-pulse'
                          : 'bg-[#1F1F1F] text-[#A39E93] border border-white/10'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>

                    <div className="space-y-0.5">
                      <h4
                        className={`text-xs font-semibold ${
                          isCurrent ? 'text-[#D9A35F]' : isPassed ? 'text-[#FBF9F5]' : 'text-[#A39E93]'
                        }`}
                      >
                        {st.title}
                      </h4>
                      <p className="text-[11px] text-[#A39E93] font-light">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Items in this order */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block">
                Pies in this Bake ({matchedOrder.items.length}):
              </span>
              <div className="space-y-1">
                {matchedOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-[#A39E93]">
                    <span>{it.quantity}x {it.name}</span>
                    <span className="font-mono text-[#FBF9F5]">${it.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-[#A39E93]">
            No matching order found. Please check your reference code.
          </div>
        )}
      </div>
    </div>
  );
};
