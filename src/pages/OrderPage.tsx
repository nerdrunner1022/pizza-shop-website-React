import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  Clock, 
  Plus, 
  Minus, 
  Trash2, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { DeliveryType, Order } from '../types';

export const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, clearCart, createOrder } = useStore();

  const [checkoutStep, setCheckoutStep] = useState<'review' | 'details' | 'payment' | 'confirmed'>('review');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery');

  // Customer form inputs
  const [customerName, setCustomerName] = useState('Elena Rossi');
  const [customerEmail, setCustomerEmail] = useState('elena.rossi@artisan.io');
  const [customerPhone, setCustomerPhone] = useState('(415) 672-8819');
  const [deliveryAddress, setDeliveryAddress] = useState('550 Elm Street, Apt 4A');
  const [notes, setNotes] = useState('Please ring doorbell twice. Leave on front porch.');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card (Mock)' | 'Apple Pay (Mock)' | 'Cash on Pickup'>('Credit Card (Mock)');

  // Mock Card Inputs
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('884');

  // Completed order snapshot
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = subtotal * 0.09;
  const deliveryFee = deliveryType === 'delivery' ? 4.5 : 0;
  const tip = (subtotal * tipPercentage) / 100;
  const total = subtotal + tax + deliveryFee + tip;

  const handlePlaceOrder = () => {
    // Generate order item summaries
    const itemsSummary = cart.map((c) => ({
      menuItemId: c.menuItem.id,
      name: c.menuItem.name,
      quantity: c.quantity,
      selectedCrustName: c.selectedCrust?.name,
      selectedAddOnNames: c.selectedAddOns.map((a) => a.name),
      unitPrice: c.unitPrice,
      totalPrice: c.totalPrice,
    }));

    const newOrder = createOrder({
      customerName,
      customerEmail,
      customerPhone,
      deliveryType,
      deliveryAddress: deliveryType === 'delivery' ? deliveryAddress : undefined,
      notes,
      items: itemsSummary,
      subtotal,
      tax,
      deliveryFee,
      tip,
      total,
      paymentMethod,
    });

    setPlacedOrder(newOrder);
    clearCart();
    setCheckoutStep('confirmed');

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C85A32', '#D9A35F', '#5B7052', '#FBF9F5'],
      });
    } catch (e) {
      // safe fallback
    }
  };

  // If confirmed step
  if (checkoutStep === 'confirmed' && placedOrder) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-[#FBF9F5] pt-32 pb-24 px-4 sm:px-8">
        <div className="max-w-[720px] mx-auto space-y-8">
          <div className="glass-panel-warm p-8 sm:p-12 rounded-3xl border border-[#C85A32]/40 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#D9A35F]/20 border border-[#D9A35F]/60 flex items-center justify-center text-[#D9A35F] mx-auto shadow-[0_0_30px_rgba(217,163,95,0.4)]">
              <Flame className="w-8 h-8 text-[#C85A32]" />
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#D9A35F]">
                Order Confirmed & Sent to Hearth
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FBF9F5] mt-1">
                The Oven is Blazing
              </h1>
              <p className="text-xs sm:text-sm text-[#A39E93] mt-2 font-light max-w-md mx-auto">
                Grazie, {placedOrder.customerName}! Your order has entered Antonio’s live kitchen queue. 72-hour sourdough is being stretched for the flame.
              </p>
            </div>

            {/* Order Badge Card */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-left space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A39E93] block">
                    Order Reference
                  </span>
                  <span className="font-mono text-base font-bold text-[#D9A35F]">
                    {placedOrder.orderNumber}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-[#A39E93] block">
                    Estimated Ready In
                  </span>
                  <span className="font-mono text-base font-bold text-[#C85A32]">
                    ~{placedOrder.estimatedMinutesRemaining} minutes
                  </span>
                </div>
              </div>

              {/* Status Tracker */}
              <div className="pt-2 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold">
                  Live Kitchen Workflow:
                </span>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="p-2 rounded-lg bg-[#C85A32]/20 border border-[#C85A32] text-[#FBF9F5] font-semibold">
                    1. Incoming ✓
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 text-[#A39E93]">
                    2. In Oven
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 text-[#A39E93]">
                    3. Out/Boxed
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 text-[#A39E93]">
                    4. Enjoy
                  </div>
                </div>
              </div>

              {/* Items summary */}
              <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs">
                {placedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[#A39E93]">
                    <span>
                      {it.quantity}x {it.name}
                      {it.selectedCrustName && ` (${it.selectedCrustName})`}
                    </span>
                    <span className="font-mono text-[#FBF9F5]">${it.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold text-[#FBF9F5] pt-2 border-t border-white/5">
                  <span>Grand Total (Paid)</span>
                  <span className="font-mono text-[#D9A35F] text-sm">
                    ${placedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link
                to="/admin"
                className="flex-1 py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 text-[#D9A35F]"
              >
                <span>View in Admin Live Stream</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/menu"
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#C85A32] hover:bg-[#B84E28] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 text-white"
              >
                <span>Return to Menu</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If empty cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-[#FBF9F5] pt-36 pb-24 px-4 sm:px-8">
        <div className="max-w-md mx-auto text-center space-y-6 glass-panel p-10 rounded-3xl border border-white/10">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D9A35F] mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#FBF9F5]">Your Bag is Empty</h2>
          <p className="text-xs text-[#A39E93] font-light leading-relaxed">
            You don't have any pizzas or appetizers in your order yet. Explore our handcrafted wood-fired menu.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C85A32] to-[#D9A35F] text-white text-xs uppercase tracking-widest font-semibold"
          >
            <span>Browse Artisanal Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FBF9F5] pt-32 pb-24 px-6 sm:px-12 lg:px-16 xl:px-20 w-full">
      <div className="w-full space-y-10">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#D9A35F] font-semibold">
              Wood-Fired Checkout
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#FBF9F5]">
              Confirm Your Feast
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setCheckoutStep('review')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                checkoutStep === 'review'
                  ? 'bg-[#C85A32] text-white font-semibold'
                  : 'bg-white/5 text-[#A39E93]'
              }`}
            >
              1. Review Bag
            </button>
            <span className="text-[#A39E93]">•</span>
            <button
              onClick={() => setCheckoutStep('details')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                checkoutStep === 'details'
                  ? 'bg-[#C85A32] text-white font-semibold'
                  : 'bg-white/5 text-[#A39E93]'
              }`}
            >
              2. Delivery Logistics
            </button>
            <span className="text-[#A39E93]">•</span>
            <button
              onClick={() => setCheckoutStep('payment')}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                checkoutStep === 'payment'
                  ? 'bg-[#C85A32] text-white font-semibold'
                  : 'bg-white/5 text-[#A39E93]'
              }`}
            >
              3. Payment & Submit
            </button>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Workflow Form Area (8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* STEP 1: REVIEW BAG */}
            {checkoutStep === 'review' && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <h3 className="font-serif text-xl font-bold text-[#FBF9F5]">
                    Selected Items ({cart.length})
                  </h3>
                  <Link
                    to="/menu"
                    className="text-xs uppercase tracking-wider text-[#D9A35F] hover:underline"
                  >
                    + Add More Items
                  </Link>
                </div>

                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                    >
                      <div className="space-y-1">
                        <h4 className="font-serif text-base font-bold text-[#FBF9F5]">
                          {item.menuItem.name}
                        </h4>
                        {item.selectedCrust && (
                          <p className="text-[11px] text-[#D9A35F]">
                            Crust: {item.selectedCrust.name}
                          </p>
                        )}
                        {item.selectedAddOns.length > 0 && (
                          <p className="text-[10px] text-[#A39E93]">
                            Add-ons: {item.selectedAddOns.map((a) => a.name).join(', ')}
                          </p>
                        )}
                        {item.specialInstructions && (
                          <p className="text-[10px] text-[#A39E93] italic">
                            Note: "{item.specialInstructions}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="flex items-center gap-2 bg-black/40 px-2.5 py-1 rounded-xl border border-white/10">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-1 text-[#A39E93] hover:text-[#FBF9F5]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-1 text-[#A39E93] hover:text-[#FBF9F5]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-sm font-semibold text-[#D9A35F] w-16 text-right">
                          ${item.totalPrice.toFixed(2)}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[#A39E93] hover:text-[#C85A32] p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#D9A35F] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                  >
                    <span>Proceed to Delivery & Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: LOGISTICS & CONTACT */}
            {checkoutStep === 'details' && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-serif text-xl font-bold text-[#FBF9F5]">
                    Pickup or Delivery Details
                  </h3>
                  <button
                    onClick={() => setCheckoutStep('review')}
                    className="text-xs text-[#A39E93] hover:text-[#FBF9F5] flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Review</span>
                  </button>
                </div>

                {/* Delivery Mode Toggle */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      deliveryType === 'delivery'
                        ? 'bg-[#C85A32]/20 border-[#C85A32] shadow-[0_0_20px_rgba(200,90,50,0.2)]'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#FBF9F5] block">
                      Local Courier Delivery ($4.50)
                    </span>
                    <span className="text-[11px] text-[#A39E93]">
                      Insulated thermal pizza tote, ~35 mins
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      deliveryType === 'pickup'
                        ? 'bg-[#C85A32]/20 border-[#C85A32] shadow-[0_0_20px_rgba(200,90,50,0.2)]'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[#FBF9F5] block">
                      Storefront Pickup (Free)
                    </span>
                    <span className="text-[11px] text-[#A39E93]">
                      428 Via dell’Arte counter, ~20 mins
                    </span>
                  </button>
                </div>

                {/* Contact inputs */}
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                      Email for Kitchen Tracker
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                    />
                  </div>

                  {deliveryType === 'delivery' && (
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                        Delivery Street Address & Unit
                      </label>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                      Drop-off or Pickup Notes
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCheckoutStep('review')}
                    className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs uppercase tracking-wider text-[#A39E93]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCheckoutStep('payment')}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#D9A35F] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT & CONFIRMATION */}
            {checkoutStep === 'payment' && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-serif text-xl font-bold text-[#FBF9F5]">
                    Mock Client-Side Payment
                  </h3>
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="text-xs text-[#A39E93] hover:text-[#FBF9F5] flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                </div>

                {/* Method selector */}
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Credit Card (Mock)', 'Apple Pay (Mock)', 'Cash on Pickup'] as const).map(
                    (method) => {
                      const isSelected = paymentMethod === method;
                      return (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-[#D9A35F]/20 border-[#D9A35F] text-[#FBF9F5]'
                              : 'bg-white/5 border-white/10 text-[#A39E93]'
                          }`}
                        >
                          {method}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Mock Card Form */}
                {paymentMethod === 'Credit Card (Mock)' && (
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-[#A39E93] block mb-1">
                        Mock Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#FBF9F5]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-[#A39E93] block mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#FBF9F5]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-[#A39E93] block mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#FBF9F5]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tip Selector */}
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block">
                    Tip the Pizzaioli & Kitchen Brigade
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[10, 15, 18, 20].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setTipPercentage(pct)}
                        className={`py-2 rounded-xl text-xs font-mono font-semibold border transition-all ${
                          tipPercentage === pct
                            ? 'bg-[#C85A32] border-[#C85A32] text-white'
                            : 'bg-white/5 border-white/10 text-[#A39E93]'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="px-5 py-3 rounded-xl bg-white/5 text-xs uppercase tracking-wider text-[#A39E93]"
                  >
                    Back
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#C85A32] via-[#B84E28] to-[#D9A35F] text-white text-xs uppercase tracking-widest font-bold shadow-[0_0_35px_rgba(200,90,50,0.4)] hover:scale-[1.02] transition-transform flex items-center gap-2"
                  >
                    <span>Place Wood-Fired Order</span>
                    <span>•</span>
                    <span className="font-mono">${total.toFixed(2)}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5 sticky top-28 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-[#FBF9F5] pb-3 border-b border-white/10 flex items-center justify-between">
                <span>Order Total</span>
                <span className="font-mono text-xs text-[#D9A35F]">{cart.length} items</span>
              </h3>

              <div className="space-y-2 text-xs text-[#A39E93]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#FBF9F5]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax (9%)</span>
                  <span className="font-mono text-[#FBF9F5]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>
                    {deliveryType === 'delivery' ? 'Courier Delivery' : 'Curbside Pickup'}
                  </span>
                  <span className="font-mono text-[#FBF9F5]">
                    {deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pizzaiolo Tip ({tipPercentage}%)</span>
                  <span className="font-mono text-[#FBF9F5]">${tip.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline text-base font-semibold text-[#FBF9F5]">
                  <span className="font-serif">Grand Total</span>
                  <span className="font-mono text-[#D9A35F] text-xl font-bold">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-[#A39E93] space-y-1.5 font-light">
                <div className="flex items-center gap-2 text-[#D9A35F] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#C85A32]" />
                  <span>Antonio’s Guarantee</span>
                </div>
                <p>
                  Baked in our 900°F Acunto wood-fired hearth and boxed immediately into ventilated heat-preserving craft cartons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
