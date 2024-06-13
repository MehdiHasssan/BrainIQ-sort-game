import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import levels from './Level';
import LinearGradient from 'react-native-linear-gradient';

const LevelSelectionScreen = ({navigation}) => {
  const [unlockedLevels, setUnlockedLevels] = useState(1);

  const fetchUnlockedLevel = useCallback(async () => {
    const deviceId = DeviceInfo.getUniqueId();
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

  useEffect(() => {
    fetchUnlockedLevel();
  }, [fetchUnlockedLevel]);

  return (
    <LinearGradient colors={['#6dd5ed', '#2193b0']} style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Levels</Text>
        <View style={styles.levelsContainer}>
          {levels.map((level, index) => (
            <TouchableOpacity
              style={[
                styles.levelButton,
                {backgroundColor: index < unlockedLevels ? 'green' : 'grey'},
              ]}
              key={index}
              disabled={index >= unlockedLevels}
              onPress={() => navigation.navigate('Game', {indexLevel: index})}
            >
              <Text style={styles.levelText}>{` ${index + 1}`}</Text>
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
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  levelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
  },
  levelText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LevelSelectionScreen;
