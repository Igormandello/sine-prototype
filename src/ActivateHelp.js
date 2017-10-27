import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, Image, Button } from 'react-native';
import { Constants, Notifications } from 'expo';

const FONT_SIZE = 25
const BODY_FONT_SIZE = FONT_SIZE - 5;
const BG_COLOR = '#373854',
      TEXT_COLOR = '#FFFFFF',
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
    paddingTop: Constants.statusBarHeight,
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