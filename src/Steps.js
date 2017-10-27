import React, { Component } from 'react';
import { Constants } from 'expo';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator
} from 'react-native';

const BG_COLOR = '#373854',
  TEXT_COLOR = '#FFFFFF',
  NAVIGATOR_COLOR = '#4F507F',
  BUTTON_COLOR = '#4F507F';
    
export default class Steps extends Component 
{   
  loaded = false;
  
  static navigationOptions = 
  {
    title: 'Voltar para a lista',
    headerStyle: {
      marginTop: Constants.statusBarHeight,
      backgroundColor: NAVIGATOR_COLOR,
    },
    headerTintColor: 'white',
  };
  
  state =
  {
      loaded: false,
  }

  _buttonNext = params => 
  {
    if (params.number / params.total != 1) 
        return 'Proximo Passo';
    else
        return 'Finalizar tutorial';
  };

  _buttonHandler = (params, setParams, goBack) => 
  {
    if (params.number / params.total != 1)
    {
      this.setState({ loaded: false });
      setParams({
        functionality: params.functionality,
        number: params.number + 1,
        total: params.total,
      });
    }
    else goBack(null);
  };

  _imageLoad = () => this.setState({ loaded: true });

  render() 
  {
    const { state, setParams, goBack } = this.props.navigation;

    return (
      <View style={styles2.container}>
        <View style={styles2.header}>
          <Text
            style =
            {{
              fontSize: state.params.functionality.length < 18
                ? 30
                : state.params.functionality.length <= 26 ? 24 : 18,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingBottom: 6,
              color: TEXT_COLOR,
            }}>
            {state.params.functionality}
          </Text>
          <Text style={styles2.subtitleHeader}>
            {' '}Passo {state.params.number} / {state.params.total}{' '}
          </Text>
        </View>

        <View style={styles2.body}>
          <Text style={styles2.bodyText}>
            { state.params.data[state.params.number - 1].text }
          </Text>
        
          { !this.state.loaded && <ActivityIndicator style = {{ marginTop: 87.5 }}/> }
          <Image
            onLoad = { this._imageLoad.bind(this) } 
            source = {{ uri: state.params.data[state.params.number - 1].image }}
            style = {{ height: 175, resizeMode: 'contain' }}
          />
        </View>

        <View style={styles2.footer}>
          <Button
            title={this._buttonNext(state.params)}
            raised={true}
            color={BUTTON_COLOR}
            onPress={() => this._buttonHandler(state.params, setParams, goBack)}
          />
        </View>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  container:
  {
    flex: 1,
    paddingHorizontal: 35,
    backgroundColor: BG_COLOR,
  },

  header:
  {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },

  footer:
  {
    flex: 0.01,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    paddingBottom: 35,
  },

  body:
  {
    flex: 0.74,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 25,
  },

  bodyText:
  {
    paddingBottom: 15,
    fontSize: 22,
    color: TEXT_COLOR,
  },

  subtitleHeader:
  {
    fontSize: 22,
    textAlign: 'center',
    color: TEXT_COLOR,
  },
});