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

export default class ActivateHelp extends Component 
{
  constructor(props) 
  {
    super(props);
    
    this._handleNotification = props.screenProps.notificationHandler;
  }
  
  static navigationOptions = 
  {
    header: 
    {
      visible: null,
    }
  }
  
  state = 
  {
    switchValue: false
  }

  _handleToggleSwitch = () => this.setState(state => ({
    switchValue: !state.switchValue
  }));

  componentWillMount() 
  {
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  componentWillUnmount() 
  {
    this._notificationSubscription && this._notificationSubscription.remove();
  }
  
  _presentLocalNotification = () => 
  {
    Notifications.presentLocalNotificationAsync({
      title: 'Ajuda em aplicativos ativada!',
      body: 'Clique para abrir a ajuda',
      data: {
        hello: 'there',
      },
      ios: {
        sound: true,
      },
      android: {
        vibrate: true,
      },
    });
  }

  render() 
  {
    const { navigate } = this.props.navigation;
    if (this.state.switchValue)
      this._presentLocalNotification();
    
    return (
      <View style = { styles.container }>
          <View style = { styles.containerBanner }>
            <Image
            source = {{ uri:'http://i0.kym-cdn.com/photos/images/facebook/000/839/199/8a9.jpg' }}
            style = { styles.banner }
            />
          </View>
            
          <View style = { styles.containerBody }>
            <View style = { styles.containerAjuda }>
              <Text style = {{ fontSize: FONT_SIZE, color: TEXT_COLOR }}>Ajuda nos aplicativos</Text>
              <Switch
                onValueChange = { this._handleToggleSwitch }
                value = { this.state.switchValue }
              />
            </View>
            
            <Text style = {styles.textAjuda }> 
              In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor.
            </Text>
            
            <Button
              onPress = { () => navigate('Tutorial') }
              title = "Como Funciona?"
              color = { BUTTON_COLOR }
              accessibilityLabel = "Saiba mais sobre como funciona o aplicativo."
              style = { styles.comoFunciona }
            />
          </View>
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