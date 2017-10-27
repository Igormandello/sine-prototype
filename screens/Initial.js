import { StackNavigator } from 'react-navigation';
import HowItWorks from '../src/HowItWorks';
import ActivateHelp from '../src/ActivateHelp';

const SineInitial = StackNavigator(
{
  MainScreen: 
  {
    screen: ActivateHelp,
    header: null,
    navigationOptions: 
    {
      header: null
    },
  },
  Tutorial: 
  {
    screen: HowItWorks,
  },
}, { headerMode: 'screen' },);

export default SineInitial;