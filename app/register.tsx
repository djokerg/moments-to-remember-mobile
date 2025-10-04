import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';
import {
  RegisteredUser,
  getRegisteredUser,
  saveRegisteredUser,
} from './utils/auth';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.closeBtn}>
          <Ionicons name="close-outline" size={28} color="#ffffff" />
        </Pressable>
      </Link>
      <Text style={styles.title}>Registracija</Text>
      <View style={styles.form}>
        <View style={styles.inputRow}>
          <Ionicons
            name="person-outline"
            size={22}
            color={theme.darkBlue}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Korisničko ime"
            placeholderTextColor="#6c757d"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputRow}>
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color={theme.darkBlue}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Lozinka"
            placeholderTextColor="#6c757d"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.inputRow}>
          <Ionicons
            name="call-outline"
            size={22}
            color={theme.darkBlue}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefon"
            placeholderTextColor="#6c757d"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputRow}>
          <Ionicons
            name="location-outline"
            size={22}
            color={theme.darkBlue}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Adresa"
            placeholderTextColor="#6c757d"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <Pressable
          style={styles.submitButton}
          onPress={async () => {
            const trimmedUsername = username.trim();
            if (
              !trimmedUsername ||
              !password ||
              !phone.trim() ||
              !address.trim()
            ) {
              Alert.alert('Greška', 'Popunite sva polja.');
              return;
            }
            if (password.length < 6) {
              Alert.alert('Greška', 'Lozinka mora imati najmanje 6 karaktera.');
              return;
            }
            const existing = await getRegisteredUser();
            if (existing && existing.username === trimmedUsername) {
              Alert.alert('Greška', 'Korisničko ime je već registrovano.');
              return;
            }
            const user: RegisteredUser = {
              username: trimmedUsername,
              password,
              phone: phone.trim(),
              address: address.trim(),
            };
            await saveRegisteredUser(user);
            Alert.alert('Uspeh', 'Uspešno ste se registrovali!', [
              { text: 'U redu', onPress: () => router.replace('/login') },
            ]);
          }}
        >
          <Text style={styles.submitText}>Registruj se</Text>
        </Pressable>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Imate nalog? </Text>
          <Link href="/login" style={styles.loginLink}>
            Prijavite se ovde!
          </Link>
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.blue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  closeBtn: {
    position: 'absolute',
    top: 48,
    left: 16,
    padding: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  form: {
    width: '100%',
    gap: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: '#000000',
  },
  submitButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  submitText: {
    color: theme.darkBlue,
    fontWeight: '700',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#ffffff',
  },
  loginLink: {
    color: '#ffffff',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
