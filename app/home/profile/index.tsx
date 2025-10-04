import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { Link, Redirect } from 'expo-router';
import {
  getRegisteredUser,
  saveRegisteredUser,
  getSessionUser,
} from '../../../utils/auth';
import { theme } from '../../../theme';

export default function ProfileScreen() {
  const [checking, setChecking] = useState(true);
  const [sessionUser, setSessionUser] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const load = async () => {
      const logged = await getSessionUser();
      setSessionUser(logged);
      const reg = await getRegisteredUser();
      if (reg) {
        setUsername(reg.username);
        setPhone(reg.phone);
        setAddress(reg.address);
      }
      setChecking(false);
    };
    load();
  }, []);

  if (!checking && !sessionUser) {
    return <Redirect href="/" />;
  }

  const onSave = async () => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !phone.trim() || !address.trim()) {
      Alert.alert('Greška', 'Popunite sva polja.');
      return;
    }
    const reg = await getRegisteredUser();
    if (!reg) return;
    await saveRegisteredUser({
      ...reg,
      username: trimmedUsername,
      phone: phone.trim(),
      address: address.trim(),
    });
    Alert.alert('Uspeh', 'Podaci su ažurirani.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Izmenite podatke na vašem profilu</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Korisničko ime"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefon"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Adresa"
          value={address}
          onChangeText={setAddress}
        />
        <Pressable style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveText}>Izmeni</Text>
        </Pressable>
        <Link href="/home/profile/change-password" style={styles.changePwdLink}>
          Promenite lozinku!
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  saveBtn: {
    backgroundColor: theme.darkBlue,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  changePwdLink: {
    marginTop: 12,
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
