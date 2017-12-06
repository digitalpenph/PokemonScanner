import React, { Component } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet, Alert } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';

import { Pokemon } from '../data/pokemon.js';

export default class App extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Scan Pokemon',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),  
  };

  state = {
    hasCameraPermission: null,
    id: -1
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    let id = data['data'].substring(0, 3);
    var reg = new RegExp('^[0-9]+$');
    if(reg.test(id)) {
      this.setState({
        id: this.generateRandomNumber(parseInt(id)),
      });
    } else {
      Alert.alert("You got nothing.");
    }
  };

  generateRandomNumber=(max)=> {
    return Math.floor(Math.random() * max);
  }

  reScan = () => {
    this.setState({
      id: -1
    })
  }

  render() {
    if(this.state.id >= 0) {
      let pokemon = Pokemon[this.state.id]['name'];
      let sprite = Pokemon[this.state.id]['ThumbnailImage'];
      return (
        <View style={styles.container}>
          <Image
            style={{width: 200, height: 200}}
            source={sprite}
          />
          <Text style={styles.paragraph}>{pokemon}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={this.reScan}
          >
            <Text>Get Pokemon</Text>
          </TouchableOpacity>
        </View>
      ); 
    }

    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 300, width: 300 }}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#EFF0F0',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#272729'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#F9001A',
    padding: 10,
    color: '#272729'
  },
});

