import AsyncStorage from '@react-native-async-storage/async-storage';

export type RegisteredUser = {
  username: string;
  password: string;
  phone: string;
  address: string;
};

const REGISTERED_USER_KEY = 'registered_user_v1';
const SESSION_USER_KEY = 'session_user_v1';

export async function getRegisteredUser(): Promise<RegisteredUser | null> {
  const raw = await AsyncStorage.getItem(REGISTERED_USER_KEY);
  return raw ? (JSON.parse(raw) as RegisteredUser) : null;
}

export async function saveRegisteredUser(user: RegisteredUser): Promise<void> {
  await AsyncStorage.setItem(REGISTERED_USER_KEY, JSON.stringify(user));
}

export async function getSessionUser(): Promise<string | null> {
  return await AsyncStorage.getItem(SESSION_USER_KEY);
}

export async function setSessionUser(username: string): Promise<void> {
  await AsyncStorage.setItem(SESSION_USER_KEY, username);
}

export async function clearSessionUser(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_USER_KEY);
}
