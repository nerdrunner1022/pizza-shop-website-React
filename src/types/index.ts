export type CategoryType = 'all' | 'pizzas' | 'sides' | 'drinks' | 'desserts';

export type DietaryTag = 'Vegetarian' | 'Gluten-Free' | 'Halal' | 'Spicy' | 'Chef Special' | 'D.O.P. Certified';

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
}

export interface CrustOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  italianName?: string;
  category: 'pizzas' | 'sides' | 'drinks' | 'desserts';
  description: string;
  storySnippet?: string;
  price: number;
  tags: DietaryTag[];
  crustOptions?: CrustOption[];
  addOns?: AddOnOption[];
  isOutOfStock: boolean;
  isSeasonalSpecial?: boolean;
  isSignature?: boolean;
  seasonalBadge?: string;
  prepTimeMinutes: number;
  calories?: number;
  spiciness?: number; // 0 to 3
  modelVariant: 'margherita' | 'diavola' | 'tartufata' | 'quattro_formaggi' | 'burrata' | 'dessert' | 'side' | 'drink';
  imagePlaceholder?: string;
  ingredients: string[];
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  selectedCrust?: CrustOption;
  selectedAddOns: AddOnOption[];
  quantity: number;
  specialInstructions?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'Incoming' | 'In the Oven' | 'Out for Delivery' | 'Completed';
export type DeliveryType = 'pickup' | 'delivery' | 'dine-in';

export interface OrderItemSummary {
  menuItemId: string;
  name: string;
  quantity: number;
  selectedCrustName?: string;
  selectedAddOnNames?: string[];
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  tableNumber?: string;
  notes?: string;
  items: OrderItemSummary[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  tip: number;
  total: number;
  paymentMethod: 'Credit Card (Mock)' | 'Apple Pay (Mock)' | 'Cash on Pickup';
  estimatedMinutesRemaining: number;
}

export interface SeasonalCampaign {
  title: string;
  tagline: string;
  description: string;
  highlightItem: string;
  validUntil: string;
  promoCode: string;
  discountPercentage: number;
  isActive: boolean;
  badgeText: string;
}

export interface AdminUser {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarUrl: string;
}

export interface DailyMetric {
  date: string;
  revenue: number;
  orderCount: number;
  avgTicket: number;
}

export type InventoryCategory = 'pantry' | 'utensils' | 'equipment';

export type InventoryUnit = 'kg' | 'L' | 'units' | 'bags' | 'bottles' | 'boxes';

export interface InventoryItem {
  id: string;
  name: string;
  category: InventoryCategory;
  quantity: number;
  unit: InventoryUnit;
  reorderLevel: number;
}
