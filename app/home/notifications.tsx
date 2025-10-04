import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { theme } from '../../theme';
import { useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  NotificationItem,
  getNotifications,
  removeNotification,
} from '../../utils/notifications';

export default function NotificationsScreen() {
  const [items, setItems] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const load = async () => setItems(await getNotifications());
    load();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const load = async () => {
        const next = await getNotifications();
        if (isActive) setItems(next);
      };
      load();
      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardMessage}>{item.message}</Text>
            </View>
            <Pressable
              style={styles.deleteBtn}
              onPress={async () => {
                const next = await removeNotification(index);
                setItems(next);
              }}
            >
              <Text style={styles.deleteText}>✕</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.subtitle}>Trenutno nemate obaveštenja.</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightBlue,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#ffffff',
    marginHorizontal: 16,
  },
  subtitle: {
    color: '#ffffff',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: 4,
  },
  cardMessage: {
    color: '#ffffff',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    alignSelf: 'center',
  },
  deleteText: {
    color: '#ffffff',
    fontWeight: '900',
  },
});
