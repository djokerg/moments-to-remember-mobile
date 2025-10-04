import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { Link, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';
import { useEffect } from 'react';
import {
  getRegisteredUser,
  getSessionUser,
  setSessionUser,
} from './utils/auth';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const load = async () => {
      const u = await getSessionUser();
      setIsLoggedIn(!!u);
      setChecking(false);
    };
    load();
  }, []);

  if (!checking && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  const onLogin = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      Alert.alert('Greška', 'Unesite korisničko ime i lozinku.');
      return;
    }
    const reg = await getRegisteredUser();
    if (!reg) {
      Alert.alert('Greška', 'Nema registrovanog korisnika. Registrujte se.');
      return;
    }
    if (reg.username !== trimmedUsername || reg.password !== password) {
      Alert.alert('Greška', 'Pogrešno korisničko ime ili lozinka.');
      return;
    }
    await setSessionUser(trimmedUsername);
    setIsLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.closeBtn}>
          <Ionicons name="close-outline" size={28} color="#ffffff" />
        </Pressable>
      </Link>
      <Text style={styles.title}>Prijava</Text>
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

        <Pressable style={styles.submitButton} onPress={onLogin}>
          <Text style={styles.submitText}>Prijavi se</Text>
        </Pressable>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Nemate nalog? </Text>
          <Link href="/register" style={styles.registerLink}>
            Registrujte se!
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
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    color: '#ffffff',
  },
  registerLink: {
    color: '#ffffff',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
