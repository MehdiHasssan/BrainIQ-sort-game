import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const backgroundColors = [
  ['#6dd5ed', '#2193b0'], // Background for level 1
  ['#6dd5ed', '#2193b0'], // Background for level 2
  ['#6dd5ed', '#2193b0'], // Background for level 3
  ['#86a8e7', '#e7c586'], // Background for level 4
  ['#86a8e7', '#e7c586'], // Background for level 5
  ['#86a8e7', '#e7c586'], // Background for level 6
  ['#6dd5ed', '#2193b0'], // Background for level 7
  ['#6dd5ed', '#2193b0'], // Background for level 8
  ['#6dd5ed', '#2193b0'], // Background for level 9
  ['#7F7FD5', '#86A8E7', '#91EAE4'], // Background for level 10
  ['#7F7FD5', '#86A8E7', '#91EAE4'], // Background for level 11
  ['#7F7FD5', '#86A8E7', '#91EAE4'], // Background for level 12
  ['#86a8e7', '#d886e7', '#cfe786'], // Background for level 13
  ['#86a8e7', '#d886e7', '#cfe786'], // Background for level 14
  ['#86a8e7', '#d886e7', '#cfe786'], // Background for level 15
  ['#6d89bc', '#556a92', '#86a8e7'], // Background for level 16
  ['#6d89bc', '#556a92', '#86a8e7'], // Background for level 17
  ['#6d89bc', '#556a92', '#86a8e7'], // Background for level 18
  ['#b586e7', '#86e7d5', '#88e786'], // Background for level 19
  ['#b586e7', '#86e7d5', '#88e786'], // Background for level 20
  ['#b586e7', '#86e7d5', '#88e786'], // Background for level 21
  ['#86a8e7', '#d886e7', '#cfe786'], // Background for level 22
  ['#86a8e7', '#d886e7', '#cfe786'], // Background for level 23
  ['#86a8e7', '#d886e7', '#cfe786'], // Background for level 24
  ['#7F7FD5', '#86A8E7', '#91EAE4'], // Background for level 25
  ['#7F7FD5', '#86A8E7', '#91EAE4'], // Background for level 26
  ['#7F7FD5', '#86A8E7', '#91EAE4'], // Background for level 27
  ['#8394b3', '#86a8e7', '#859cc8'], // Background for level 28
  ['#8394b3', '#86a8e7', '#859cc8'], // Background for level 29
  ['#8394b3', '#86a8e7', '#859cc8'], // Background for level 30
  ['#8b86e7', '#86cfe7', '#8b86e7'], // Background for level 31
];

const BackgroundColor = ({ levelIndex }) => {
  const colors = backgroundColors[levelIndex % backgroundColors.length];
  return (
    <LinearGradient colors={colors} style={StyleSheet.absoluteFill}>
      <View style={StyleSheet.absoluteFill} />
    </LinearGradient>
  );
};

export default BackgroundColor;
