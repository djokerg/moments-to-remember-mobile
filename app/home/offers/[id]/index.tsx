import { useLocalSearchParams, Link } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import { offers } from '../../../../data/offers';
import { theme } from '../../../../theme';
import { addToCart } from '../../../../utils/cart';
import { Ionicons } from '@expo/vector-icons';

export default function OfferDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const offer = useMemo(
    () => offers.find((o: { id: string }) => o.id === id),
    [id],
  );
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  if (!offer) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Ponuda nije pronađena.</Text>
      </View>
    );
  }

  const onAdd = async () => {
    if (!date || !guests.trim()) {
      Alert.alert('Greška', 'Unesite datum i broj gostiju.');
      return;
    }
    const numGuests = Number(guests);
    if (!Number.isFinite(numGuests) || numGuests <= 0) {
      Alert.alert('Greška', 'Unesite ispravan broj gostiju.');
      return;
    }
    await addToCart({
      id: offer.id,
      title: offer.title,
      image: offer.image,
      date: formatDate(date),
      guests: numGuests,
      price: offer.price,
    });
    Alert.alert('Uspeh', 'Ponuda je dodata u korpu.');
    setDate(null);
    setGuests('');
  };

  const onChangeDate = (_: any, selected?: Date) => {
    setShowPicker(false);
    if (selected) setDate(selected);
  };

  const DateTimePicker: any =
    Platform.OS === 'ios' || Platform.OS === 'android'
      ? // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('@react-native-community/datetimepicker').default
      : null;

  function formatDate(d: Date) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}.`;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Link href="/home/offers" asChild>
        <Pressable style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </Pressable>
      </Link>
      <Image source={offer.image} style={styles.image} />
      <Text style={styles.title}>{offer.title}</Text>
      <Text style={styles.price}>
        Cena: {offer.price.toLocaleString('sr-RS')} RSD
      </Text>
      <Text style={styles.desc}>{offer.description}</Text>
      <Link
        href={{
          pathname: '/home/offers/[id]/comments',
          params: { id: offer.id },
        }}
        asChild
      >
        <Pressable style={styles.commentsBtn}>
          <Text style={styles.commentsBtnText}>Pogledajte komentare</Text>
        </Pressable>
      </Link>

      <View style={styles.form}>
        <Pressable style={styles.input} onPress={() => setShowPicker(true)}>
          <Text style={{ color: '#000000' }}>
            {date ? formatDate(date) : 'Izaberite datum'}
          </Text>
        </Pressable>
        {showPicker && DateTimePicker && (
          <DateTimePicker
            value={date ?? new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={onChangeDate}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Broj gostiju"
          keyboardType="numeric"
          value={guests}
          onChangeText={setGuests}
        />
        <Pressable style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addButtonText}>Dodaj u korpu</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightBlue,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  desc: {
    color: '#ffffff',
    marginBottom: 12,
  },
  price: {
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: 8,
  },
  commentsLink: {
    color: '#ffffff',
    textDecorationLine: 'underline',
    marginBottom: 16,
  },
  commentsBtn: {
    backgroundColor: theme.darkBlue,
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  commentsBtnText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  form: {
    gap: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  addButton: {
    backgroundColor: theme.darkBlue,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: theme.darkBlue,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
});
