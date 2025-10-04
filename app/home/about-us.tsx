import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';

export default function AboutUsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.item}>
          <Ionicons name="mail-outline" size={28} color="#ffffff" />
          <Text style={styles.value}>trenuci_za_pamcenje@gmail.com</Text>
        </View>
        <View style={styles.item}>
          <Ionicons name="call-outline" size={28} color="#ffffff" />
          <Text style={styles.value}>+381 64 858 646</Text>
        </View>
        <View style={styles.item}>
          <Ionicons name="location-outline" size={28} color="#ffffff" />
          <Text style={styles.value}>
            Bulevar Kralja Aleksandra 70, 1. sprat
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.lightBlue,
    padding: 24,
  },
  card: {
    width: '92%',
    backgroundColor: theme.darkBlue,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 18,
    // Shadow (iOS)
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // Elevation (Android)
    elevation: 4,
  },
  item: {
    alignItems: 'center',
    gap: 8,
  },
  value: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
