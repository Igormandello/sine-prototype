import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SineInitial from './screens/Initial';
import Helper from './screens/Helper';

class App extends Component
{
  state =
  {
    helperActivated: false
  }

  _switch = () => this.setState({ helperActivated: !this.state.helperActivated });
  
  render()
  {  
    return (
      <View style = {{ flex: 1 }}>
        <SineInitial screenProps = {{ switchHandler: this._switch }}/>
        { this.state.helperActivated && <Helper/> }
      </View>
    );
  }
}

module.exports = App;