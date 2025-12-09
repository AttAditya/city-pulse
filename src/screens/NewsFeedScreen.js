import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { fetchCityNews } from '../utils/api';
import { saveBookmark, isBookmarked } from '../utils/storage';

const NewsFeedScreen = ({ route, navigation }) => {
  const { city } = route.params;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNews();
  }, [city]);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const articles = await fetchCityNews(city);
      const formattedNews = articles.map((article, index) => ({
        id: index.toString(),
        title: article.title,
        description: article.description,
        image: article.urlToImage,
        url: article.url,
        date: article.publishedAt,
        source: article.source?.name,
      }));
      setNews(formattedNews);
    } catch (err) {
      setError('Failed to load news. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNews();
    setRefreshing(false);
  }, [city]);

  const handleBookmark = async (article) => {
    const saved = await saveBookmark(article);
    if (saved) {
      alert('Article bookmarked!');
    } else {
      alert('Article already bookmarked');
    }
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

  const renderNewsItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() => handleArticlePress(item)}
    >
      {item.image && (
        <Image
          source={{ uri: item.image }}
          style={styles.newsImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        {item.description && (
          <Text style={styles.newsDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <View style={styles.newsFooter}>
          <Text style={styles.newsDate}>
            {item.source} • {formatDate(item.date)}
          </Text>
          <TouchableOpacity
            style={styles.bookmarkButton}
            onPress={() => handleBookmark(item)}
          >
            <Text style={styles.bookmarkIcon}>🔖</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadNews}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{city} News</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('Bookmarks')}
          >
            <Text style={styles.headerButtonText}>🔖</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('EmergencyAlerts')}
          >
            <Text style={styles.headerButtonText}>⚠️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#e94560"
            colors={['#e94560']}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No news available for {city}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  headerButtonText: {
    fontSize: 24,
  },
  listContainer: {
    padding: 15,
  },
  newsCard: {
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
  newsImage: {
    width: '100%',
    height: 180,
  },
  newsContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  newsDescription: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 10,
    lineHeight: 20,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsDate: {
    fontSize: 12,
    color: '#666',
  },
  bookmarkButton: {
    padding: 5,
  },
  bookmarkIcon: {
    fontSize: 20,
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: '#e94560',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    color: '#a0a0a0',
    fontSize: 16,
  },
});

export default NewsFeedScreen;
