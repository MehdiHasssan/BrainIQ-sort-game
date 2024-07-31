import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { useFocusEffect } from '@react-navigation/native';
import levels from './Level';
import LinearGradient from 'react-native-linear-gradient';

const LevelSelectionScreen = ({ navigation }) => {
  const [unlockedLevels, setUnlockedLevels] = useState(1);

  const fetchUnlockedLevel = useCallback(async () => {
    const deviceId = await DeviceInfo.getUniqueId();
    const unlockedLevelKey = `unlocked_level_${deviceId}`;
    const storedUnlockedLevel = await AsyncStorage.getItem(unlockedLevelKey);
    if (storedUnlockedLevel !== null) {
      const parsedLevel = parseInt(storedUnlockedLevel, 10);
      setUnlockedLevels(parsedLevel);
    } else {
      // Assuming the first level should always be unlocked if no data is found
      await AsyncStorage.setItem(unlockedLevelKey, '1');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUnlockedLevel();
    }, [fetchUnlockedLevel])
  );

  return (
    <LinearGradient colors={['#2c3e50', '#4ca1af']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Levels</Text>
        <View style={styles.levelsContainer}>
          {levels.map((level, index) => (
            <TouchableOpacity
              style={[
                styles.levelButton,
                {
                  backgroundColor: index < unlockedLevels ? '#1abc9c' : '#95a5a6',
                },
                index < unlockedLevels && styles.unlockedLevelButton,
              ]}
              key={index}
              disabled={index >= unlockedLevels}
              onPress={() => navigation.navigate('Game', { indexLevel: index })}
            >
              <Text style={styles.levelText}>{`${index + 1}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 28,
    color: '#ecf0f1',
    fontWeight: 'bold',
    marginBottom: 30,
    textShadowColor: '#2c3e50',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  levelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  unlockedLevelButton: {
    backgroundColor: '#1abc9c',
  },
  levelText: {
    color: '#ecf0f1',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#2c3e50',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default LevelSelectionScreen;
