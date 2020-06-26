/**
* Name: Lai Jia Yong
* Reg. No. : 1800546
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native';
let SQLite = require('react-native-sqlite-storage');

type Props = {};
export default class HomeScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => ({
    title: 'Movie Application',
  });

  constructor(props) {
    super(props)

    this.state = {
      movies:[],
    };

    this._query = this._query.bind(this);

    this.db = SQLite.openDatabase({name: 'moviesdb', createFromLocation : '~moviesdb.sqlite'}, this.openDb, this.errorDb);
  }

  componentDidMount() {
     this._query();
   }

  _query() {
     this.db.transaction((tx) => {
 tx.executeSql('SELECT * FROM movies ORDER BY release_date DESC', [], (tx, results) => {
           this.setState({
             movies: results.rows.raw(),
           })
       })
     });
   }

   openDb() {
      console.log('Database opened');
  }

  errorDb(err) {
      console.log('SQL Error: ' + err);
  }

  render() {

    return (

      <View style={styles.container}>
      <Image style={{height: '100%', width: '100%', position:'absolute'}} source={{uri: 'https://i.imgur.com/yE6bfDp.png'}}/>
      <View style={styles.innerFrame}>
        <FlatList
          data={ this.state.movies }
          extraData={this.state}
          showsVerticalScrollIndicator={ true }
          renderItem={({item}) =>
            <TouchableHighlight
              underlayColor={'#cccccc'}
              onPress={ () => {
                this.props.navigation.navigate('Display', {
                                  id: item.id,
                                  headerTitle: item.title,
                                  refresh: this._query,
                                })
              }}
            >
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{ item.title }</Text>
                <Text style={styles.itemLanguage}>{ item.language }</Text>
              </View>
            </TouchableHighlight>
          }
          keyExtractor={(item) => {item.id.toString()}}
        />

        <TouchableOpacity
            style={styles.btn}
            onPress={ () => {
              this.props.navigation.navigate('Add',{
                refresh: this._query,
              })
            }}
          >
            <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth: 1,
  },
  itemTitle: {
    color:'white',
    fontSize: 21,
    fontWeight: 'bold',
  },
  itemLanguage: {
    color:'white',
    fontSize: 18,
  },
  btn:{
    position:'absolute',
    width:50,
    height:50,
    backgroundColor:'firebrick',
    borderRadius:50,
    bottom:10,
    right:10,
    alignItems:'center',
    justifyContent:'center'
  },
  plus:{
    color:'black',
    fontSize:25
  },
  innerFrame:{
    flex:1,
    backgroundColor:'rgba(0,0,0,0.5)'
  }
});
