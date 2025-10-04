import { Ionicons } from '@expo/vector-icons';
import { Tabs, router } from 'expo-router';
import { Pressable } from 'react-native';
import { theme } from '../../theme';
import { clearSessionUser } from '../../utils/auth';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.lightBlue,
        headerShown: true,
        headerLeft: () => (
          <Pressable
            onPress={async () => {
              await clearSessionUser();
              router.replace('/');
            }}
            style={{ paddingHorizontal: 12 }}
          >
            <Ionicons name="log-out-outline" size={22} color={theme.darkBlue} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            onPress={() => router.push('/home/notifications')}
            style={{ paddingHorizontal: 12 }}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={
                route.name === 'notifications'
                  ? theme.lightBlue
                  : theme.darkBlue
              }
            />
          </Pressable>
        ),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Početna',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="about-us"
        options={{
          title: 'O nama',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Korpa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: 'Ponude',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pricetag" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Obaveštenja',
          href: null,
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
