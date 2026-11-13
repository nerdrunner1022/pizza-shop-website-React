import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Utensils } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { cart, isCartOpen, closeCart, updateCartQuantity, removeFromCart, clearCart } = useStore();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = subtotal * 0.09;
  const total = subtotal + tax;

  const handleCheckout = () => {
    closeCart();
    navigate('/order');
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#121212] border-l border-white/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#C85A32]/20 border border-[#C85A32]/40 flex items-center justify-center text-[#D9A35F]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">Your Artisanal Bag</h3>
                <span className="text-[11px] text-[#A39E93]">
                  {cart.length} {cart.length === 1 ? 'distinct selection' : 'distinct selections'}
                </span>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#A39E93] hover:text-[#FBF9F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4 text-[#A39E93]">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#D9A35F]/60 border border-white/10">
                  <Utensils className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-serif text-lg text-[#FBF9F5]">Your Bag is Empty</p>
                  <p className="text-xs text-[#A39E93] mt-1 max-w-[240px]">
                    Crafted with 72-hour sourdough and wood-fired to order. Discover your next pie.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/menu');
                  }}
                  className="mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C85A32] to-[#D9A35F] text-white text-xs font-semibold tracking-wider uppercase hover:opacity-95 transition-opacity"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 relative group"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#FBF9F5]">
                        {item.menuItem.name}
                      </h4>
                      {item.menuItem.italianName && (
                        <p className="text-[10px] text-[#D9A35F] italic">
                          {item.menuItem.italianName}
                        </p>
                      )}
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#D9A35F]">
                      ${item.totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Selected Crust */}
                  {item.selectedCrust && (
                    <div className="text-[11px] text-[#A39E93] flex items-center gap-1.5">
                      <span className="text-[#C85A32]">Crust:</span>
                      <span>{item.selectedCrust.name}</span>
                    </div>
                  )}

                  {/* Selected Add-ons */}
                  {item.selectedAddOns.length > 0 && (
                    <div className="text-[11px] text-[#A39E93] space-y-0.5">
                      <span className="text-[#C85A32]">Add-ons:</span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {item.selectedAddOns.map((addon) => (
                          <span
                            key={addon.id}
                            className="inline-block px-1.5 py-0.5 text-[9px] rounded bg-white/5 text-[#EFE9DC] border border-white/5"
                          >
                            +{addon.name} (${addon.price.toFixed(2)})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special instructions */}
                  {item.specialInstructions && (
                    <p className="text-[10px] text-[#A39E93] italic bg-black/30 p-1.5 rounded border border-white/5">
                      Note: "{item.specialInstructions}"
                    </p>
                  )}

                  {/* Quantity and Remove */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 bg-[#1A1A1A] px-2 py-1 rounded-lg border border-white/10">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1 text-[#A39E93] hover:text-[#FBF9F5] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs w-5 text-center text-[#FBF9F5]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="p-1 text-[#A39E93] hover:text-[#FBF9F5] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="p-1.5 text-[#A39E93] hover:text-[#C85A32] transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0E0E0E] space-y-4">
              <div className="space-y-1.5 text-xs text-[#A39E93]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#FBF9F5]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (9%)</span>
                  <span className="font-mono text-[#FBF9F5]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#FBF9F5] pt-2 border-t border-white/10">
                  <span className="font-serif">Estimated Total</span>
                  <span className="font-mono text-[#D9A35F] text-base">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="px-3 py-3 rounded-xl border border-white/10 hover:border-white/20 text-[#A39E93] hover:text-[#FBF9F5] text-xs transition-colors"
                  title="Clear entire cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C85A32] via-[#B84E28] to-[#D9A35F] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(200,90,50,0.35)] hover:shadow-[0_0_35px_rgba(200,90,50,0.5)] transition-all hover:scale-[1.01]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
