import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.13
import Steps from './Steps';
import FunctionList from './FunctionList';

const SineApp = StackNavigator(
  {
    Index: {
      screen: FunctionList,
      header: null,
      navigationOptions: {
        header: null,
      },
    },
    Tutorial: {
      screen: Steps,
    },
  },
  { headerMode: 'screen' }
);

module.exports = SineApp;