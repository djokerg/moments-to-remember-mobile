import AsyncStorage from '@react-native-async-storage/async-storage';

export type NotificationItem = {
  id: string; // unique id
  title: string;
  message: string;
  createdAt: number;
};

const NOTIFS_KEY = 'notifications_v1';

export async function getNotifications(): Promise<NotificationItem[]> {
  const raw = await AsyncStorage.getItem(NOTIFS_KEY);
  return raw ? (JSON.parse(raw) as NotificationItem[]) : [];
}

export async function addNotification(n: NotificationItem): Promise<void> {
  const items = await getNotifications();
  items.unshift(n);
  await AsyncStorage.setItem(NOTIFS_KEY, JSON.stringify(items));
}

export async function removeNotification(
  index: number,
): Promise<NotificationItem[]> {
  const items = await getNotifications();
  items.splice(index, 1);
  await AsyncStorage.setItem(NOTIFS_KEY, JSON.stringify(items));
  return items;
}

export function createAcceptedOfferNotification(params: {
  title: string;
  date: string;
  guests: number;
}): NotificationItem {
  const { title, date, guests } = params;
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title: 'Ponuda prihvaćena',
    message: `${title} — Datum: ${date}, Gostiju: ${guests}. Vaša ponuda je prihvaćena!`,
    createdAt: Date.now(),
  };
}
