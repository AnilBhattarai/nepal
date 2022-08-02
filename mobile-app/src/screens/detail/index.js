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
// import AsyncStorage from '@react-native-community/async-storage';
import FilterModal from '../component/modal';
import { ScrollView } from 'react-native-gesture-handler';
import SafeAreaView from 'react-native-safe-area-view';
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
  selectGetComment,
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
  getCommentData,
  deleteCommentData,
} from '../../redux/property/property.actions';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-tiny-toast';
import { IMAGE_URL } from '../../api';
import tempImg3 from '../../../assets/home.png';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.maxLength = 140;
    // console.log(this.props.navigation.getParam('id'));
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

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  async componentDidMount() {
    this.props.detailPropertyData(this.props.navigation.getParam('slug'));
    if (this.props.token) {
      this.props.getCommentData(this.props.navigation.getParam('id'));
      const data = await this.props.favouritePropertyDataGet(
        this.props.navigation.getParam('id'),
      );
      this.setState({
        is_favourite: data.data.is_favourite,
      });
    }

    this.setState({
      property_id: this.props.navigation.getParam('id'),
    });
    this.unsubscribe();
    // console.log(this.props.navigation.getParam('slug'));
  }
  unsubscribe = () =>
    NetInfo.addEventListener((state) => {
      this.setState({ type: state.type });
      this.setState({ isConnected: state.isConnected });
    });
  // setCommentModalVisible = visible => {
  //   this.setState({ commentmodalVisible: visible });
  //   this.props.clearCommentField();
  // };
  setOfferModalVisible = (visible) => {
    this.setState({ offermodalVisible: visible });
    this.props.clearMakeOfferField();
  };
  onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://www.nepalhomes.com/detail/${this.props.navigation.getParam(
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

  onOfferValueSelected = (key, value) => {
    this.props.setOfferValue({
      key,
      value,
    });
  };
  onCommentPress = () => {
    if (this.props.token === '') {
      Toast.show('Please Login First!!');
    } else {
      this.props.navigation.navigate('PropertyComments', {
        id: this.props.navigation.getParam('id'),
      });
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
    const offer = this.props.offer;
    this.props.offerPostData({
      id: this.props.navigation.getParam('id'),
      offer,
    });
    if (Object.keys(selectDataErrors).length > 0) {
      return null;
    } else {
      this.setOfferModalVisible(false);
      this.props.clearMakeOfferField();
    }
    // }
  };
  render() {
    const { data, comment, offer, selectDataErrors, selectGetComment } =
      this.props;
    // console.log(Object.keys(data.data.properties).length > 0 ? 'hello' : 'not hello');
    // console.log(data.data.properties.agency_id.address, 'hello');
    // console.log(
    //   data.data.properties && data.data.properties.agency_id._id
    //     ? data.data.properties.agency_id._id
    //     : null,
    //   'hello',
    // );
    // console.log(Object.keys(selectGetComment.comment).length, 'hello');
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
            height: 48,
            elevation: 4,
            justifyContent: 'space-between',
            marginTop: Platform.OS === 'ios' ? 0 : 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
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
        <FilterModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          navigate={this.props.navigation.navigate}
        />
        {this.state.isConnected === false ? (
          <View
            style={{
              backgroundColor: '#F2CDD4',
              width: '100%',
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 30,
            }}
          >
            <Text style={{ color: '#FF3B30', fontSize: 14, top: 200 }}>
              No Internet Connection !
            </Text>
          </View>
        ) : (
          <WebView
            source={{
              uri: `https://www.nepalhomes.com/property/mobile/${this.props.navigation.getParam(
                'slug',
              )}`,
            }}
            originWhitelist={['*']}
            textZoom={100}
            containerStyle={{
              marginTop: 10,
            }}
            showsVerticalScrollIndicator={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        )}
        {/* <View
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
          }}
        >
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
        </View> */}
        {/* <View>
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
                backgroundColor: '#F3FBFF',
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
                      Contact
                    </Text>

                    <View
                      style={{
                        padding: 12,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 4,
                      }}
                    >
                      {data.data &&
                      data.data.properties &&
                      data.data.properties.agency_id ? (
                        <TouchableOpacity
                          style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}
                          onPress={() => {
                            this.props.navigation.navigate('Agency', {
                              id:
                                data &&
                                data.data &&
                                data.data.properties &&
                                data.data.properties.agency_id
                                  ? data.data.properties.agency_id._id
                                  : null,
                            });
                            this.setOfferModalVisible(false);
                          }}
                        >
                          <View
                            style={{
                              height: 64,
                              width: 64,
                            }}
                          >
                            <Image
                              style={{
                                width: undefined,
                                height: undefined,
                                flex: 1,
                                resizeMode: 'contain',
                              }}
                              source={
                                data.data &&
                                data.data.properties &&
                                data.data.properties.agency_id &&
                                data.data.properties.agency_id.logo
                                  ? {
                                      uri: `${IMAGE_URL}${data.data.properties.agency_id.logo.path}`,
                                    }
                                  : null
                              }
                            />
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text
                              numberOfLines={1}
                              style={{ marginLeft: 12, fontSize: 16 }}
                            >
                              {data.data.properties.agency_id.title}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                    <TextInput
                      style={{
                        height: 44,
                        backgroundColor: '#fff',
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#C8C7CC',
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      value={offer.name}
                      onChangeText={(text) =>
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
                        height: 44,
                        backgroundColor: '#fff',
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#C8C7CC',
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      value={offer.email}
                      onChangeText={(text) =>
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
                        height: 44,
                        backgroundColor: '#fff',
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#C8C7CC',
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      value={offer.phone}
                      onChangeText={(text) =>
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
                      numberOfLines={5}
                      style={{
                        backgroundColor: '#fff',
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#C8C7CC',
                        borderRadius: 5,
                        padding: 10,
                        marginTop: 5,
                        marginBottom: 5,
                        textAlignVertical: 'top',
                      }}
                      value={offer.message}
                      maxLength={140}
                      onChangeText={(text) => this.handleChange(text)}
                      // placeholder={`Hey, I am interested to Buy/Rent your Property ${'\n'} # ${
                      //   data.data.properties && data.data.properties.prefix
                      //     ? data.data.properties.prefix
                      //     : null
                      //   }${
                      //   data.data.properties && data.data.properties.property_id
                      //     ? data.data.properties.property_id
                      //     : null
                      //   }`}
                      placeholder={
                        'Hey, I am Interested to buy/rent your Property!'
                      }
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
                        height: 44,
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
                          fontSize: 17,
                          letterSpacing: 0.5,
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
        </View> */}
        {/* <ScrollView>
          <View>
            <Image
              style={{
                height: 300,
                width: '100%',
                marginTop: 0,
                shadowOpacity: 3,
                shadowRadius: 4,
              }}
              source={
                data.media
                  ? {
                    uri: `${IMAGE_URL}${data.media.images[0].id.path}`,
                  }
                  : tempImg3
              }
            />
            <View
              style={{
                position: 'absolute',
                marginTop: 40,
                width: '100%',
                top: 0,
                left: 0,
                paddingHorizontal: 16,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Explore')}
                  style={{ height: 30, width: 30, left: 0 }}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                    }}
                    source={require('../../../assets/left_white.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ height: 30, width: 30, right: 0 }}
                  onPress={this.onShare}
                >
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                    }}
                    source={require('../../../assets/share.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  height: 21,
                }}
              >
                <Image
                  style={{
                    height: '100%',
                    width: 16,
                  }}
                  source={require('../../../assets/location.png')}
                />
                <Text
                  style={{
                    left: 10,
                    color: '#000',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                >
                  {data.address && data.address.area_id.name
                    ? data.address.area_id.name
                    : null}
                  {', '}
                  {data.address && data.address.city_id.name
                    ? data.address.city_id.name
                    : null}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: 30,
                  backgroundColor: '#fff', // data.property_purpose === '123' ? '' : '',
                  borderColor: '#202B8B',
                  borderWidth: 1,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 2,
                }}
              >
                <Text style={{ color: '#202B8B' }}>
                  {data.basic && data.basic.property_purpose.title
                    ? data.basic.property_purpose.title
                    : null}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
              }}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 30,
                  }}
                >
                  <Image
                    style={{
                      height: '100%',
                      width: 33,
                    }}
                    source={require('../../../assets/bedroom.png')}
                  />
                  <Text
                    style={{
                      left: 10,
                      color: '#202B8B',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    {data.building && data.building.no_of.bedroom
                      ? data.building && data.building.no_of.bedroom
                      : null}
                  </Text>
                </View>
                <Text style={{ fontSize: 12, color: '#666666' }}>BEDROOM</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 30,
                  }}
                >
                  <Image
                    style={{
                      height: '100%',
                      width: 33,
                    }}
                    source={require('../../../assets/kitchen.png')}
                  />
                  <Text
                    style={{
                      left: 10,
                      color: '#202B8B',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    {data.building && data.building.no_of.kitchen
                      ? data.building.no_of.kitchen
                      : null}
                  </Text>
                </View>
                <Text style={{ fontSize: 12, color: '#666666' }}>KITCHEN</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 35,
                  }}
                >
                  <Image
                    style={{
                      height: '100%',
                      width: 33,
                    }}
                    source={require('../../../assets/living.png')}
                  />
                  <Text
                    style={{
                      left: 10,
                      color: '#202B8B',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    {data.building && data.building.no_of.hall
                      ? data.building.no_of.hall
                      : null}
                  </Text>
                </View>
                <Text style={{ fontSize: 12, color: '#666666' }}>
                  LIVING ROOM
                </Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 35,
                  }}
                >
                  <Image
                    style={{
                      height: '100%',
                      width: 33,
                    }}
                    source={require('../../../assets/bath.png')}
                  />
                  <Text
                    style={{
                      left: 10,
                      color: '#202B8B',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                  >
                    {data.building && data.building.no_of.bathroom
                      ? data.building.no_of.bathroom
                      : null}
                  </Text>
                </View>
                <Text style={{ fontSize: 12, color: '#666666' }}>BATHROOM</Text>
              </View>
            </View>

            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                borderColor: '#d3d3d3',
                marginTop: 40,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                  <Text style={{ color: 'grey', fontSize: 18, marginTop: 10 }}>
                    TOTAL AREA
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {data.location_property && data.location_property.total_area
                      ? data.location_property.total_area
                      : null}{' '}
                    {data.location_property &&
                      data.location_property.total_area_unit.title
                      ? data.location_property.total_area_unit.title
                      : null}
                  </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                  <Text style={{ color: 'grey', fontSize: 18, marginTop: 10 }}>
                    HOUSE AREA
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {data.location_property && data.location_property.built_area
                      ? data.location_property.built_area
                      : null}{' '}
                    {data.location_property &&
                      data.location_property.built_area_unit.title
                      ? data.location_property.built_area_unit.title
                      : null}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                  <Text style={{ color: 'grey', fontSize: 18, marginTop: 10 }}>
                    BUILD YEAR
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {' '}
                    {data.building && data.building.built_year
                      ? data.building.built_year
                      : null}
                  </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                  <Text style={{ color: 'grey', fontSize: 18, marginTop: 10 }}>
                    PARKING
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {data.building && data.building.parking
                      ? data.building.parking
                      : null}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                  <Text style={{ color: 'grey', fontSize: 18, marginTop: 10 }}>
                    CONDITION
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>New</Text>
                </View>
                <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                  <Text style={{ color: 'grey', fontSize: 18, marginTop: 10 }}>
                    FACE To
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {data.location_property &&
                      data.location_property.property_face.title
                      ? data.location_property.property_face.title
                      : null}
                  </Text>
                </View>
              </View>
              <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                <Text style={{ color: 'grey', fontSize: 18, marginTop: 10 }}>
                  ROAD ACCESS
                </Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  {data.location_property &&
                    data.location_property.road_access_value
                    ? data.location_property.road_access_value
                    : null}{' '}
                  {data.location_property &&
                    data.location_property.road_access_length_unit.title
                    ? data.location_property.road_access_length_unit.title
                    : null}
                  {'/'}
                  {data.location_property &&
                    data.location_property.road_access_road_type.title
                    ? data.location_property.road_access_road_type.title
                    : null}
                </Text>
              </View>
            </View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                {' '}
                Description{' '}
              </Text>
              <Text>
                {' '}
                A house having 3 story, made on 9 anna land on sale at Baluwatar
                Kathmandu. The house is adjoining with 20 ft black top road, it
                has 4/5 car parking spaces, facing east. The ground floor of the
                house has 2 bed rooms (master bed room has attached bathroom),
                living room, dining and kitchen area, and one common bathroom.
                The first floor has a living room, specious dining area,
                kitchen, one common bathroom and a bed room. The top floor has a
                specious family room, 2 bed rooms (one master bed room with
                attached bathrooms), and one common bathroom.{' '}
              </Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
                {' '}
                Seller Information{' '}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <Image
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor: 'white',
                    borderRadius: 40,
                  }}
                  source={require('../../../assets/download.png')}
                />
                <View>
                  <Text style={{ fontSize: 16 }}> nepalhomesearch.com </Text>
                  <Text style={{ fontSize: 16, color: '#00BAF7' }}>
                    {' '}
                    Number One Real State Pvt. Ltd.{' '}
                  </Text>
                  <Text style={{ fontSize: 16 }}>9802070333</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView> */}
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
  selectGetComment,
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
  getCommentData,
  deleteCommentData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
