import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, Image, Button, Platform, NativeModules } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { FONT_SIZE, BODY_FONT_SIZE, BG_COLOR, TEXT_COLOR, BUTTON_COLOR } from './ProjectConstants'

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

class ActivateHelp extends Component 
{
  constructor(props) 
  {
    super(props);
    
    PushNotification.configure({
      onNotification: props.screenProps.notificationHandler,

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "YOUR GCM SENDER ID",

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
          alert: true,
          badge: true,
          sound: true
      },
    });
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
  
  _presentLocalNotification = () => 
  {
    PushNotification.localNotification({
      /* Android Only Properties */
      id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: "Clicando nesta notificação, você será redirecionado para a ajuda nos aplicativos",
      subText: "Sine - 1.0", // (optional) default: none
      vibrate: true,
      ongoing: true, // (optional) set whether this is an "ongoing" notification

      /* iOS and Android properties */
      title: 'Ajuda em aplicativos ativada!',
      message: 'Clique para abrir a ajuda',
    });
  }

  render() 
  {
    const { navigate } = this.props.navigation;
    if (this.state.switchValue)
      this._presentLocalNotification();
    
    return (
      <View style = { styles.container }>
          <View style = { styles.bannerContainer }>
            <Image
            source = {{ uri:'http://i0.kym-cdn.com/photos/images/facebook/000/839/199/8a9.jpg' }}
            style = { styles.banner }
            />
          </View>
            
          <View style = { styles.bodyContainer }>
            <View style = { styles.helpContainer }>
              <Text style = {{ fontSize: FONT_SIZE, color: TEXT_COLOR, paddingBottom: 6 }}>
                Ajuda nos aplicativos
              </Text>
              <Switch
                onValueChange = { this._handleToggleSwitch }
                value = { this.state.switchValue }
              />
            </View>
            
            <Text style = { styles.helpText }> 
              In sem justo, commodo ut, suscipit at, pharetra vitae, orci. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor.
            </Text>
            
            <Button
              onPress = { () => navigate('Tutorial') }
              title = "Como Funciona?"
              color = { BUTTON_COLOR }
              accessibilityLabel = "Saiba mais sobre como funciona o aplicativo."
              style = { styles.howItWorksButton }
            />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingTop: STATUSBAR_HEIGHT,
  },
  
  bannerContainer: 
  {
    paddingTop: 35,
    paddingHorizontal: 35,
    paddingBottom: 12,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  
  bodyContainer: 
  {
    flexDirection: 'column',
    paddingTop: 35,
    paddingHorizontal: 35,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  
  helpContainer: 
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  helpText: 
  {
    textAlign: 'justify',
    paddingVertical: 18,
    fontSize: BODY_FONT_SIZE,
    color: TEXT_COLOR,
  },
  
  howItWorksButton:
  {
    resizeMode: 'contain',
    fontSize: FONT_SIZE,
    color: TEXT_COLOR,
  },
  
  banner:
  {
    height: 200,
    justifyContent: "space-around",
    resizeMode : 'contain',
  },
});

module.exports = ActivateHelp;