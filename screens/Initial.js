import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ActivateHelp from './src/ActivateHelp';
import HowItWorks from './src/HowItWorks';

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