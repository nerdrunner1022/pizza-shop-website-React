import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Filter, 
  Sparkles, 
  Plus, 
  AlertCircle, 
  SlidersHorizontal, 
  Check, 
  Timer 
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { CategoryType, DietaryTag, MenuItem } from '../types';
import { getMenuItemImage } from '../data/menuImages';

export const MenuPage: React.FC = () => {
  const { menuItems, setActiveItemForModal, addToCart } = useStore();

  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedTag, setSelectedTag] = useState<DietaryTag | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'Complete Collection' },
    { id: 'pizzas', label: 'Wood-Fired Pies' },
    { id: 'sides', label: 'Antipasti & Sides' },
    { id: 'desserts', label: 'Dolci & Desserts' },
    { id: 'drinks', label: 'Bevande & Wines' },
  ];

  const dietaryTags: (DietaryTag | 'All')[] = [
    'All',
    'Vegetarian',
    'Gluten-Free',
    'Halal',
    'Spicy',
    'Chef Special',
    'D.O.P. Certified',
  ];

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Dietary tag match
      if (selectedTag !== 'All' && !item.tags.includes(selectedTag)) {
        return false;
      }

      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(query);
        const italianMatch = item.italianName?.toLowerCase().includes(query);
        const descMatch = item.description.toLowerCase().includes(query);
        const ingredientMatch = item.ingredients?.some((ing) => ing.toLowerCase().includes(query));
        if (!nameMatch && !italianMatch && !descMatch && !ingredientMatch) {
          return false;
        }
      }

      return true;
    });
  }, [menuItems, activeCategory, selectedTag, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FBF9F5] pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-16 xl:px-20 w-full">
      <div className="w-full space-y-8 sm:space-y-12">
        {/* Header Hero */}
        <div className="space-y-3 sm:space-y-4 text-center max-w-2xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-[#D9A35F]">
            <Flame className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Neapolitan Wood-Fired Menu</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FBF9F5]">
            Artisanal Offerings
          </h1>
          <p className="text-xs sm:text-sm text-[#A39E93] font-light leading-relaxed">
            Every pizza is stretched from 72-hour naturally fermented dough, topped with certified Italian D.O.P. imports and baked at 900°F over fragrant oak wood embers.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 bg-[#141414] p-4 sm:p-6 rounded-3xl border border-white/10 shadow-xl">
          {/* Top Row: Search & Category Tabs */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category tabs: horizontal scroll on mobile */}
            <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0 scroll-smooth">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-medium transition-all shrink-0 ${
                      isActive
                        ? 'bg-[#C85A32] text-white shadow-[0_0_15px_rgba(200,90,50,0.4)]'
                        : 'bg-white/5 text-[#A39E93] hover:text-[#FBF9F5] hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pies, truffles, burrata..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-[#FBF9F5] placeholder-[#A39E93]/50 focus:outline-none focus:border-[#D9A35F]"
              />
            </div>
          </div>

          {/* Bottom Row: Dietary Badges Filter: horizontal scroll on mobile */}
          <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-white/5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#A39E93] flex items-center gap-1.5 shrink-0 mr-1">
              <Filter className="w-3 h-3 text-[#D9A35F]" />
              <span>Dietary:</span>
            </span>
            {dietaryTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#D9A35F] text-black font-semibold'
                      : 'bg-white/5 text-[#A39E93] hover:text-[#FBF9F5] border border-white/5'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-4 bg-white/5 rounded-3xl border border-white/10">
            <AlertCircle className="w-8 h-8 text-[#D9A35F] mx-auto opacity-70" />
            <h3 className="font-serif text-xl text-[#FBF9F5]">No Artisanal Items Found</h3>
            <p className="text-xs text-[#A39E93] max-w-sm mx-auto font-light">
              We couldn't find items matching your search or dietary filter criteria. Try clearing the filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedTag('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-[#C85A32] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 w-full">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`group rounded-3xl bg-[#141414] border border-white/10 p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#D9A35F]/40 hover:shadow-[0_0_30px_rgba(200,90,50,0.15)] relative ${
                  item.isOutOfStock ? 'opacity-65' : ''
                }`}
              >
                {/* Menu Item Photo */}
                <div
                  onClick={() => !item.isOutOfStock && setActiveItemForModal(item)}
                  className="relative h-52 -mx-2 -mt-2 rounded-2xl bg-black/50 overflow-hidden cursor-pointer"
                >
                  <img
                    src={getMenuItemImage(item)}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Out of stock badge */}
                  {item.isOutOfStock && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-full bg-red-900/80 text-white border border-red-500 text-xs font-mono uppercase tracking-widest font-semibold shadow-lg">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Seasonal drop badge */}
                  {item.isSeasonalSpecial && !item.isOutOfStock && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#C85A32] text-white text-[10px] font-semibold tracking-wider uppercase shadow-md">
                      {item.seasonalBadge || 'Seasonal'}
                    </div>
                  )}

                  {/* Price pill */}
                  <div className="absolute top-3 right-3 text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#D9A35F] border border-white/10">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="space-y-3 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-[#A39E93] border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-[#A39E93] flex items-center gap-1">
                      <Timer className="w-3 h-3 text-[#C85A32]" />
                      <span>{item.prepTimeMinutes}m</span>
                    </span>
                  </div>

                  <div>
                    <h3
                      onClick={() => !item.isOutOfStock && setActiveItemForModal(item)}
                      className="font-serif text-xl font-bold text-[#FBF9F5] group-hover:text-[#D9A35F] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    {item.italianName && (
                      <p className="font-serif text-xs text-[#D9A35F] italic mt-0.5">
                        « {item.italianName} »
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-[#A39E93] line-clamp-2 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Ingredients preview */}
                  {item.ingredients && (
                    <p className="text-[10px] text-[#A39E93]/70 truncate">
                      <strong className="text-[#C85A32]/80">Ingredients: </strong>
                      {item.ingredients.join(' • ')}
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-4 border-t border-white/5 flex items-center gap-2">
                  <button
                    disabled={item.isOutOfStock}
                    onClick={() => setActiveItemForModal(item)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#FBF9F5] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 border border-white/5 disabled:opacity-40"
                  >
                    <span>Customize</span>
                  </button>

                  <button
                    disabled={item.isOutOfStock}
                    onClick={() => {
                      addToCart(
                        item,
                        item.crustOptions ? item.crustOptions[0] : undefined,
                        [],
                        1,
                        ''
                      );
                    }}
                    className="py-2.5 px-4 rounded-xl bg-[#C85A32] hover:bg-[#B84E28] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1 shadow-md hover:scale-105 transition-transform disabled:opacity-40"
                    title="Quick Add to Bag"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
