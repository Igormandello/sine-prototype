import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ChatHead from './src/ChatHead';
import Popover, { PopoverTouchable } from 'react-native-modal-popover';

class Helper extends Component
{
  render()
  {
    return (
      <View style={styles.app}>
        <PopoverTouchable onPopoverDisplayed={() => console.log('Popover displayed!')}>
          <TouchableOpacity onPress={()=> { console.log('does not work'); }}>
            <Text> Oi </Text>
          </TouchableOpacity>
          <Popover
            contentStyle={styles.content}
            arrowStyle={styles.arrow}
          >
            <Text>Hello from inside popover!</Text>
          </Popover>
        </PopoverTouchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  content: {
    padding: 16,
    backgroundColor: 'pink',
    borderRadius: 8,
  },
  arrow: {
    borderTopColor: 'pink',
  },
});

module.exports = Helper;