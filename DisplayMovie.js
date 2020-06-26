/**
* Name: Lai Jia Yong
* Reg. No. : 1800546
*/

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
} from 'react-native';
let SQLite = require('react-native-sqlite-storage');

type Props = {};
export default class DisplayMovie extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('headerTitle')
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      id: this.props.navigation.getParam('id'),
      movie: null,
    };

    this._query = this._query.bind(this);

    this.db = SQLite.openDatabase({name: 'moviesdb', createFromLocation : '~moviesdb.sqlite'}, this.openDb, this.errorDb);
  }

  componentDidMount() {
     this._query();
  }

  _query() {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM movies WHERE id = ?', [this.state.id], (tx, results) => {
        if(results.rows.length) {
          this.setState({
            movie: results.rows.item(0),
          })
        }
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
    let movie = this.state.movie;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.label}>Movie Title: </Text>
          <TextInput style={styles.output}
            value={movie ? movie.title : ''}
            orientation={'vertical'}
            editable={false}
          />
          <Text style={styles.label}>Language: </Text>
          <TextInput style={styles.output}
            value={movie ? movie.language : ''}
            orientation={'vertical'}
            editable={false}
          />
          <Text style={styles.label}>Release Date: </Text>
          <TextInput style={styles.output}
            value={movie ? movie.release_date.toString() : ''}
            orientation={'vertical'}
            editable={false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  output: {
    fontSize: 24,
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
  },
});
