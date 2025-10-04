import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import { Redirect } from 'expo-router';
import { getSessionUser } from '../../utils/auth';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const u = await getSessionUser();
      setUsername(u);
      setChecking(false);
    };
    load();
  }, []);

  if (!checking && !username) {
    return <Redirect href="/" />;
  }

  const slides = [
    {
      key: 'wedding',
      image: require('../../assets/wedding.jpg'),
      title: 'Venčanje',
      description:
        'Sa posebnom pažnjom osmišljavamo venčanja o kakvima ste sanjali. Vašu ljubav pretvaramo u nezaboravne uspomene!',
    },
    {
      key: 'birthday',
      image: require('../../assets/birthday.jpg'),
      title: 'Rođendan',
      description:
        'Vaše rođendane činimo posebnim i zabavnim! Kreiramo trenutke koji će se dugo prepričavati.',
    },
    {
      key: 'girls',
      image: require('../../assets/girlsparty.jpg'),
      title: 'Devojačko veče',
      description:
        'Organizujemo devojačke večeri pune smeha, prijateljstva i iznenađenja. Uz nas, dobra atmosfera je zagarantovana!',
    },
  ];

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {slides.map((s) => (
            <View
              key={s.key}
              style={[styles.slide, { width: screenWidth - 32 }]}
            >
              <Image source={s.image} style={styles.image} resizeMode="cover" />
              <Text style={styles.eventTitle}>{s.title}</Text>
              <Text style={styles.description}>{s.description}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Naše usluge</Text>
        <View style={styles.features}>
          <View style={styles.featureRow}>
            <Ionicons
              name="ribbon-outline"
              size={22}
              color="#ffffff"
              style={styles.featureIcon}
            />
            <View style={styles.featureTexts}>
              <Text style={styles.featureTitle}>Planiranje događaja</Text>
              <Text style={styles.featureDesc}>
                Kompletna organizacija od ideje do realizacije.
              </Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <Ionicons
              name="color-palette-outline"
              size={22}
              color="#ffffff"
              style={styles.featureIcon}
            />
            <View style={styles.featureTexts}>
              <Text style={styles.featureTitle}>Dekoracija i stilizacija</Text>
              <Text style={styles.featureDesc}>
                Ambijent po vašoj meri, do poslednjeg detalja.
              </Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <Ionicons
              name="camera-outline"
              size={22}
              color="#ffffff"
              style={styles.featureIcon}
            />
            <View style={styles.featureTexts}>
              <Text style={styles.featureTitle}>Foto i video</Text>
              <Text style={styles.featureDesc}>
                Profesionalno beleženje najlepših trenutaka.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightBlue,
    paddingVertical: 24,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  slide: {
    marginHorizontal: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff33',
  },
  eventTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 8,
    marginHorizontal: 16,
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
  },
  features: {
    marginHorizontal: 16,
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: 12,
  },
  featureIcon: {
    marginRight: 10,
  },
  featureTexts: {
    flex: 1,
  },
  featureTitle: {
    color: '#ffffff',
    fontWeight: '700',
    marginBottom: 2,
  },
  featureDesc: {
    color: '#ffffff',
    opacity: 0.9,
  },
});
