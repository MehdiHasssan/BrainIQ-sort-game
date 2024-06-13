import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/component/Navigation/StackNavigation';
import RNBootSplash from "react-native-bootsplash";

const App = () => {

  React.useEffect(() => {
    RNBootSplash.hide({ fade: true }); // Hide the splash screen
  }, []);

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})