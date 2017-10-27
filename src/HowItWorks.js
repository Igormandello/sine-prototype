import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, Image, Dimensions, StatusBar, Button, TouchableHighlight } from 'react-native';
import { Constants, Notifications } from 'expo';

const FONT_SIZE = 25;
const BODY_FONT_SIZE = FONT_SIZE - 5;
const BG_COLOR = '#373854',
      TEXT_COLOR = '#FFFFFF',
      SPECIAL_COLOR = '#7E80BF',
      NAVIGATOR_COLOR = '#4F507F',
      BUTTON_COLOR = '#4F507F';

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
      <View style={styles.containerCF}>
        <Text style = { styles.textAjuda }> 
            In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor.
        </Text>
          
        <View style = { styles.containerBannerCF }>
          <Image
          source = {{ uri:'http://i0.kym-cdn.com/entries/icons/mobile/000/016/546/hidethepainharold.jpg' }}
          style = { styles.banner }
          />
        </View>
          
        <Text style = { styles.textAjuda }> 
          In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 3,
    backgroundColor: BG_COLOR,
    paddingTop: Constants.statusBarHeight,
  },
  
  containerBanner: 
  {
    flex : 1,
    paddingTop: 35,
    paddingHorizontal: 35,
    paddingBottom: 12,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  
  containerBody: 
  {
    flex: 2,
    flexDirection: 'column',
    paddingTop: 35,
    paddingHorizontal: 35,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  
  containerAjuda: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  textAjuda: 
  {
    textAlign: 'justify',
    paddingVertical: 25,
    fontSize: BODY_FONT_SIZE,
    color: TEXT_COLOR,
  },
  
  comoFunciona:
  {
    resizeMode: 'contain',
    fontSize: FONT_SIZE,
    color: TEXT_COLOR,
  },
  
  containerCF:
  {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 35,
    paddingTop: 5,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    backgroundColor: BG_COLOR,
  },
  
  containerBannerCF: 
  {
    flex : 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  
  banner:
  {
    height: 200,
    justifyContent: "space-around",
    resizeMode : 'contain',
  },
});