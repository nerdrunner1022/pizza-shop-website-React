import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Clock, 
  Search, 
  CheckCircle2, 
  Truck, 
  ShoppingBag, 
  User, 
  Phone, 
  MapPin, 
  PlusCircle, 
  ArrowRight, 
  Filter 
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { OrderStatus, Order } from '../../types';

export const AdminOrdersView: React.FC = () => {
  const { orders, updateOrderStatus, createOrder } = useStore();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses: { label: string; value: OrderStatus | 'All'; color: string }[] = [
    { label: 'All Orders', value: 'All', color: 'bg-white/10' },
    { label: '1. Incoming', value: 'Incoming', color: 'bg-[#C85A32]' },
    { label: '2. In the Oven', value: 'In the Oven', color: 'bg-[#D9A35F]' },
    { label: '3. Out for Delivery', value: 'Out for Delivery', color: 'bg-blue-600' },
    { label: '4. Completed', value: 'Completed', color: 'bg-emerald-600' },
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (selectedStatus !== 'All' && order.status !== selectedStatus) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const numMatch = order.orderNumber.toLowerCase().includes(query);
        const nameMatch = order.customerName.toLowerCase().includes(query);
        const itemMatch = order.items.some((i) => i.name.toLowerCase().includes(query));
        if (!numMatch && !nameMatch && !itemMatch) return false;
      }
      return true;
    });
  }, [orders, selectedStatus, searchQuery]);

  // Inject mock order helper for testing/demoing
  const handleSimulateOrder = () => {
    createOrder({
      customerName: 'Silvia Grassi',
      customerEmail: 'silvia.grassi@roma.it',
      customerPhone: '+1 (415) 332-9011',
      deliveryType: 'delivery',
      deliveryAddress: '240 Brannan St, Loft 5',
      notes: 'Extra crispy charred crust on the Diavola please!',
      items: [
        {
          menuItemId: 'pz-03',
          name: 'Diavola del Vesuvio',
          quantity: 1,
          selectedCrustName: 'Neapolitan Wood-Fired',
          selectedAddOnNames: ['Extra Calabrian Hot Honey Drizzle'],
          unitPrice: 25.5,
          totalPrice: 25.5,
        },
        {
          menuItemId: 'ds-02',
          name: 'Cannoli Siciliani Croccanti',
          quantity: 2,
          unitPrice: 9.0,
          totalPrice: 18.0,
        },
      ],
      subtotal: 43.5,
      tax: 3.91,
      deliveryFee: 4.5,
      tip: 8.0,
      total: 59.91,
      paymentMethod: 'Credit Card (Mock)',
    });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Incoming':
        return 'bg-[#C85A32]/20 border-[#C85A32] text-[#FBF9F5]';
      case 'In the Oven':
        return 'bg-[#D9A35F]/20 border-[#D9A35F] text-[#D9A35F]';
      case 'Out for Delivery':
        return 'bg-blue-500/20 border-blue-500 text-blue-300';
      case 'Completed':
        return 'bg-emerald-500/20 border-emerald-500 text-emerald-300';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#D9A35F] font-semibold">
            Live Kitchen Operations
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F5]">
            Order Stream & Hearth Queue
          </h1>
        </div>

        <button
          onClick={handleSimulateOrder}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#D9A35F] text-white text-xs uppercase tracking-wider font-semibold shadow-lg hover:opacity-95 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Simulate Incoming Order</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#121212] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {statuses.map((s) => {
            const isSelected = selectedStatus === s.value;
            const count =
              s.value === 'All'
                ? orders.length
                : orders.filter((o) => o.status === s.value).length;

            return (
              <button
                key={s.value}
                onClick={() => setSelectedStatus(s.value)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#C85A32] text-white font-semibold shadow-md'
                    : 'bg-white/5 text-[#A39E93] hover:text-[#FBF9F5]'
                }`}
              >
                <span>{s.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/40 text-white">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#A39E93] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order # or customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
          />
        </div>
      </div>

      {/* Orders Grid / Queue Cards */}
      {filteredOrders.length === 0 ? (
        <div className="py-20 text-center space-y-3 bg-[#121212] rounded-3xl border border-white/10">
          <Clock className="w-8 h-8 text-[#A39E93] mx-auto opacity-50" />
          <h3 className="font-serif text-lg text-[#FBF9F5]">No Orders in This Station</h3>
          <p className="text-xs text-[#A39E93]">
            Currently no orders match the selected queue filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-5 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl"
            >
              {/* Card Header */}
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-base font-bold text-[#D9A35F] block">
                      {order.orderNumber}
                    </span>
                    <span className="text-[10px] text-[#A39E93] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-[#C85A32]" />
                      <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-[#FBF9F5]">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#D9A35F]" />
                      <span>{order.customerName}</span>
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#A39E93]">
                      {order.deliveryType}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A39E93] flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#A39E93]" />
                    <span>{order.customerPhone}</span>
                  </div>
                  {order.deliveryAddress && (
                    <div className="text-[11px] text-[#A39E93] flex items-start gap-1.5 pt-0.5">
                      <MapPin className="w-3 h-3 text-[#C85A32] shrink-0 mt-0.5" />
                      <span className="truncate">{order.deliveryAddress}</span>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <div className="space-y-2 pt-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block">
                    Dispatched Items:
                  </span>
                  <div className="space-y-1.5 text-xs">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-start py-1 border-b border-white/5"
                      >
                        <div>
                          <span className="font-semibold text-[#FBF9F5]">
                            {item.quantity}x {item.name}
                          </span>
                          {item.selectedCrustName && (
                            <span className="block text-[10px] text-[#D9A35F]">
                              Crust: {item.selectedCrustName}
                            </span>
                          )}
                          {item.selectedAddOnNames && item.selectedAddOnNames.length > 0 && (
                            <span className="block text-[9px] text-[#A39E93]">
                              +{item.selectedAddOnNames.join(', ')}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[#A39E93]">
                          ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kitchen Special Notes */}
                {order.notes && (
                  <div className="p-2.5 rounded-xl bg-[#C85A32]/10 border border-[#C85A32]/30 text-[11px] text-[#EFE9DC] italic">
                    <strong className="text-[#C85A32] not-italic mr-1">Chef Note:</strong>
                    "{order.notes}"
                  </div>
                )}
              </div>

              {/* Card Footer: Financials & Status Transitions */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#A39E93]">{order.paymentMethod}</span>
                  <span className="font-mono text-base font-bold text-[#D9A35F]">
                    ${order.total.toFixed(2)}
                  </span>
                </div>

                {/* State Transition Action Buttons */}
                <div className="flex items-center gap-1.5 pt-1">
                  {order.status === 'Incoming' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'In the Oven')}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#B84E28] hover:opacity-95 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>Send to Oven (900°F)</span>
                    </button>
                  )}

                  {order.status === 'In the Oven' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Out for Delivery')}
                      className="w-full py-2.5 rounded-xl bg-[#D9A35F] hover:bg-[#C48F4E] text-black text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Mark Ready / Out for Delivery</span>
                    </button>
                  )}

                  {order.status === 'Out for Delivery' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Completed')}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Order Completed</span>
                    </button>
                  )}

                  {order.status === 'Completed' && (
                    <div className="w-full py-2 rounded-xl bg-white/5 text-center text-xs text-emerald-400 font-mono flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Fulfilled & Archived</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
