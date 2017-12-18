import React, { Component } from 'react';
import { Image, Text, View, StyleSheet, FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
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
      pokemon: []
    };
  }

  componentDidMount() {
    this.getPokemon();
    this.maxPokemon();
  }

  onRefresh() {
    this.setState({ 
      isFetching: true,
    }, 
    function() { this.fetchData(); this.getPokemon(); });
  }

  fetchData() {
    this.setState({
      isFetching: false,
      data: Pokemon
    }); 
  }

  maxPokemon() {
    AsyncStorage.getItem('max', (err, result) => {
      if (!err && result != null) {
        this.setState({
          max: parseInt(result)
        });
      } else {
        this.setState({
          max: 151
        });
      }
    });
  }

  getPokemon() {
    AsyncStorage.getItem('pokemon', (err, result) => {
      if (!err && result != null) {
        this.setState({
          pokemon: JSON.parse(result)
        });
      } else {
        this.setState({
          pokemon: []
        });
      }
    });
  }

  renderItem({ item, index }) {
    if(item.id <= this.state.max) {
      let hasPokemon = this.state.pokemon.includes(item.id);
      if(!hasPokemon) {
        return <View style={{
          flex: 1,
          margin: 1,
          width: 300,
          height: 100,
          flexDirection: 'row',
          backgroundColor: '#EFF0F0',
          }}>
          <Image source={require("../assets/pokemonapi/sprites/pokemon/0.png")}></Image>
          <View style={styles.details}>
            <Text style={styles.text}>#{item.number} ????</Text>
            <Text style={styles.text}>Height: ????</Text>
            <Text style={styles.text}>Weight: ????</Text>
          </View>
        </View>
      } else {
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
            <Text style={styles.text}>#{item.number} {item.name}</Text>
            <Text style={styles.text}>Height: {item.height}</Text>
            <Text style={styles.text}>Weight: {item.weight}</Text>
          </View>
        </View>
      }
    }
  } 

  render () {
    return (
      <View>
      <Text>Pokemon: {this.state.max}</Text>
      <FlatList
        contentContainerStyle={styles.list}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching}
        data={this.state.data}
        numColumns={1}
        renderItem={this.renderItem.bind(this)}
      />
      </View>
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
    justifyContent: 'center'
  },
  text: {
    color: '#272729'
  }
});

