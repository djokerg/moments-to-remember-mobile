import { StatusBar } from 'expo-status-bar';
import { Link, Redirect } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { useEffect, useState } from 'react';
import { getSessionUser } from './utils/auth';

export default function WelcomeScreen() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const load = async () => {
      const u = await getSessionUser();
      setIsLoggedIn(!!u);
      setSessionChecked(true);
    };
    load();
  }, []);

  if (sessionChecked && isLoggedIn) {
    return <Redirect href="/home" />;
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Trenuci za pamćenje</Text>
      <View style={styles.buttons}>
        <Link href="/login" style={[styles.button, styles.primary]}>
          Prijavi se
        </Link>
        <Link href="/register" style={[styles.button, styles.secondary]}>
          Registruj se
        </Link>
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
  logo: {
    width: 140,
    height: 140,
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#ffffff',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttons: {
    width: '100%',
    gap: 12,
  },
  button: {
    textAlign: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    overflow: 'hidden',
    fontWeight: '600',
  },
  primary: {
    backgroundColor: '#ffffff',
    color: theme.darkBlue,
  },
  secondary: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    color: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
});
