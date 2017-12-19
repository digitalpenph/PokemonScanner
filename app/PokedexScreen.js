import React, { PureComponent } from 'react';
import { Alert, Image, Text, View, StyleSheet, FlatList } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Constants } from 'expo';

import { Pokemon } from '../data/pokemon.js';

export default class App extends PureComponent {
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

  componentDidFocus() {
    Alert.alert("asdasd");
  }

  componentDidMount() {
    this.getPokemon();
    this.maxPokemon();
  }

  onRefresh() {
    this.getPokemon(); 
    let pokemonCount = parseInt(this.state.pokemon.length);
    if(pokemonCount >= 151) {
      AsyncStorage.setItem('max', '251'); 
    } else if(pokemonCount >= 251) {
      AsyncStorage.setItem('max', '386'); 
    } else if(pokemonCount >= 386) {
      AsyncStorage.setItem('max', '493'); 
    } else if(pokemonCount >= 493) {
      AsyncStorage.setItem('max', '649'); 
    } else if(pokemonCount >= 649) {
      AsyncStorage.setItem('max', '721'); 
    } else if(pokemonCount >= 721) {
      AsyncStorage.setItem('max', '807'); 
    }
    this.maxPokemon();
    this.setState({ 
      isFetching: true,
    }, 
    function() {
      this.fetchData(); 
    });
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

  _keyExtractor = (item, index) => item.id;

  render () {
    return (
      <View style={styles.container}>
      <Text style={styles.heading}>Pokemon: {this.state.pokemon.length}/{this.state.max}</Text>
      <FlatList
        contentContainerStyle={styles.list}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching}
        data={this.state.data}
        keyExtractor={this._keyExtractor}
        initialNumToRender={this.state.max}
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
  container: {    
    paddingTop: Constants.statusBarHeight
  },
  heading: {
    color: '#272729',
    margin : 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  details: {
    margin : 2,
    justifyContent: 'center'
  },
  text: {
    color: '#272729'
  }
});

