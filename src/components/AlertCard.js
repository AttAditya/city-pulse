import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AlertCard = ({ alert }) => {
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return '🚨';
      case 'medium':
        return '⚠️';
      case 'low':
        return '⚡';
      default:
        return 'ℹ️';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'weather':
        return '🌧️';
      case 'traffic':
        return '🚗';
      case 'health':
        return '😷';
      case 'safety':
        return '🛡️';
      case 'utility':
        return '🔧';
      default:
        return '📢';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <View style={[styles.card, { borderLeftColor: alert.color }]}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.typeIcon}>{getTypeIcon(alert.type)}</Text>
          <Text style={styles.severityIcon}>{getSeverityIcon(alert.severity)}</Text>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: alert.color }]}>
          <Text style={styles.severityText}>{alert.severity.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.title}>{alert.title}</Text>
      <Text style={styles.description}>{alert.description}</Text>
      <Text style={styles.timestamp}>{formatTimestamp(alert.timestamp)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  severityIcon: {
    fontSize: 20,
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#a0a0a0',
    lineHeight: 20,
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
});

export default AlertCard;
