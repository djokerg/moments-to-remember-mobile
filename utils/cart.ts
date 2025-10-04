import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
  id: string;
  title: string;
  image: any;
  date: string;
  guests: number;
  price: number;
};

const CART_KEY = 'cart_items_v1';

export async function getCartItems(): Promise<CartItem[]> {
  const raw = await AsyncStorage.getItem(CART_KEY);
  return raw ? (JSON.parse(raw) as CartItem[]) : [];
}

export async function addToCart(item: CartItem): Promise<void> {
  const items = await getCartItems();
  items.push(item);
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
}

export async function clearCart(): Promise<void> {
  await AsyncStorage.removeItem(CART_KEY);
}

export async function removeCartItem(index: number): Promise<CartItem[]> {
  const items = await getCartItems();
  items.splice(index, 1);
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
  return items;
}
