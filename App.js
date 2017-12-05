import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from "@expo/vector-icons"; // 5.2.0
import { TabNavigator, StackNavigator } from 'react-navigation'

import { POKEMON } from './data/pokemon.js';

import ScanScreen from './app/ScanScreen';

class App extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'WEH',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./assets/icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),	
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => {this.props.navigation.navigate('Test', {id: Math.random()})}}>
          <Text>this.pokemon.</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class Test extends Component {
  static navigationOptions = {
    header: null
  };
  componentWillMount() {
    console.log('mount :' + this.props.navigation.state.params.id )
  }
  componentWillUnmount() {
    console.log('unmount :' + this.props.navigation.state.params.id )
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => {this.props.navigation.goBack()}}>
          <Text>{this.props.navigation.state.params.id}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const Main = StackNavigator({
  App: {
    screen: App,
  },
  Test: {
    screen: Test,
  },
})

const Root = TabNavigator({
  Main2: {
    screen: Main,
  },
  Main1: { screen: ScanScreen, },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});


export default Root

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

