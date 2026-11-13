import React, { useEffect, useState } from 'react';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { CrustOption, AddOnOption } from '../../types';
import { getMenuItemImage } from '../../data/menuImages';

export const ItemCustomizeModal: React.FC = () => {
  const { activeItemForModal, setActiveItemForModal, addToCart } = useStore();

  const [selectedCrust, setSelectedCrust] = useState<CrustOption | undefined>();
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (!activeItemForModal) return;

    setSelectedCrust(activeItemForModal.crustOptions?.[0]);
    setSelectedAddOns([]);
    setQuantity(1);
    setInstructions('');
  }, [activeItemForModal]);

  if (!activeItemForModal) return null;

  const item = activeItemForModal;

  const toggleAddOn = (addon: AddOnOption) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const addOnsTotal = selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);
  const crustTotal = selectedCrust ? selectedCrust.price : 0;
  const unitPrice = item.price + crustTotal + addOnsTotal;
  const grandTotal = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(item, selectedCrust, selectedAddOns, quantity, instructions);
    setActiveItemForModal(null);
  };

  return (
    <div className="fixed inset-0 z-[120] overflow-y-auto flex items-center justify-center p-2 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setActiveItemForModal(null)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#141414] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-4 sm:my-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setActiveItemForModal(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-black/70 border border-white/15 text-[#A39E93] hover:text-[#FBF9F5] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-h-[88vh] overflow-y-auto">
          {/* Menu Item Photo */}
          <div className="relative h-48 sm:h-72 bg-[#1E1916] border-b border-white/10">
            <img
              src={getMenuItemImage(item)}
              alt={item.name}
              className="h-full w-full object-cover"
            />
            {item.isSeasonalSpecial && (
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 rounded-full bg-[#C85A32]/90 border border-[#C85A32] text-white text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase">
                {item.seasonalBadge || 'Special Drop'}
              </div>
            )}
          </div>

          {/* Details Body */}
          <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs uppercase tracking-widest text-[#D9A35F] font-medium">
                  {item.category}
                </span>
                {item.isSignature && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D9A35F]/20 text-[#D9A35F] border border-[#D9A35F]/30">
                    House Signature
                  </span>
                )}
              </div>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#FBF9F5]">
                {item.name}
              </h2>
              {item.italianName && (
                <p className="font-serif text-xs sm:text-sm text-[#D9A35F] italic mt-0.5">
                  « {item.italianName} »
                </p>
              )}
              <p className="text-xs sm:text-sm text-[#A39E93] leading-relaxed mt-2 sm:mt-3 font-light">
                {item.description}
              </p>
              {item.storySnippet && (
                <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-xs text-[#EFE9DC] italic">
                  <Flame className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                  <span>"{item.storySnippet}"</span>
                </div>
              )}
            </div>

            {/* Ingredients Pills */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#A39E93] font-semibold mb-2">
                  Artisanal Ingredients
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-[#FBF9F5]/90"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Crust Selection (if applicable) */}
            {item.crustOptions && item.crustOptions.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs uppercase tracking-widest text-[#A39E93] font-semibold">
                    1. Select Dough & Crust Style
                  </h4>
                  <span className="text-[10px] text-[#D9A35F]">Required</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.crustOptions.map((c) => {
                    const isSelected = selectedCrust?.id === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCrust(c)}
                        className={`text-left p-3.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-[#C85A32]/15 border-[#C85A32] shadow-[0_0_15px_rgba(200,90,50,0.2)]'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-[#FBF9F5]">{c.name}</span>
                          <span className="text-xs font-mono text-[#D9A35F]">
                            {c.price > 0 ? `+$${c.price.toFixed(2)}` : 'Standard'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#A39E93] leading-snug">{c.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add-ons Selection (if applicable) */}
            {item.addOns && item.addOns.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-[#A39E93] font-semibold">
                  2. Master Pizzaiolo Enhancements (Optional)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.addOns.map((addon) => {
                    const isSelected = selectedAddOns.some((a) => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddOn(addon)}
                        className={`text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-[#D9A35F]/15 border-[#D9A35F]'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border text-white ${
                              isSelected
                                ? 'bg-[#D9A35F] border-[#D9A35F]'
                                : 'border-white/30 bg-transparent'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                          </div>
                          <span className="text-xs text-[#FBF9F5]">{addon.name}</span>
                        </div>
                        <span className="text-xs font-mono text-[#D9A35F]">
                          +${addon.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#A39E93] font-semibold block">
                Special Requests for Antonio
              </label>
              <input
                type="text"
                placeholder="e.g. Cut into 8 slices, light bake, extra crispy cornicione..."
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#FBF9F5] placeholder-[#A39E93]/50 focus:outline-none focus:border-[#D9A35F]"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 border-t border-white/10 bg-[#0E0E0E] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-xs text-[#A39E93]">Quantity:</span>
              <div className="flex items-center gap-3 bg-[#1A1A1A] px-3 py-1.5 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#A39E93] hover:text-[#FBF9F5]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-sm font-semibold w-6 text-center text-[#FBF9F5]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[#A39E93] hover:text-[#FBF9F5]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#D9A35F] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(200,90,50,0.35)] hover:scale-[1.02] transition-transform"
            >
              <span>Add to Order Bag</span>
              <span>•</span>
              <span className="font-mono">${grandTotal.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
