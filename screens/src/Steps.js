import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  NativeModules
} from 'react-native';
import { HELPER_BODY_FONT_SIZE, BG_COLOR, TEXT_COLOR, BUTTON_COLOR } from './ProjectConstants'

class Steps extends Component 
{   
  loaded = false;
  
  static navigationOptions = 
  {
    title: 'Voltar para a lista',
    headerStyle:
    {
      backgroundColor: BG_COLOR,
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
                ? HELPER_BODY_FONT_SIZE + 2
                : state.params.functionality.length <= 26 ? HELPER_BODY_FONT_SIZE - 4 : HELPER_BODY_FONT_SIZE - 10,
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
    fontSize: HELPER_BODY_FONT_SIZE - 7,
    color: TEXT_COLOR,
  },

  subtitleHeader:
  {
    fontSize: HELPER_BODY_FONT_SIZE - 7,
    textAlign: 'center',
    color: TEXT_COLOR,
  },
});

module.exports = Steps;