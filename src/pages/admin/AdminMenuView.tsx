import React, { useState } from 'react';
import { 
  Sparkles, 
  Edit3, 
  ToggleLeft, 
  ToggleRight, 
  Search, 
  RotateCcw, 
  Check, 
  Save, 
  Flame, 
  Eye, 
  Clock, 
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { MenuItem } from '../../types';

export const AdminMenuView: React.FC = () => {
  const { 
    menuItems, 
    updateMenuItem, 
    toggleStock, 
    resetMenu, 
    seasonalCampaign, 
    updateSeasonalCampaign 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'items' | 'campaign'>('items');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Edit item modal state
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Campaign local form state
  const [campaignForm, setCampaignForm] = useState(seasonalCampaign);
  const [campaignSaved, setCampaignSaved] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      if (!item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const handleSaveItemModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMenuItem(editingItem.id, editingItem);
      setEditingItem(null);
    }
  };

  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeasonalCampaign(campaignForm);
    setCampaignSaved(true);
    setTimeout(() => setCampaignSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#D9A35F] font-semibold">
            Real-Time State CMS
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F5]">
            Menu & Seasonal Content Management
          </h1>
        </div>

        {/* Tab switcher */}
        <div className="bg-[#141414] p-1 rounded-xl border border-white/10 flex items-center text-xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('items')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'items'
                ? 'bg-[#C85A32] text-white font-semibold shadow-md'
                : 'text-[#A39E93] hover:text-[#FBF9F5]'
            }`}
          >
            Menu Catalog ({menuItems.length})
          </button>
          <button
            onClick={() => setActiveTab('campaign')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'campaign'
                ? 'bg-[#C85A32] text-white font-semibold shadow-md'
                : 'text-[#A39E93] hover:text-[#FBF9F5]'
            }`}
          >
            Seasonal Drop Banner
          </button>
        </div>
      </div>

      {/* TAB 1: MENU CATALOG ITEMS */}
      {activeTab === 'items' && (
        <div className="space-y-6">
          {/* Action & Filter Bar */}
          <div className="p-4 rounded-2xl bg-[#121212] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {['all', 'pizzas', 'sides', 'desserts', 'drinks'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#D9A35F] text-black font-semibold'
                      : 'bg-white/5 text-[#A39E93] hover:text-[#FBF9F5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-60">
                <Search className="w-4 h-4 text-[#A39E93] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                />
              </div>

              <button
                onClick={resetMenu}
                title="Reset to default menu items"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#A39E93] hover:text-[#FBF9F5] border border-white/5 shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Items Table */}
          <div className="p-6 rounded-3xl bg-[#121212] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-[#A39E93] uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Item Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price ($USD)</th>
                    <th className="py-3 px-4">Stock Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      {/* Name & Subtitle */}
                      <td className="py-4 px-4 max-w-xs">
                        <div className="font-semibold text-sm text-[#FBF9F5]">{item.name}</div>
                        {item.italianName && (
                          <div className="text-[11px] text-[#D9A35F] italic">
                            « {item.italianName} »
                          </div>
                        )}
                        <p className="text-[11px] text-[#A39E93] line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-[#A39E93]">
                          {item.category}
                        </span>
                      </td>

                      {/* Interactive Price Input */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 font-mono">
                          <span className="text-[#D9A35F]">$</span>
                          <div className="flex h-10 w-28 overflow-hidden rounded-lg border border-white/10 bg-black/40 transition-colors focus-within:border-[#D9A35F] focus-within:ring-1 focus-within:ring-[#D9A35F]/30">
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              aria-label={`${item.name} price`}
                              value={item.price}
                              onChange={(e) =>
                                updateMenuItem(item.id, { price: parseFloat(e.target.value) || 0 })
                              }
                              className="admin-price-input min-w-0 flex-1 bg-transparent px-3 text-right text-sm tabular-nums text-[#FBF9F5] focus:outline-none"
                            />
                            <div className="flex w-7 shrink-0 flex-col border-l border-white/10 bg-white/[0.03]">
                              <button
                                type="button"
                                aria-label={`Increase ${item.name} price`}
                                onClick={() =>
                                  updateMenuItem(item.id, {
                                    price: Math.round((item.price + 0.5) * 100) / 100,
                                  })
                                }
                                className="flex h-1/2 items-center justify-center text-[#A39E93] transition-colors hover:bg-[#C85A32]/20 hover:text-[#D9A35F] focus-visible:bg-[#C85A32]/20 focus-visible:text-[#D9A35F] focus-visible:outline-none"
                              >
                                <ChevronUp className="h-3 w-3" />
                              </button>
                              <button
                                type="button"
                                aria-label={`Decrease ${item.name} price`}
                                onClick={() =>
                                  updateMenuItem(item.id, {
                                    price: Math.max(0, Math.round((item.price - 0.5) * 100) / 100),
                                  })
                                }
                                className="flex h-1/2 items-center justify-center border-t border-white/10 text-[#A39E93] transition-colors hover:bg-[#C85A32]/20 hover:text-[#D9A35F] focus-visible:bg-[#C85A32]/20 focus-visible:text-[#D9A35F] focus-visible:outline-none"
                              >
                                <ChevronDown className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Live Out of Stock Toggle */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleStock(item.id)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            item.isOutOfStock
                              ? 'bg-red-500/15 border-red-500 text-red-300'
                              : 'bg-emerald-500/15 border-emerald-500 text-emerald-300'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.isOutOfStock ? 'bg-red-500' : 'bg-emerald-500 animate-pulse'
                            }`}
                          />
                          <span>{item.isOutOfStock ? 'Out of Stock' : 'Available'}</span>
                        </button>
                      </td>

                      {/* Edit Button */}
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => setEditingItem({ ...item })}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#A39E93] hover:text-[#FBF9F5] border border-white/5"
                          title="Full Edit Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SEASONAL CAMPAIGN & BANNER CMS */}
      {activeTab === 'campaign' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Campaign Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">
                  Seasonal Spotlight Editor
                </h3>
                <p className="text-xs text-[#A39E93]">
                  Updates the banner displayed across the homepage and menu in real-time.
                </p>
              </div>

              {/* Active Toggle Switch */}
              <button
                type="button"
                onClick={() =>
                  setCampaignForm({ ...campaignForm, isActive: !campaignForm.isActive })
                }
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  campaignForm.isActive
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-[#A39E93]'
                }`}
              >
                <span>{campaignForm.isActive ? 'Banner Active' : 'Banner Hidden'}</span>
              </button>
            </div>

            <form onSubmit={handleSaveCampaign} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={campaignForm.badgeText}
                  onChange={(e) =>
                    setCampaignForm({ ...campaignForm, badgeText: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  value={campaignForm.title}
                  onChange={(e) =>
                    setCampaignForm({ ...campaignForm, title: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                  Editorial Story Description
                </label>
                <textarea
                  rows={3}
                  value={campaignForm.description}
                  onChange={(e) =>
                    setCampaignForm({ ...campaignForm, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                    Promo Code
                  </label>
                  <input
                    type="text"
                    value={campaignForm.promoCode}
                    onChange={(e) =>
                      setCampaignForm({ ...campaignForm, promoCode: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#D9A35F] focus:outline-none focus:border-[#D9A35F]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={campaignForm.discountPercentage}
                    onChange={(e) =>
                      setCampaignForm({
                        ...campaignForm,
                        discountPercentage: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                    Valid Until
                  </label>
                  <input
                    type="text"
                    value={campaignForm.validUntil}
                    onChange={(e) =>
                      setCampaignForm({ ...campaignForm, validUntil: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-emerald-400 font-mono">
                  {campaignSaved ? '✓ Saved & Pushed to Live Public Store!' : ''}
                </span>

                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#D9A35F] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-lg hover:opacity-95 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Deploy Campaign Updates</span>
                </button>
              </div>
            </form>
          </div>

          {/* Real-Time Live Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D9A35F]">
              <Eye className="w-4 h-4" />
              <span>Real-Time Public Site Banner Preview</span>
            </div>

            <div className="glass-panel-warm rounded-3xl p-6 border border-[#C85A32]/30 space-y-4 shadow-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C85A32]/20 border border-[#C85A32]/40 text-[#D9A35F] text-[9px] uppercase tracking-widest font-semibold">
                <Sparkles className="w-3 h-3 text-[#D9A35F]" />
                <span>{campaignForm.badgeText || 'Monthly Roast'}</span>
              </div>

              <h4 className="font-serif text-xl font-bold text-[#FBF9F5]">
                {campaignForm.title || 'Untitled Drop'}
              </h4>

              <p className="text-xs text-[#A39E93] font-light leading-relaxed">
                {campaignForm.description}
              </p>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#A39E93]">
                  Until {campaignForm.validUntil}
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/60 text-[#D9A35F] border border-white/10">
                  {campaignForm.promoCode} ({campaignForm.discountPercentage}% OFF)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL EDIT ITEM MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setEditingItem(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-lg bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 z-10 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="font-serif text-lg font-bold text-[#FBF9F5]">
                Edit Menu Item: {editingItem.name}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-[#A39E93] hover:text-[#FBF9F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItemModal} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#A39E93] block mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5]"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#A39E93] block mb-1">
                  Italian Title
                </label>
                <input
                  type="text"
                  value={editingItem.italianName || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, italianName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#A39E93] block mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingItem.price}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#FBF9F5]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-[#A39E93] block mb-1">
                    Prep Time (Mins)
                  </label>
                  <input
                    type="number"
                    value={editingItem.prepTimeMinutes}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        prepTimeMinutes: parseInt(e.target.value) || 10,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#FBF9F5]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#A39E93] block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-[#A39E93]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#C85A32] text-xs uppercase font-semibold text-white"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
