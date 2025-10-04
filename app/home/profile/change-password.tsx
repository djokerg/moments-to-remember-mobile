import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { Link, Redirect, useRouter } from 'expo-router';
import {
  getRegisteredUser,
  saveRegisteredUser,
  getSessionUser,
} from '../../../utils/auth';
import { theme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

export default function ChangePasswordScreen() {
  const [checking, setChecking] = useState(true);
  const [sessionUser, setSessionUser] = useState<string | null>(null);
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const u = await getSessionUser();
      setSessionUser(u);
      setChecking(false);
    };
    load();
  }, []);

  if (!checking && !sessionUser) {
    return <Redirect href="/" />;
  }

  const onSubmit = async () => {
    if (!oldPwd || !newPwd || !repeatPwd) {
      Alert.alert('Greška', 'Popunite sva polja.');
      return;
    }
    if (newPwd.length < 6) {
      Alert.alert('Greška', 'Nova lozinka mora imati najmanje 6 karaktera.');
      return;
    }
    if (newPwd !== repeatPwd) {
      Alert.alert('Greška', 'Nove lozinke se ne poklapaju.');
      return;
    }
    const reg = await getRegisteredUser();
    if (!reg) return;
    if (reg.password !== oldPwd) {
      Alert.alert('Greška', 'Stara lozinka nije ispravna.');
      return;
    }
    await saveRegisteredUser({ ...reg, password: newPwd });
    Alert.alert('Uspeh', 'Lozinka je promenjena.', [
      { text: 'U redu', onPress: () => router.back() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Link href="/home/profile" asChild>
        <Pressable style={styles.closeBtn}>
          <Ionicons name="close-outline" size={28} color="#ffffff" />
        </Pressable>
      </Link>
      <Text style={styles.title}>Promena lozinke</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Stara lozinka"
          value={oldPwd}
          onChangeText={setOldPwd}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Nova lozinka"
          value={newPwd}
          onChangeText={setNewPwd}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Ponovite novu lozinku"
          value={repeatPwd}
          onChangeText={setRepeatPwd}
          secureTextEntry
        />
        <Pressable style={styles.saveBtn} onPress={onSubmit}>
          <Text style={styles.saveText}>Sačuvaj</Text>
        </Pressable>
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
  closeBtn: {
    position: 'absolute',
    top: 24,
    left: 16,
    padding: 8,
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
});
