import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from "@expo/vector-icons"; // 5.2.0
import { TabNavigator } from 'react-navigation'

import PokedexScreen from './app/PokedexScreen';
import ScanScreen from './app/ScanScreen';

export const Root = TabNavigator({
  Main2: { screen: PokedexScreen },
  Main1: { screen: ScanScreen },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return <Root />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  icon: {
    width: 26,
    height: 26,
  },
});

