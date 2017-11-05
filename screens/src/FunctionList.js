import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  TouchableHighlight,
  Image,
  Dimensions,
  Platform,
  NativeModules
} from 'react-native';
import Popover from 'react-native-modal-popover';
import { FONT_SIZE, HELPER_FONT_SIZE, HELPER_BODY_FONT_SIZE, BG_COLOR, TEXT_COLOR, SPECIAL_COLOR } from './ProjectConstants'

const PADDING_POPOVER = 16;
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const data = 
[
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

const specials =
[
  {
    item: 'snap',
    desc: 'Um snap é uma imagem ou vídeo, que você envia a uma ou várias pessoas.',
  },
];

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
        STATUSBAR_HEIGHT +
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
        popoverRect: { x: px, y: py + (Platform.OS != 'ios' ? 15 : 0), width: width, height: height },
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
            <Text style={{ fontSize: FONT_SIZE, width: width - 50 }} onLayout = { this.onLayout }>
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

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: STATUSBAR_HEIGHT,
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
    fontSize: HELPER_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
    color: TEXT_COLOR,
  },

  subtitleHeader:
  {
    fontSize: HELPER_BODY_FONT_SIZE - 2,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 24,
    paddingTop: 8,
    color: TEXT_COLOR,
  },

  item:
  {
    textAlignVertical: 'center',
    fontSize: HELPER_BODY_FONT_SIZE,
    color: TEXT_COLOR,
    fontWeight: '500',
  },

  special:
  {
    textAlignVertical: 'center',
    fontSize: HELPER_BODY_FONT_SIZE,
    color: SPECIAL_COLOR,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});

module.exports = FunctionList;