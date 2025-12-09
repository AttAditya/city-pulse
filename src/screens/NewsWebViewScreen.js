import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Share,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { saveBookmark } from '../utils/storage';

const NewsWebViewScreen = ({ route, navigation }) => {
  const { article } = route.params;
  const [loading, setLoading] = useState(true);

  const handleBookmark = async () => {
    const saved = await saveBookmark(article);
    if (saved) {
      alert('Article bookmarked!');
    } else {
      alert('Article already bookmarked');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this article: ${article.title}\n${article.url}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {article.title}
        </Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={handleBookmark}>
            <Text style={styles.headerButtonText}>🔖</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
            <Text style={styles.headerButtonText}>📤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e94560" />
        </View>
      )}

      <WebView
        source={{ uri: article.url }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={styles.webview}
      />
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
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginHorizontal: 15,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  headerButtonText: {
    fontSize: 22,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default NewsWebViewScreen;
