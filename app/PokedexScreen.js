import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, FlatList } from 'react-native';
import { Constants } from 'expo';

import { Pokemon } from '../data/pokemon.js';

export default class App extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Pokedex',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../assets/icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),  
  };
 
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: Pokemon,
    };
  }

  onRefresh() {
    this.setState({ 
      isFetching: true,
    }, 
    function() { this.fetchData() });
  }

  fetchData() {
    this.setState({
      isFetching: false,
      data: Pokemon
    }); 
  }

  renderItem({ item, index }) {
    return <View style={{
      flex: 1,
      margin: 1,
      width: 300,
      height: 100,
      flexDirection: 'row',
      backgroundColor: '#EFF0F0',
      }}>
        <Image source={item.ThumbnailImage}></Image>
        <View style={styles.details}>
          <Text style={styles.text}>{item.name} {item.number}</Text>
          <Text style={styles.text}>Height: {item.height}</Text>
          <Text style={styles.text}>Weight: {item.weight}</Text>
        </View>
      </View>
    }
    
    render () {
    return (
      <FlatList
        contentContainerStyle={styles.list}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching}
        data={this.state.data}
        numColumns={1}
        renderItem={this.renderItem.bind(this)}
      />
    );
    }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: Constants.statusBarHeight,
  },
  details: {
    margin : 2,
    alignItems: 'center'
  },
  text: {
    color: '#272729'
  }
});

