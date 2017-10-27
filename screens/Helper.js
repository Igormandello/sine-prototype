import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  TouchableNativeFeedback,
  TouchableHighlight,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Constants } from 'expo';
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.13
import Popover from 'react-native-modal-popover'; // 0.0.2

const data = [
  {
    key: 'Enviar um snap',
    steps: 4,
    data: [
      {
        image: 'https://i.imgur.com/c6Ln9Y4.png',
        text: 'Após posicionar a câmera, clique no botão indicado: ',
      },
      {
        image: 'https://i.imgur.com/hqsfClk.png',
        text: 'Depois, confirme a imagem clicando no icone: ',
      },
      {
        image: 'https://i.imgur.com/upW18XR.png',
        text: 'Selecione os contatos para receberem o snap: ',
      },
      {
        image: 'https://i.imgur.com/0G0PjGv.png',
        text: 'Clique no ícone indicado para enviar definitivamente o snap: ',
      },
    ],
  },
  {
    key: 'Adicionar um amigo',
    steps: 2,
    data: [
      { image: 'https://i.imgur.com/kpS8qrv.png', text: 'Passo 1 inserido aqui ' },
      { image: 'https://i.imgur.com/kpS8qrv.png', text: 'Passo 2 inserido aqui ' },
    ],
  },
  {
    key: 'Remover um amigo',
    steps: 3,
    data: [
      { image: 'https://i.imgur.com/kpS8qrv.png', text: 'Passo 1 inserido aqui ' },
      { image: 'https://i.imgur.com/kpS8qrv.png', text: 'Passo 2 inserido aqui ' },
      { image: 'https://i.imgur.com/kpS8qrv.png', text: 'Passo 3 inserido aqui ' },
    ],
  },
  {
    key: 'Adicionar snap na história',
    steps: 4,
    data: [
      { image: 'https://i.imgur.com/kpS8qrv.png', text: 'Passo 1 inserido aqui ' },
      { image: 'https://i.imgur.com/kpS8qrv.png', text: 'Passo 2 inserido aqui ' },
      { image: 'https://i.imgur.com/kpS8qrv.png', text: 'Passo 3 inserido aqui ' },
      { image: 'https://i.imgur.com/kpS8qrv.png', text: 'Passo 4 inserido aqui ' },
    ],
  },
];

const specials = [
  {
    item: 'snap',
    desc: 'Um snap é uma imagem ou vídeo, que você envia à alguma pessoa, com duração máxima de 10 segundos.',
  },
];

const POPOVER_FONT_SIZE = 25, PADDING_POPOVER = 16;

const BG_COLOR = '#373854',
  TEXT_COLOR = '#FFFFFF',
  SPECIAL_COLOR = '#7E80BF',
  NAVIGATOR_COLOR = '#4F507F',
  BUTTON_COLOR = '#4F507F';

class FunctionList extends Component 
{
  btns = [];
  specialsN = 0;
  heightPop = 0;
  
  constructor(props) 
  {
    super(props);
    this._specialPress   = this._specialPress.bind(this);
    this._closePopover   = this._closePopover.bind(this);
    this._checkPlacement = this._checkPlacement.bind(this);
  }

  state = 
  {
    popoverVisible: false,
    popoverRect: { x: 0, y: 0, width: 0, height: 0 },
    popoverData: 'eae',
    placement: 'bottom',
  };

  static navigationOptions = 
  {
    header: {
      visible: null,
    },
  };

  _checkPlacement = () => 
  {
    var { height } = Dimensions.get('window');

    if (
      this.state.popoverRect.y +
        this.heightPop +
        2 * PADDING_POPOVER +
        Constants.statusBarHeight +
        100 >
      height
    )
      return 'top';
    else 
      return 'bottom';
  };

  _renderItem = ({ item }) => 
  {
      if (Platform.OS != 'ios')
        return (
          <View style = {{ marginBottom : 12 }}>
              <TouchableNativeFeedback
                underlayColor="#5B5C73"
                onPress={() =>
                  this.props.navigation.navigate('Tutorial', {
                    functionality: item.key,
                    number: 1,
                    total: item.steps,
                    data: item.data,
                  })}
              >
                <View style={{ flexDirection: 'row', paddingBottom: 8, paddingTop: 8 }}>
                  <Text style={styles.item}>
                    {'\u2022 '}
                  </Text>
                  <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
                    {this._findSpecial(item.key.split(' '))}
                  </View>
                </View>
              </TouchableNativeFeedback>
          </View>);
      else
        return(
        <View style = {{ marginBottom : 12 }}>
            <TouchableHighlight
              underlayColor="#5B5C73"
              onPress={() =>
              this.props.navigation.navigate('Tutorial', {
                functionality: item.key,
                number: 1,
                total: item.steps,
                data: item.data,
            })}
              style = {{ marginBottom : 20 }}  
            >
              <View style={{ flexDirection: 'row', paddingBottom: 8, paddingTop: 8 }}>
                <Text style={styles.item}>
                  {'\u2022 '}
                </Text>
                <Text>
                  {this._findSpecial(item.key.split(' '))}
                </Text>
              </View>
            </TouchableHighlight>
        </View>);
  }

  specialsN = 0;
  _findSpecial = text => 
  {
    var ret = [];
    for (var i = 0; i < text.length; i++) {
      var isSpecial = false, n;
      for (n = 0; n < specials.length; n++)
        if (text[i] == specials[n].item) {
          isSpecial = true;
          break;
        }

      if (isSpecial) {
        ret.push([
          <TouchableHighlight
            ref={input => {
              this.btns.push(input);
            }}
            underlayColor={BG_COLOR}
            onPress={this._specialPress.bind(this, this.specialsN++, n)}>
            <Text style={styles.special}>{text[i]}</Text>
          </TouchableHighlight>,
          <Text style={styles.item}> </Text>,
        ]);
      } else
        ret.push([
          <Text style={styles.item}>{text[i]}</Text>,
          <Text style={styles.item}> </Text>,
        ]);
    }

    ret[ret.length - 1].pop();
    return ret;
  };

  _specialPress(a, n) 
  {
    this.btns[a].measure((ox, oy, width, height, px, py) => 
    {
      this.setState({
        popoverVisible: true,
        popoverRect: { x: px, y: py - (Platform.OS != 'ios' ? 20 : 0), width: width, height: height },
        popoverData: specials[n].desc,
        placement: 'bottom',
      });
    });
  }

  _closePopover() 
  {
    this.setState({ popoverVisible: false });
  }

  onLayout = event =>
  {
    let { height } = event.nativeEvent.layout;
    
    this.heightPop = height;
    this.setState({
        popoverVisible: true,
        placement: this._checkPlacement(),
    });
  }

  render() 
  {
    var { width } = Dimensions.get('window');
    
    return (
      <View style={styles.container}>
        <Popover
          visible = { this.state.popoverVisible }
          fromRect = { this.state.popoverRect }
          onClose = { this._closePopover }
          contentStyle = {{ padding: PADDING_POPOVER, borderRadius: 8 }}
          placement = { this.state.placement }
        >
            <Text style={{ fontSize: POPOVER_FONT_SIZE, width: width - 50 }} onLayout = { this.onLayout }>
              {this.state.popoverData}
            </Text>
        </Popover>
        
        <View style={styles.header}>
          <Text style={styles.textHeader}> Snapchat </Text>
        </View>

        <View style={styles.hr} />

        <View style={styles.list}>
          <Text style={styles.subtitleHeader}> Funcionalidades do app </Text>

          <FlatList
            data={data}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </View>
    );
  }
}

class Steps extends Component 
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

const SineApp = StackNavigator(
  {
    Index: {
      screen: FunctionList,
      header: null,
      navigationOptions: {
        header: null,
      },
    },
    Tutorial: {
      screen: Steps,
    },
  },
  { headerMode: 'screen' }
);

export default SineApp;

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: BG_COLOR,
  },

  header:
  {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
    backgroundColor: BG_COLOR,
  },

  hr:
  {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFF',
  },

  list:
  {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 12,
    paddingBottom: 35,
  },

  textHeader:
  {
    fontSize: 52,
    fontWeight: 'bold',
    textAlign: 'center',
    color: TEXT_COLOR,
  },

  subtitleHeader:
  {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 24,
    paddingTop: 8,
    color: TEXT_COLOR,
  },

  item:
  {
    textAlignVertical: 'center',
    fontSize: 28,
    color: TEXT_COLOR,
    fontWeight: '500',
  },

  special:
  {
    textAlignVertical: 'center',
    fontSize: 28,
    color: SPECIAL_COLOR,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});

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