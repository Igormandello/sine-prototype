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
    
    this.switchHandler = props.screenProps.switchHandler.bind(this);
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

  _handleToggleSwitch = () =>
  {
    this.switchHandler();
    this.setState(state => ({ switchValue: !state.switchValue }));
  }

  render() 
  {
    const { navigate } = this.props.navigation;
    
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