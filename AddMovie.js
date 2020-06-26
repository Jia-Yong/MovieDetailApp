/**
* Name: Lai Jia Yong
* Reg. No. : 1800546
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ToastAndroid,
  Picker,
  TouchableOpacity,
} from 'react-native';
let SQLite = require('react-native-sqlite-storage');

type Props = {};
export default class AddMovie extends Component<Props> {
  static navigationOptions = ({navigation}) => ({
    title: 'Add Movie',
  });

  constructor(props) {
    super(props)

    this.state = {
     title: '',
     language: '',
     release_date: '',

    };

    this._insert = this._insert.bind(this);

    this.db = SQLite.openDatabase({name: 'moviesdb', createFromLocation : '~moviesdb.sqlite'}, this.openDb, this.errorDb);
  }


  _insert(){
   this.db.transaction((tx) => {
     tx.executeSql('INSERT INTO movies(title,language,release_date) VALUES(?,?,?)', [
       this.state.title,
       this.state.language,
       this.state.release_date,
     ]);
   });
   ToastAndroid.show('Saved successfully', ToastAndroid.SHORT);

   this.props.navigation.getParam('refresh')();
   this.props.navigation.goBack();

  }

  render() {
    return (
      <ScrollView style={styles.container}>
          <Text style={styles.label}>Movie Title: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(title) => {
              this.setState({title});
            }}
            value={this.state.title}
            placeholder='Movie Title'
            underlineColorAndroid={'transparent'}
          />


        <View style={styles.pickerContainer}>
         <Text style={styles.label}>
           {'Language: '}
         </Text>
         <Picker style={styles.picker}
           mode={'dialog'}
           selectedValue={this.state.language}
           onValueChange={
             (itemValue, itemIndex) => {
               if(itemValue !== ""){
                 this.setState({language: itemValue});
               }
             }
           }>
             <Picker.Item label="-Select Language-" value="" />
             <Picker.Item label="English" value="English" />
             <Picker.Item label="Malay" value="Malay" />
             <Picker.Item label="Mandarin" value="Mandarin" />
             <Picker.Item label="Cantonese" value="Cantonese" />
             <Picker.Item label="Japanese" value="Japanese" />
             <Picker.Item label="Korean" value="Korean" />
           </Picker>
           </View>


          <Text style={styles.label}>Release Date: </Text>
          <TextInput
            style={styles.input}
            onChangeText={(release_date) => {
              this.setState({release_date});
            }}
            value={this.state.release_date}
            placeholder='Release Date'
            keyboardType='numeric'
            underlineColorAndroid={'transparent'}
          />

          <TouchableOpacity
              style={styles.btn}
              onPress={this._insert}
            >
              <Text style={{color:'black'}}>Save</Text>
          </TouchableOpacity>

        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20
  },
  pickerContainer: {
    flexDirection: 'column',
  },
  picker: {
   margin: 10,
 },
  input: {
    fontSize: 20,
    height: 48,
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'firebrick',
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
  },
  btn:{
    backgroundColor:'firebrick',
    height:25,
    alignItems:'center',
    justifyContent:'center',
    bottom:0,
    marginTop:25,
  },

});
