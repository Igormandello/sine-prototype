import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Constants } from 'expo';
import { FONT_SIZE, BODY_FONT_SIZE, BG_COLOR, TEXT_COLOR, NAVIGATOR_COLOR } from './ProjectConstants'

export default class HowItWorks extends Component 
{
  static navigationOptions = 
  {
    title: 'Como funciona',
    headerStyle: 
    {
      backgroundColor: NAVIGATOR_COLOR,
      marginTop: Constants.statusBarHeight,
    },
    headerTintColor: 'white',
  }
  
  render() 
  {
    return (
      <View style={ styles.container }>
        <Text style = { styles.helpText }> 
            In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor.
        </Text>
          
        <View style = { styles.bannerContainer }>
          <Image
          source = {{ uri:'http://i0.kym-cdn.com/entries/icons/mobile/000/016/546/hidethepainharold.jpg' }}
          style = { styles.banner }
          />
        </View>
          
        <Text style = { styles.helpText }> 
          In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({  
  container:
  {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 35,
    paddingTop: 5,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: BG_COLOR,
  },
  
  bannerContainer: 
  {
    flex : 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  
  helpText: 
  {
    textAlign: 'justify',
    paddingVertical: 25,
    fontSize: BODY_FONT_SIZE,
    color: TEXT_COLOR,
  },
  
  banner:
  {
    height: 200,
    justifyContent: "space-around",
    resizeMode : 'contain',
  },
});