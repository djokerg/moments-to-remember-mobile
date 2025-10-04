import { Stack } from 'expo-router';

export default function OfferDetailLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="comments" options={{ headerShown: false }} />
    </Stack>
  );
}
