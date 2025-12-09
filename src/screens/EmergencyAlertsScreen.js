import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { emergencyAlerts } from '../data/emergencyAlerts';

const EmergencyAlertsScreen = ({ navigation }) => {
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

  const renderAlertItem = ({ item }) => (
    <View style={[styles.alertCard, { borderLeftColor: item.color }]}>
      <View style={styles.alertHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.typeIcon}>{getTypeIcon(item.type)}</Text>
          <Text style={styles.severityIcon}>{getSeverityIcon(item.severity)}</Text>
        </View>
        <View style={[styles.severityBadge, { backgroundColor: item.color }]}>
          <Text style={styles.severityText}>{item.severity.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertDescription}>{item.description}</Text>
      <Text style={styles.alertTimestamp}>{formatTimestamp(item.timestamp)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Alerts</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.warningBanner}>
        <Text style={styles.warningIcon}>🔔</Text>
        <Text style={styles.warningText}>
          Stay informed about important alerts in your area
        </Text>
      </View>

      <FlatList
        data={emergencyAlerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 28,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#a0a0a0',
  },
  listContainer: {
    padding: 15,
  },
  alertCard: {
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
  alertHeader: {
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
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  alertDescription: {
    fontSize: 14,
    color: '#a0a0a0',
    lineHeight: 20,
    marginBottom: 10,
  },
  alertTimestamp: {
    fontSize: 12,
    color: '#666',
  },
});

export default EmergencyAlertsScreen;
