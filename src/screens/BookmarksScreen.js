import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getBookmarks, removeBookmark } from '../utils/storage';

const BookmarksScreen = ({ navigation }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  const loadBookmarks = async () => {
    setLoading(true);
    const savedBookmarks = await getBookmarks();
    setBookmarks(savedBookmarks);
    setLoading(false);
  };

  const handleRemoveBookmark = (articleUrl) => {
    Alert.alert(
      'Remove Bookmark',
      'Are you sure you want to remove this bookmark?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            await removeBookmark(articleUrl);
            loadBookmarks();
          },
        },
      ]
    );
  };

  const handleArticlePress = (article) => {
    navigation.navigate('NewsWebView', { article });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderBookmarkItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bookmarkCard}
      onPress={() => handleArticlePress(item)}
    >
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.bookmarkImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.bookmarkContent}>
        <Text style={styles.bookmarkTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {item.description && (
          <Text style={styles.bookmarkDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <View style={styles.bookmarkFooter}>
          <Text style={styles.bookmarkDate}>{formatDate(item.date)}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveBookmark(item.url)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bookmarks</Text>
        <View style={styles.placeholder} />
      </View>

      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔖</Text>
          <Text style={styles.emptyText}>No bookmarks yet</Text>
          <Text style={styles.emptySubtext}>
            Articles you bookmark will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={renderBookmarkItem}
          keyExtractor={(item, index) => item.url + index}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
  },
  backButton: {
    fontSize: 28,
    color: '#ffffff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 28,
  },
  listContainer: {
    padding: 15,
  },
  bookmarkCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bookmarkImage: {
    width: '100%',
    height: 150,
  },
  bookmarkContent: {
    padding: 15,
  },
  bookmarkTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  bookmarkDescription: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 10,
    lineHeight: 20,
  },
  bookmarkFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookmarkDate: {
    fontSize: 12,
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#a0a0a0',
    textAlign: 'center',
  },
});

export default BookmarksScreen;
