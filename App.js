/**
* Name: Lai Jia Yong
* Reg. No. : 1800546
*/

import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from './HomeScreen';
import AddMovie from './AddMovie';
import DisplayMovie from './DisplayMovie';

export default createStackNavigator ({
  Home: {
    screen: HomeScreen,
  },
  Add: {
    screen: AddMovie,
  },
  Display: {
    screen: DisplayMovie,
  },

}, {

  initialRouteName: 'Home',

  navigationOptions: {

    headerStyle: {
      backgroundColor: 'firebrick',
    },

    headerTintColor: 'black',

    headerTitleStyle: {
      fontWeight: 'bold',
    },

  },


});
