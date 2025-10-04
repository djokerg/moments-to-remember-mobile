import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { clearSessionUser } from '../../../utils/auth';
import { theme } from '../../../theme';

export default function ProfileStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Profil' }} />
      <Stack.Screen
        name="change-password"
        options={{ title: 'Promena lozinke' }}
      />
    </Stack>
  );
}
