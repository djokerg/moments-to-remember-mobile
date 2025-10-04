import { Stack } from 'expo-router';

export default function OffersLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Ponude', headerShown: false }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: 'Ponuda', headerShown: false }}
      />
    </Stack>
  );
}
