import React, { Component } from 'react';
import { StyleSheet, View, Image, Animated, Dimensions, TouchableOpacity } from 'react-native';
import Interactable from 'react-native-interactable';

const widthFactor = Dimensions.get('window').width / 375;
const heightFactor = (Dimensions.get('window').height - 75) / 667;

class ChatHead extends Component 
{
  constructor(props) 
  {
    super(props);
    
    this._deltaX = new Animated.Value(0);
    this._deltaY = new Animated.Value(0);
    this._faceScale = new Animated.Value(1);
    
    this._balloonSize = props.balloonSize;
    this._balloonPress = props.balloonPress.bind(this);
  }
  
  onStopInteraction(event, scaleValue) 
  {
    const x = event.nativeEvent.x;
    const y = event.nativeEvent.y;
    if (x > -10 && x < 10 && y < 210*heightFactor && y > 190*heightFactor) {
      Animated.timing(scaleValue, {toValue: 0, duration: 300}).start();
    }
  }
  
  render() 
  {
    return (
      <View style = { styles.frame } pointerEvents='box-none'>
        <Interactable.View
          snapPoints = 
          {
            [
              {x: -140*widthFactor, y: 0}, {x: -140*widthFactor, y: -270*heightFactor}, {x: -140*widthFactor, y: 270*heightFactor},
              {x:  140*widthFactor, y: 0}, {x:  140*widthFactor, y: -270*heightFactor}, {x:  140*widthFactor, y: 270*heightFactor}
            ]
          }
          dragWithSpring = {{ tension: 1000, damping: 0.5 }}
          onStop = {(event) => this.onStopInteraction(event, this._faceScale)}
          animatedValueX = { this._deltaX }
          animatedValueY = { this._deltaY }
          initialPosition = {{ x: 140*widthFactor, y: -270*heightFactor }}>
          <TouchableOpacity onPress = { this._balloonPress }>  
            <Image 
              style = {{ width: this._balloonSize, height: this._balloonSize, borderRadius: 40, }} 
              source = { require('../../assets/chatHead.png') }/>
          </TouchableOpacity>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  frame:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
});

module.exports = ChatHead;