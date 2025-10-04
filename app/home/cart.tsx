import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { theme } from '../../theme';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  CartItem,
  getCartItems,
  clearCart,
  removeCartItem,
} from '../../utils/cart';
import {
  addNotification,
  createAcceptedOfferNotification,
} from '../../utils/notifications';

export default function CartScreen() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const load = async () => setItems(await getCartItems());
    load();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const load = async () => {
        const next = await getCartItems();
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
      <Text style={styles.title}>Korpa</Text>
      <FlatList
        data={items}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardTexts}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemText}>Datum: {item.date}</Text>
              <Text style={styles.itemText}>Broj gostiju: {item.guests}</Text>
              <Text style={styles.itemText}>
                Cena: {item.price?.toLocaleString('sr-RS') ?? '-'} RSD
              </Text>
            </View>
            <Pressable
              style={styles.deleteBtn}
              onPress={async () => {
                const next = await removeCartItem(index);
                setItems(next);
              }}
            >
              <Text style={styles.deleteText}>✕</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Korpa je prazna.</Text>}
        contentContainerStyle={styles.listContent}
      />
      {items.length > 0 && (
        <Pressable
          style={styles.checkoutBtn}
          onPress={async () => {
            for (const it of items) {
              await addNotification(
                createAcceptedOfferNotification({
                  title: it.title,
                  date: it.date,
                  guests: it.guests,
                }),
              );
            }
            Alert.alert(
              'Uspeh',
              'Kupovina je potvrđena!Dobićete obaveštenje kada se vaša ponuda prihvati.',
            );
            await clearCart();
            setItems([]);
          }}
        >
          <Text style={styles.checkoutText}>Potvrdite kupovinu</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightBlue,
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    color: '#ffffff',
    textAlign: 'center',
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
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  cardTexts: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: 4,
  },
  itemText: {
    color: '#ffffff',
    opacity: 0.95,
  },
  empty: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 32,
  },
  checkoutBtn: {
    backgroundColor: theme.darkBlue,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  checkoutText: {
    color: '#ffffff',
    fontWeight: '700',
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
