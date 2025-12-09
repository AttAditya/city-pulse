import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const NewsCard = ({ article, onPress, onBookmark }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {article.image && (
        <Image
          source={{ uri: article.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {article.title}
        </Text>
        {article.description && (
          <Text style={styles.description} numberOfLines={2}>
            {article.description}
          </Text>
        )}
        <View style={styles.footer}>
          <Text style={styles.date}>
            {article.source} • {formatDate(article.date)}
          </Text>
          <TouchableOpacity style={styles.bookmarkButton} onPress={onBookmark}>
            <Text style={styles.bookmarkIcon}>🔖</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
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
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 10,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  bookmarkButton: {
    padding: 5,
  },
  bookmarkIcon: {
    fontSize: 20,
  },
});

export default NewsCard;
