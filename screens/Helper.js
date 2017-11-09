import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import ChatHead from './src/ChatHead';
import SineApp from './src/AppNavigation';
import Popover from 'react-native-popover';
import { BG_COLOR } from './src/ProjectConstants';

const BALLOON_DIAMETER = 64;
const POPOVER_PADDING = 8;

var { height } = Dimensions.get('window');

class Helper extends Component
{
  balloon;
  
  state =
  {
    popoverVisible: false,
    popoverRect: { x: 0, y: 0, width: 0, height: 0 },
  }
  
  _changePopoverVisibility()
  {
    let { width } = Dimensions.get('window');
    
    if (!this.state.popoverVisible)
      this.setState({
        popoverVisible: true,
        popoverRect: { x: POPOVER_PADDING, y: POPOVER_PADDING, width: width - 2 * POPOVER_PADDING, height: 0 },
      });
    else
      this.setState({
        popoverVisible: false,
      });
  }
  
  render()
  {
    return (
      <View style={{ ...StyleSheet.absoluteFillObject, flex: 1 }}>
          <ChatHead 
            balloonPress = { this._changePopoverVisibility.bind(this) }
            ref = { chatHead => this.balloon = chatHead }
            balloonSize = { BALLOON_DIAMETER }/>
            
          <Popover
            isVisible = { this.state.popoverVisible }
            fromRect  = { this.state.popoverRect }
            placement = { 'bottom' }
            onClose   = { this._changePopoverVisibility.bind(this) }
            contentStyle = { styles.content }
            arrowStyle   = { styles.arrow }
          >
              <SineApp/>
          </Popover>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content:
  {
    flex: 1,
    padding: 6,
    backgroundColor: BG_COLOR,
    borderRadius: 8,
    width: 340,
    height: height - POPOVER_PADDING * 2 - 64,
  },
  
  arrow:
  {
    borderTopColor: BG_COLOR,
  },
});

module.exports = Helper;