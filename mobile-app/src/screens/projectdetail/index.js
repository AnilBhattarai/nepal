/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
  Modal,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import FilterModal from '../component/modal';
import { ScrollView } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-tiny-toast';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  selectDetailData,
  selectFavouriteData,
  selectCommentData,
  selectComment,
  selectOffer,
  selectOfferData,
  selectDataErrors,
} from '../../redux/property/property.selectors';
import { selectToken } from '../../redux/app/app.selectors';
import {
  detailPropertyData,
  favouritePropertyData,
  favouritePropertyDataGet,
  setCommentValue,
  commentPostData,
  setOfferValue,
  offerPostData,
  clearCommentField,
  clearMakeOfferField,
} from '../../redux/property/property.actions';
import { WebView } from 'react-native-webview';

class ProjectDetail extends Component {
  constructor() {
    super();
    this.maxLength = 140;
    this.state = {
      offermodalVisible: false,
      commentmodalVisible: false,
      is_favourite: false,
      property_id: '',
      modalVisible: false,
      type: null,
      isConnected: null,
      textLength: 0,
    };
  }
  handleChange(text) {
    this.setState({
      textLength: text.length,
    });
    this.onOfferValueSelected('message', text);
  }
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };
  componentDidMount = async () => {
    await this.props.detailPropertyData(this.props.navigation.getParam('slug'));
    const data = await this.props.favouritePropertyDataGet(
      this.props.navigation.getParam('id'),
    );

    NetInfo.addEventListener(state => {
      this.setState({ type: state.type, isConnected: state.isConnected });
    });
    this.setState({
      is_favourite: data.data.is_favourite,
      property_id: this.props.navigation.getParam('id'),
    });
    // console.log(this.props.navigation.getParam('id'), 'dasdas');
  };
  setCommentModalVisible = visible => {
    this.setState({ commentmodalVisible: visible });
    this.props.clearCommentField();
  };
  setOfferModalVisible = visible => {
    this.setState({ offermodalVisible: visible });
    this.props.clearMakeOfferField();
  };
  onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://www.nepalhomes.com/project/${this.props.navigation.getParam(
          'slug',
        )}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  onFavourite = () => {
    if (this.props.token === '') {
      Toast.show('Please Login First!');
    } else {
      this.setState({
        is_favourite: !this.state.is_favourite,
      });
      this.props.favouritePropertyData(this.state);
    }
  };
  onCommentValueSelected = (key, value) => {
    this.props.setCommentValue({
      key,
      value,
    });
  };
  onOfferValueSelected = (key, value) => {
    this.props.setOfferValue({
      key,
      value,
    });
  };
  onCommentPost = () => {
    if (this.props.token === '') {
      Toast.show('Please Login First!!');
    } else {
      const comment = this.props.comment;
      this.props.commentPostData({
        id: this.props.navigation.getParam('id'),
        comment,
      });
      this.setCommentModalVisible(false);
      this.props.clearCommentField();
    }
  };
  onCommentPress = () => {
    if (this.props.token === '') {
      Toast.show('Please Login First!!');
    } else {
      this.setCommentModalVisible(true);
    }
  };
  onCommentCancel = () => {
    this.props.clearCommentField();
    this.setCommentModalVisible(false);
  };
  onOfferCancel = () => {
    this.props.clearMakeOfferField();
    this.setOfferModalVisible(false);
  };
  onOfferPost = () => {
    if (this.props.token === '') {
      Toast.show('Please Login First!!');
    } else {
      const offer = this.props.offer;
      this.props.offerPostData({
        id: this.props.navigation.getParam('id'),
        offer,
      });
      {
        Object.keys(selectDataErrors).length > 0
          ? null
          : this.setOfferModalVisible(false);
        this.props.clearMakeOfferField();
      }
    }
  };
  render() {
    const { data, comment, offer, selectDataErrors } = this.props;
    // console.log(this.state, "fhgfhgfhgfhg");
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* <View
          style={{
            height: 300,
            width: '100%',
            backgroundColor: '#fff',
            position: 'absolute',
            top: 0,
          }}
        >
          <Text>bottom</Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 56,
            marginTop: Platform.OS === 'ios' ? 0 : 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 48,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              const isFromUserPage = this.props.navigation.getParam('goback');
              if (isFromUserPage) {
                this.props.navigation.goBack();
                // this.props.clearPostPropertyField();
              } else {
                this.props.navigation.navigate('Explore');
              }
            }}
          >
            <Image
              style={{
                height: 22,
                width: 22,
              }}
              source={require('../../../assets/back.png')}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <TouchableOpacity
              style={{
                width: 48,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => this.setState({ modalVisible: true })}
            >
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../../../assets/search.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FilterModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          navigate={this.props.navigation.navigate}
        />
        {this.state.isConnected === true ? (
          <WebView
            source={{
              uri: `https://www.nepalhomes.com/project/mobile/${this.props.navigation.getParam(
                'slug',
              )}`,
            }}
            originWhitelist={['*']}
            textZoom={100}
            containerStyle={{
              marginTop: 10,
              marginHorizontal: 10,
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
            <View style={{ height: 11, width: 1 }} />
          )}

        <View
          style={{
            height: 56,
            width: '100%',
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 20 : 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderTopColor: '#ccc',
            borderTopWidth: 1,
            elevation: 4,
          }}
        >
          <TouchableOpacity
            style={{ width: '25%', alignItems: 'center' }}
            onPress={this.onFavourite}
          >
            <Image
              style={{
                height: 21,
                width: 24,
              }}
              source={
                this.state.is_favourite === false
                  ? require('../../../assets/favourite.png')
                  : require('../../../assets/favourite_red.png')
              }
            />
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                color: '#202B8B',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Favourite
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: '25%', alignItems: 'center' }}
            onPress={() => this.setOfferModalVisible(true)}
          >
            <Image
              style={{
                height: 20,
                width: 20,
              }}
              source={require('../../../assets/offer.png')}
            />
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                color: '#202B8B',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Contact
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: '25%', alignItems: 'center' }}
            onPress={this.onCommentPress}
          >
            <Image
              style={{
                height: 20,
                width: 20,
              }}
              source={require('../../../assets/comment.png')}
            />
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                color: '#202B8B',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Comment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '25%', alignItems: 'center' }}
            onPress={this.onShare}
          >
            <Image
              style={{
                height: 20,
                width: 20,
              }}
              source={require('../../../assets/share.png')}
            />
            <Text
              style={{
                fontSize: 12,
                marginTop: 4,
                color: '#202B8B',
                fontWeight: 'bold',
                textTransform: 'uppercase',
              }}
            >
              Share
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Modal
            animationType="fade"
            visible={this.state.commentmodalVisible}
            onRequestClose={() => {
              this.setCommentModalVisible(false);
            }}
          >
            <View
              style={{
                height: Dimensions.get('window').height,
              }}
            >
              <KeyboardAvoidingView
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
                behavior="padding"
                enabled
                keyboardVerticalOffset={70}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  <TouchableOpacity
                    style={{
                      width: 48,
                      height: 56,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={this.onCommentCancel}
                  >
                    <Image
                      style={{
                        height: 22,
                        width: 22,
                      }}
                      source={require('../../../assets/back.png')}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 40,
                      marginHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}
                    >
                      Post Comment
                    </Text>
                    <TextInput
                      multiline={true}
                      numberOfLines={2}
                      style={{
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#979797',
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      value={comment.title}
                      onChangeText={text =>
                        this.onCommentValueSelected('title', text)
                      }
                      placeholder={'Your Comment'}
                    />
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: '#0291DD',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#0291DD',
                        borderWidth: 1,
                        borderRadius: 4,
                      }}
                      onPress={this.onCommentPost}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}
                      >
                        Post Comment
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </View>
        <View>
          <Modal
            animationType="fade"
            visible={this.state.offermodalVisible}
            onRequestClose={() => {
              this.setOfferModalVisible(false);
            }}
          >
            <View
              style={{
                height: Dimensions.get('window').height,
                justifyContent: 'flex-start',
              }}
            >
              <KeyboardAvoidingView
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
                behavior="padding"
                enabled
                keyboardVerticalOffset={70}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps={'always'}
                >
                  <TouchableOpacity
                    style={{
                      width: 48,
                      height: 56,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={this.onOfferCancel}
                  >
                    <Image
                      style={{
                        height: 22,
                        width: 22,
                      }}
                      source={require('../../../assets/back.png')}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      backgroundColor: '#fff',
                      marginTop: 40,
                      marginHorizontal: 16,
                      flex: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}
                    >
                      Contact Developer
                    </Text>
                    <Text style={{ fontSize: 13, marginBottom: 10 }}>
                      Developer will get notified when you send message
                    </Text>
                    <TextInput
                      style={{
                        height: 50,
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#979797',
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      value={offer.name}
                      onChangeText={text =>
                        this.onOfferValueSelected('name', text)
                      }
                      placeholder={'Name'}
                    />
                    {offer.name === '' ? (
                      <View style={{ marginHorizontal: 20 }}>
                        {Object.keys(selectDataErrors).length > 0 ? (
                          <Text style={{ color: 'red', fontSize: 10 }}>
                            {selectDataErrors.name}
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                    <TextInput
                      style={{
                        height: 50,
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#979797',
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      value={offer.email}
                      onChangeText={text =>
                        this.onOfferValueSelected('email', text)
                      }
                      keyboardType="email-address"
                      placeholder={'Email'}
                    />
                    {offer.email === '' ? (
                      <View style={{ marginHorizontal: 20 }}>
                        {Object.keys(selectDataErrors).length > 0 ? (
                          <Text style={{ color: 'red', fontSize: 10 }}>
                            {selectDataErrors.email}
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                    <TextInput
                      style={{
                        height: 50,
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#979797',
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      value={offer.phone}
                      onChangeText={text =>
                        this.onOfferValueSelected('phone', text)
                      }
                      keyboardType="phone-pad"
                      placeholder={'Phone No.'}
                    />
                    {offer.phone === '' ? (
                      <View style={{ marginHorizontal: 20 }}>
                        {Object.keys(selectDataErrors).length > 0 ? (
                          <Text style={{ color: 'red', fontSize: 10 }}>
                            {selectDataErrors.phone}
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                    <TextInput
                      multiline={true}
                      numberOfLines={2}
                      style={{
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#979797',
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      value={offer.message}
                      onChangeText={text => this.handleChange(text)}
                      placeholder={'Message'}
                    />
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'lightgrey',
                        textAlign: 'right',
                      }}
                    >
                      {this.state.textLength}/140
                  </Text>
                    {offer.message === '' ? (
                      <View style={{ marginHorizontal: 20 }}>
                        {Object.keys(selectDataErrors).length > 0 ? (
                          <Text style={{ color: 'red', fontSize: 10 }}>
                            {selectDataErrors.message}
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                    <TouchableOpacity
                      style={{
                        height: 50,
                        width: '100%',
                        backgroundColor: '#0291DD',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#0291DD',
                        borderWidth: 1,
                        borderRadius: 4,
                      }}
                      onPress={this.onOfferPost}
                    >
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}
                      >
                        Send Message
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: selectDetailData,
  selectFavouriteData,
  selectCommentData,
  selectOfferData,
  comment: selectComment,
  offer: selectOffer,
  token: selectToken,
  selectDataErrors,
});
const mapDispatchToProps = {
  detailPropertyData,
  favouritePropertyData,
  favouritePropertyDataGet,
  setCommentValue,
  commentPostData,
  setOfferValue,
  offerPostData,
  clearCommentField,
  clearMakeOfferField,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDetail);
