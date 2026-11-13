import React, { useMemo, useState } from 'react';
import { Boxes, Plus, Search, Trash2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { InventoryCategory, InventoryItem, InventoryUnit } from '../../types';

const categoryOptions: { value: InventoryCategory; label: string }[] = [
  { value: 'pantry', label: 'Pantry supplies' },
  { value: 'utensils', label: 'Utensils & smallwares' },
  { value: 'equipment', label: 'Equipment & resources' },
];

const units: InventoryUnit[] = ['kg', 'L', 'units', 'bags', 'bottles', 'boxes'];

const emptyItem: Omit<InventoryItem, 'id'> = {
  name: '',
  category: 'pantry',
  quantity: 0,
  unit: 'kg',
  reorderLevel: 1,
};

export const AdminInventoryView: React.FC = () => {
  const { inventoryItems, addInventoryItem, updateInventoryItem, removeInventoryItem } = useStore();
  const [category, setCategory] = useState<InventoryCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [newItem, setNewItem] = useState(emptyItem);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    return inventoryItems.filter((item) => {
      const matchesCategory = category === 'all' || item.category === category;
      const matchesSearch = !query || item.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [inventoryItems, category, search]);

  const lowStockCount = inventoryItems.filter((item) => item.quantity <= item.reorderLevel).length;

  const handleAddItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = newItem.name.trim();
    if (!name) return;

    addInventoryItem({ ...newItem, name });
    setNewItem(emptyItem);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <span className="text-[10px] uppercase tracking-widest text-[#D9A35F] font-semibold">
          Stock & Resources
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#FBF9F5]">
          Pantry & Inventory
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-[#A39E93]">
          Track ingredients, kitchen utensils, and restaurant equipment. Update current quantities and reorder thresholds as stock changes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {categoryOptions.map((option) => {
          const count = inventoryItems.filter((item) => item.category === option.value).length;
          return (
            <div key={option.value} className="p-5 rounded-2xl bg-[#141414] border border-white/10">
              <p className="text-xs text-[#A39E93]">{option.label}</p>
              <p className="mt-2 font-mono text-2xl font-bold text-[#FBF9F5]">{count}</p>
              <p className="text-[11px] text-[#A39E93]">tracked items</p>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={handleAddItem}
        className="p-5 sm:p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4"
      >
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#D9A35F]" />
          <h2 className="font-serif text-lg font-bold text-[#FBF9F5]">Add an inventory item</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <input
            required
            aria-label="Inventory item name"
            placeholder="Item name"
            value={newItem.name}
            onChange={(event) => setNewItem({ ...newItem, name: event.target.value })}
            className="sm:col-span-2 lg:col-span-2 w-full min-w-0 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
          />
          <select
            aria-label="Inventory category"
            value={newItem.category}
            onChange={(event) => setNewItem({ ...newItem, category: event.target.value as InventoryCategory })}
            className="w-full min-w-0 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            step="0.1"
            aria-label="Current quantity"
            value={newItem.quantity}
            onChange={(event) => setNewItem({ ...newItem, quantity: Number(event.target.value) })}
            className="w-full min-w-0 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
          />
          <select
            aria-label="Quantity unit"
            value={newItem.unit}
            onChange={(event) => setNewItem({ ...newItem, unit: event.target.value as InventoryUnit })}
            className="w-full min-w-0 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
          >
            {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
          </select>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#B84E28]"
          >
            <Plus className="w-4 h-4" />
            Add item
          </button>
        </div>
      </form>

      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-2 rounded-xl text-xs ${category === 'all' ? 'bg-[#C85A32] text-white' : 'bg-white/5 text-[#A39E93]'}`}
            >
              All ({inventoryItems.length})
            </button>
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCategory(option.value)}
                className={`px-3 py-2 rounded-xl text-xs ${category === option.value ? 'bg-[#C85A32] text-white' : 'bg-white/5 text-[#A39E93]'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <label className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A39E93]" />
            <input
              type="search"
              placeholder="Search inventory..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
            />
          </label>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#A39E93]" aria-live="polite">
          <Boxes className="w-4 h-4 text-[#D9A35F]" />
          {lowStockCount} {lowStockCount === 1 ? 'item is' : 'items are'} at or below reorder level
        </div>

        {filteredItems.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isLow = item.quantity <= item.reorderLevel;
              return (
                <article key={item.id} className="p-5 rounded-2xl bg-[#141414] border border-white/10 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-[#A39E93]">
                        {categoryOptions.find((option) => option.value === item.category)?.label}
                      </p>
                      <h3 className="mt-1 font-serif text-lg font-bold text-[#FBF9F5] break-words">{item.name}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeInventoryItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="p-2 rounded-lg text-[#A39E93] hover:text-red-300 hover:bg-white/5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="text-xs text-[#A39E93]">
                      Current stock ({item.unit})
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={item.quantity}
                        onChange={(event) => updateInventoryItem(item.id, { quantity: Math.max(0, Number(event.target.value)) })}
                        className="mt-1.5 w-full min-w-0 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                      />
                    </label>
                    <label className="text-xs text-[#A39E93]">
                      Reorder at ({item.unit})
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={item.reorderLevel}
                        onChange={(event) => updateInventoryItem(item.id, { reorderLevel: Math.max(0, Number(event.target.value)) })}
                        className="mt-1.5 w-full min-w-0 px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                      />
                    </label>
                  </div>
                  <p className={`text-xs ${isLow ? 'text-amber-300' : 'text-emerald-300'}`}>
                    {isLow ? 'Restock needed' : 'Stock level healthy'}
                  </p>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="p-10 text-center rounded-2xl bg-[#121212] border border-white/10 text-sm text-[#A39E93]">
            No inventory items match these filters.
          </div>
        )}
      </section>
    </div>
  );
};
