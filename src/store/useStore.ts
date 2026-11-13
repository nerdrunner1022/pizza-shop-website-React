import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  MenuItem, 
  CartItem, 
  Order, 
  OrderStatus, 
  SeasonalCampaign, 
  AdminUser, 
  CrustOption, 
  AddOnOption,
  InventoryItem
} from '../types';
import { 
  INITIAL_MENU_ITEMS, 
  INITIAL_ORDERS, 
  INITIAL_SEASONAL_CAMPAIGN,
  INITIAL_INVENTORY
} from '../data/mockData';

interface PizzeriaState {
  // Menu State
  menuItems: MenuItem[];
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  toggleStock: (id: string) => void;
  resetMenu: () => void;

  // Customization Modal State
  activeItemForModal: MenuItem | null;
  setActiveItemForModal: (item: MenuItem | null) => void;

  // Cart State
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (
    item: MenuItem,
    crust?: CrustOption,
    addOns?: AddOnOption[],
    quantity?: number,
    specialInstructions?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;

  // Orders State
  orders: Order[];
  createOrder: (orderInput: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'estimatedMinutesRemaining'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Pantry & Inventory
  inventoryItems: InventoryItem[];
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateInventoryItem: (id: string, updates: Partial<Omit<InventoryItem, 'id'>>) => void;
  removeInventoryItem: (id: string) => void;

  // Seasonal Campaign
  seasonalCampaign: SeasonalCampaign;
  updateSeasonalCampaign: (updates: Partial<SeasonalCampaign>) => void;

  // Admin Auth State
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
}

export const useStore = create<PizzeriaState>()(
  persist(
    (set, get) => ({
      // Menu
      menuItems: INITIAL_MENU_ITEMS,
      updateMenuItem: (id, updates) => {
        set((state) => ({
          menuItems: state.menuItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },
      toggleStock: (id) => {
        set((state) => ({
          menuItems: state.menuItems.map((item) =>
            item.id === id ? { ...item, isOutOfStock: !item.isOutOfStock } : item
          ),
        }));
      },
      resetMenu: () => {
        set({ menuItems: INITIAL_MENU_ITEMS });
      },

      // Modal
      activeItemForModal: null,
      setActiveItemForModal: (item) => {
        set({ activeItemForModal: item });
      },

      // Cart
      cart: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      addToCart: (item, crust, addOns = [], quantity = 1, specialInstructions = '') => {
        const addOnsPrice = addOns.reduce((acc, curr) => acc + curr.price, 0);
        const crustPrice = crust ? crust.price : 0;
        const unitPrice = item.price + crustPrice + addOnsPrice;
        const totalPrice = unitPrice * quantity;

        // Generate a composite key for uniqueness with options
        const cartItemId = `${item.id}-${crust?.id || 'standard'}-${addOns.map((a) => a.id).sort().join('_')}-${specialInstructions.slice(0, 10)}`;

        set((state) => {
          const existingIndex = state.cart.findIndex((c) => c.cartItemId === cartItemId);
          if (existingIndex > -1) {
            const updated = [...state.cart];
            const existing = updated[existingIndex];
            const newQty = existing.quantity + quantity;
            updated[existingIndex] = {
              ...existing,
              quantity: newQty,
              totalPrice: existing.unitPrice * newQty,
            };
            return { cart: updated, isCartOpen: true };
          }

          const newItem: CartItem = {
            cartItemId,
            menuItem: item,
            selectedCrust: crust,
            selectedAddOns: addOns,
            quantity,
            specialInstructions,
            unitPrice,
            totalPrice,
          };
          return { cart: [...state.cart, newItem], isCartOpen: true };
        });
      },
      removeFromCart: (cartItemId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.cartItemId !== cartItemId),
        }));
      },
      updateCartQuantity: (cartItemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartItemId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.cartItemId === cartItemId
              ? {
                  ...item,
                  quantity,
                  totalPrice: item.unitPrice * quantity,
                }
              : item
          ),
        }));
      },
      clearCart: () => set({ cart: [] }),

      // Orders
      orders: INITIAL_ORDERS,
      createOrder: (orderInput) => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const newOrder: Order = {
          ...orderInput,
          id: `ord-${Date.now()}`,
          orderNumber: `#AC-${randomNum}`,
          createdAt: new Date().toISOString(),
          status: 'Incoming',
          estimatedMinutesRemaining: orderInput.deliveryType === 'delivery' ? 35 : 20,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((ord) =>
            ord.id === orderId
              ? {
                  ...ord,
                  status,
                  estimatedMinutesRemaining:
                    status === 'Completed'
                      ? 0
                      : status === 'Out for Delivery'
                      ? 10
                      : status === 'In the Oven'
                      ? 12
                      : ord.estimatedMinutesRemaining,
                }
              : ord
          ),
        }));
      },

      // Pantry & Inventory
      inventoryItems: INITIAL_INVENTORY,
      addInventoryItem: (item) => {
        set((state) => ({
          inventoryItems: [
            ...state.inventoryItems,
            { ...item, id: `inv-${crypto.randomUUID()}` },
          ],
        }));
      },
      updateInventoryItem: (id, updates) => {
        set((state) => ({
          inventoryItems: state.inventoryItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        }));
      },
      removeInventoryItem: (id) => {
        set((state) => ({
          inventoryItems: state.inventoryItems.filter((item) => item.id !== id),
        }));
      },

      // Seasonal Campaign
      seasonalCampaign: INITIAL_SEASONAL_CAMPAIGN,
      updateSeasonalCampaign: (updates) => {
        set((state) => ({
          seasonalCampaign: { ...state.seasonalCampaign, ...updates },
        }));
      },

      // Admin Auth
      isAuthenticated: false,
      adminUser: {
        id: 'adm-01',
        name: 'Antonio De Luca',
        role: 'Master Pizzaiolo & Owner',
        email: 'antonio@antonioscorner.com',
        avatarUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=250',
      },
      loginAdmin: (username, password) => {
        if (username !== 'admin@antonioscorner.com' || password !== 'pizza900') {
          return false;
        }
        set({ isAuthenticated: true });
        return true;
      },
      logoutAdmin: () => {
        set({ isAuthenticated: false });
      },
    }),
    {
      name: 'antonios-corner-storage',
      partialize: (state) => ({
        menuItems: state.menuItems,
        orders: state.orders,
        inventoryItems: state.inventoryItems,
        seasonalCampaign: state.seasonalCampaign,
        cart: state.cart,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Partial<PizzeriaState>),
        isAuthenticated: false,
      }),
    }
  )
);
