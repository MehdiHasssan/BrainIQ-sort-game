import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Color Match Game!</Text>
      <Button
        title="Play"
        onPress={() => navigation.navigate('Game')}
      />
      <View>
      <Button
        title="Levels"
        onPress={() => navigation.navigate('levels')}
      />
      </View>
    </View>
  );
};

export default HomeScreen;
