import AsyncStorage from '@react-native-async-storage/async-storage';

export type OfferComment = {
  username: string;
  rating: number; // 1-5
  comment: string;
  createdAt: number;
};

function keyFor(offerId: string) {
  return `comments_v1_${offerId}`;
}

export async function getComments(offerId: string): Promise<OfferComment[]> {
  const raw = await AsyncStorage.getItem(keyFor(offerId));
  return raw ? (JSON.parse(raw) as OfferComment[]) : [];
}

export async function addComment(
  offerId: string,
  input: Omit<OfferComment, 'createdAt'>,
): Promise<OfferComment[]> {
  const existing = await getComments(offerId);
  const next: OfferComment[] = [
    { ...input, createdAt: Date.now() },
    ...existing,
  ];
  await AsyncStorage.setItem(keyFor(offerId), JSON.stringify(next));
  return next;
}
