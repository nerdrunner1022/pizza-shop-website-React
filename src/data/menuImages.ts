import type { MenuItem } from '../types';

const menuItemImages: Record<string, string> = {
  'pz-01': '/images/menu/margherita.jpg',
  'pz-02': '/images/menu/truffle-pizza.jpg',
  'pz-03': '/images/menu/diavola.jpg',
  'pz-04': '/images/menu/burrata-prosciutto.jpg',
  'pz-05': '/images/menu/quattro-formaggi.jpg',
  'pz-06': '/images/menu/marinara.jpg',
  'sd-01': '/images/menu/focaccia.jpg',
  'sd-02': '/images/menu/arancini.jpg',
  'sd-03': '/images/menu/fennel-orange-salad.jpg',
  'ds-01': '/images/menu/tiramisu.jpg',
  'ds-02': '/images/menu/cannoli.jpg',
  'dr-01': '/images/menu/orange-soda.jpg',
  'dr-02': '/images/menu/peroni.jpg',
  'dr-03': '/images/menu/chianti.jpg',
};

const categoryFallbackImages: Record<MenuItem['category'], string> = {
  pizzas: '/images/menu/margherita.jpg',
  sides: '/images/menu/focaccia.jpg',
  desserts: '/images/menu/tiramisu.jpg',
  drinks: '/images/menu/orange-soda.jpg',
};

export const getMenuItemImage = (item: Pick<MenuItem, 'id' | 'category'>): string =>
  menuItemImages[item.id] ?? categoryFallbackImages[item.category];
