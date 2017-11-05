import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SineInitial from './screens/Initial';
import SineApp from './screens/Helper';

export default class App extends Component
{
  state =
  {
    helperActivated: false
  }

  _notification = ntf =>
  {
    let { userInteraction } = ntf;
    
    if (userInteraction == true)
      this.setState({ helperActivated: true });
  }
  
  render()
  {
    if (this.state.helperActivated)
      return <SineApp/>
    else
      return <SineInitial screenProps = {{ notificationHandler: this._notification }}/>
  }
}