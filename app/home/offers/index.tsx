import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { Link } from 'expo-router';
import { theme } from '../../../theme';
import { offers } from '../../../data/offers';

export default function OffersScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: '/home/offers/[id]', params: { id: item.id } }}
            asChild
          >
            <Pressable style={styles.card}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc} numberOfLines={2}>
                {item.description}
              </Text>
              <Text style={styles.cardPrice}>
                Cena: {item.price.toLocaleString('sr-RS')} RSD
              </Text>
            </Pressable>
          </Link>
        )}
        contentContainerStyle={styles.listContent}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightBlue,
    paddingVertical: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: 4,
    fontSize: 16,
  },
  cardDesc: {
    color: '#ffffff',
    opacity: 0.9,
  },
  cardPrice: {
    color: '#ffffff',
    fontWeight: '800',
    marginTop: 6,
  },
});
