import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GameScreen from '../../screen/GameScreen';
import HomeScreen from '../../screen/HomeScreen';
import LevelSelectionScreen from '../LevelComponent/LevelSelectionScreen';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#34325c', // Ensure the header is visible
      },
      headerTintColor: '#fff', // Ensures text is visible
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{
          headerShown:false,
        }}
      />
      <Stack.Screen name="levels" component={LevelSelectionScreen} options={{headerShown:false}} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
