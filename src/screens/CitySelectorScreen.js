import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { cities } from '../data/emergencyAlerts';
import { saveSelectedCity, getSelectedCity } from '../utils/storage';

const CitySelectorScreen = ({ navigation }) => {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadSavedCity();
  }, []);

  const loadSavedCity = async () => {
    const city = await getSelectedCity();
    setSelectedCity(city);
  };

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    await saveSelectedCity(city);
    setModalVisible(false);
  };

  const handleContinue = () => {
    navigation.navigate('NewsFeed', { city: selectedCity });
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.cityItem,
        item === selectedCity && styles.selectedCityItem,
      ]}
      onPress={() => handleCitySelect(item)}
    >
      <Text
        style={[
          styles.cityItemText,
          item === selectedCity && styles.selectedCityItemText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🏙️ City Pulse</Text>
        <Text style={styles.subtitle}>Select Your City</Text>

        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectorButtonText}>{selectedCity}</Text>
          <Text style={styles.selectorArrow}>▼</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select City</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={cities}
                renderItem={renderCityItem}
                keyExtractor={(item) => item}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#a0a0a0',
    marginBottom: 40,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16213e',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    width: '100%',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  selectorButtonText: {
    fontSize: 18,
    color: '#ffffff',
  },
  selectorArrow: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  continueButton: {
    backgroundColor: '#e94560',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 25,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#16213e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    fontSize: 24,
    color: '#a0a0a0',
  },
  cityItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
  },
  selectedCityItem: {
    backgroundColor: '#0f3460',
  },
  cityItemText: {
    fontSize: 16,
    color: '#ffffff',
  },
  selectedCityItemText: {
    color: '#e94560',
    fontWeight: 'bold',
  },
});

export default CitySelectorScreen;
