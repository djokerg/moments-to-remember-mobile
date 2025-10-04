import { useLocalSearchParams, Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { theme } from '../../../../theme';
import { Ionicons } from '@expo/vector-icons';
import {
  addComment,
  getComments,
  OfferComment,
} from '../../../../utils/comments';
import { getSessionUser } from '../../../../utils/auth';

export default function OfferCommentsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [comments, setComments] = useState<OfferComment[]>([]);
  const [sessionUser, setSessionUser] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setComments(await getComments(id));
    };
    load();
  }, [id]);

  useEffect(() => {
    const loadUser = async () => setSessionUser(await getSessionUser());
    loadUser();
  }, []);

  const onSubmit = async () => {
    if (!id) return;
    if (!sessionUser) {
      Alert.alert(
        'Greška',
        'Morate biti prijavljeni da biste ostavili komentar.',
      );
      return;
    }
    if (!comment.trim() || rating < 1 || rating > 5) {
      Alert.alert(
        'Greška',
        'Unesite komentar i izaberite ocenu (1-5 zvezdica).',
      );
      return;
    }
    const next = await addComment(id, {
      username: sessionUser,
      rating,
      comment: comment.trim(),
    });
    setComments(next);
    setRating(0);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Link href={{ pathname: '/home/offers/[id]', params: { id } }} asChild>
        <Pressable style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#ffffff" />
        </Pressable>
      </Link>
      <Text style={styles.title}>Komentari</Text>

      <View style={styles.form}>
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Pressable key={i} onPress={() => setRating(i + 1)}>
              <Ionicons
                name={i < rating ? 'star' : 'star-outline'}
                size={24}
                color="#FFD700"
              />
            </Pressable>
          ))}
        </View>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Komentar"
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <Pressable style={styles.submitBtn} onPress={onSubmit}>
          <Text style={styles.submitText}>Pošalji</Text>
        </Pressable>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(_, idx) => String(idx)}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <Text style={styles.commentTitle}>{item.username}</Text>
            <View style={styles.starsRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < item.rating ? 'star' : 'star-outline'}
                  size={18}
                  color="#FFD700"
                />
              ))}
            </View>
            <Text style={styles.commentBody}>{item.comment}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.subtitle}>Još uvek nema komentara.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.lightBlue,
    paddingTop: 16,
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: theme.darkBlue,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  title: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  subtitle: {
    color: '#ffffff',
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  submitBtn: {
    backgroundColor: theme.darkBlue,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  commentCard: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  commentTitle: {
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: 4,
  },
  commentBody: {
    color: '#ffffff',
  },
});
