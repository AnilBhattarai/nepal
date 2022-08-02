/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
  RefreshControl,
  Platform,
} from 'react-native';
import { selectToken } from '../../redux/app/app.selectors';
import { setToken } from '../../redux/app/app.actions';
import { selectData, selectAuthErrors } from '../../redux/auth/auth.selectors';
import {
  selectMyPropertyData,
  selectWishListData,
} from '../../redux/property/property.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/auth.actions';
import { profileInfo } from '../../redux/auth/auth.actions';
import {
  myPropertyData,
  wishlistPropertyData,
} from '../../redux/property/property.actions';
import { IMAGE_URL } from '../../api';
import {
  clearPostPropertyField,
  clearPostPropertyErrorField,
} from '../../redux/property/property.actions';
import WishList from '../component/wishlistproperty';
import MyProperty from '../component/myproperty';
import tempImg3 from '../../../assets/home.png';

class LoggedIn extends Component {
  state = {
    refreshing: false,
  };
  componentDidMount() {
    this.props.wishlistPropertyData();
    this.props.myPropertyData();
    this.props.profileInfo();
    this.props.clearPostPropertyField();
    this.props.clearPostPropertyErrorField();
  }
  onRefresh = () => {
    this.props.myPropertyData();
    this.props.wishlistPropertyData();
    this.props.profileInfo();
  };
  onLogoutPress() {
    this.props.logout();
    this.props.setToken('');
  }
  _handlerOnPress = () => {
    Alert.alert(
      'Confirm Logout',
      'Do you really want to log out?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.onLogoutPress() },
      ],
      { cancelable: false },
    );
  };

  static getDerivedStateFromProps = (nextProps) => {
    if (!nextProps.token) {
      nextProps.navigation.navigate('Login');
    }
    return null;
  };
  handleTerms = () => {
    this.props.navigation.navigate('Terms');
  };
  handlePrivacy = () => {
    this.props.navigation.navigate('Privacy');
  };
  addProperty = () => {
    this.props.navigation.navigate('AddProperty');
    // this.props.navigation.navigate('Success');
    this.props.clearPostPropertyField();
  };

  render() {
    //console.log(this.props.data.roles[1].role_title, 'hello');
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#F3FBFF',
        }}
      >
        <View style={{ flex: 1, backgroundColor: '#202B8B' }}>
          <View
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              flex: 1,
              backgroundColor: '#F3FBFF',
              overflow: 'hidden',
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            >
              <View
                style={{
                  flex: 1,
                  paddingTop: Platform.OS === 'ios' ? 0 : 40,
                }}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  activeOpacity={1}
                  onPress={() =>
                    this.props.navigation.navigate('ProfileInformation')
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 80,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    marginTop: 20,
                    elevation: 4,
                    marginHorizontal: 16,
                  }}
                >
                  <Image
                    style={{
                      height: 48,
                      width: 48,
                      marginLeft: 10,
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 35,
                    }}
                    source={
                      this.props.data &&
                      this.props.data.image &&
                      this.props.data.image.path
                        ? {
                            uri: `${IMAGE_URL}${this.props.data.image.path}`,
                          }
                        : tempImg3
                    }
                  />
                  <View style={{ marginLeft: 20, paddingRight: 50 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#202B8B',
                      }}
                    >
                      {this.props.data && this.props.data.name ? (
                        this.props.data.name
                      ) : (
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#202B8B',
                          }}
                        >
                          What's your name?
                        </Text>
                      )}
                    </Text>
                  </View>
                  <View style={{ position: 'absolute', right: 20, top: 28 }}>
                    <Image
                      style={{ height: 24, width: 24, marginLeft: 40 }}
                      source={require('../../../assets/edit.png')}
                    />
                  </View>
                </TouchableOpacity>

                {this.props.data.email_verified === false ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    activeOpacity={1}
                    style={{
                      borderRadius: 4,
                      backgroundColor: 'red',
                      marginVertical: 10,
                      marginHorizontal: 16,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('VerifyEmail', {
                        email: this.props.data.email,
                      })
                    }
                  >
                    <Text style={{ padding: 5, color: '#fff', fontSize: 14 }}>
                      Email not verfied.
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    activeOpacity={1}
                    onPress={() => this.addProperty()}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: '#fff',
                      borderRadius: 5,
                      marginBottom: 0,
                      elevation: 4,
                      marginTop: 10,
                      height: 90,
                      marginHorizontal: 16,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: 'space-between',
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'normal',
                          color: '#979797',
                          lineHeight: 20,
                        }}
                      >
                        You can post for free and we don't {'\n'}charge any
                        types of commisions
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          marginTop: 10,
                          color: '#0291DD',
                        }}
                      >
                        ADD PROPERTY
                      </Text>
                    </View>
                    <Image
                      style={{ height: 60, width: 60, marginRight: 10 }}
                      source={require('../../../assets/profilehome.png')}
                    />
                  </TouchableOpacity>
                )}
                <View style={{ marginTop: 20 }}>
                  {Object.keys(this.props.selectWishListData).length > 0 ? (
                    <View style={{ marginTop: 20 }}>
                      <Text
                        style={{
                          color: '#444',
                          fontSize: 16,
                          marginHorizontal: 16,
                          marginBottom: 8,
                        }}
                      >
                        My Favourites
                      </Text>
                      <WishList navigate={this.props.navigation.navigate} />
                    </View>
                  ) : null}
                  {this.props.data.email_verified === true ? (
                    <View>
                      {Object.keys(this.props.selectMyPropertyData).length >
                      0 ? (
                        <View>
                          <View style={{ marginTop: 20, marginHorizontal: 16 }}>
                            <Text
                              style={{
                                color: '#444',
                                fontSize: 16,
                                marginBottom: 8,
                              }}
                            >
                              MY PROPERTY
                            </Text>
                          </View>
                          <MyProperty
                            navigate={this.props.navigation.navigate}
                          />
                        </View>
                      ) : null}
                    </View>
                  ) : null}
                  <View style={{ marginHorizontal: 16 }}>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        marginTop: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#8A8A8F',
                          paddingBottom: 8,
                        }}
                      >
                        Legal
                      </Text>
                    </View>
                    {/* <TouchableOpacity
                      style={{ paddingVertical: 10, alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D8D8D8', borderStyle: 'dashed' }}
                      onPress={() => this.props.navigation.navigate('PostRequirement')}>
                      <Image
                        style={{ height: 20, width: 20 }}
                        source={require('../../../assets/appicon.png')}
                      />
                      <Text style={{ color: '#444', fontSize: 17, fontWeight: 'normal' }}>Post Requirements</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      onPress={this.handleTerms}
                      style={{
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#D8D8D8',
                        borderStyle: 'dashed',
                      }}
                    >
                      <Text
                        style={{
                          color: '#444',
                          fontSize: 17,
                          fontWeight: 'normal',
                        }}
                      >
                        Terms and Conditions
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.handlePrivacy}
                      style={{
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#D8D8D8',
                        borderStyle: 'dashed',
                      }}
                    >
                      <Text
                        style={{
                          color: '#444',
                          fontSize: 17,
                          fontWeight: 'normal',
                        }}
                      >
                        Privacy Policy
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: 20, marginHorizontal: 16 }}>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#ccc',
                        marginTop: 20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#8A8A8F',
                          paddingBottom: 8,
                        }}
                      >
                        Security
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: '#D8D8D8',
                        borderStyle: 'dashed',
                      }}
                      onPress={() =>
                        this.props.navigation.navigate('ChangePassword')
                      }
                    >
                      <Text
                        style={{
                          color: '#444',
                          fontSize: 17,
                          fontWeight: 'normal',
                        }}
                      >
                        Change Password
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        marginBottom: 30,
                        borderBottomColor: '#D8D8D8',
                        borderStyle: 'dashed',
                      }}
                      onPress={() => this._handlerOnPress()}
                    >
                      <Text
                        style={{
                          color: '#444',
                          fontSize: 17,
                          fontWeight: 'normal',
                        }}
                      >
                        Logout
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  data: selectData,
  selectMyPropertyData,
  selectWishListData,
  error: selectAuthErrors,
});

const mapDispatchToProps = {
  logout,
  setToken,
  profileInfo,
  clearPostPropertyField,
  myPropertyData,
  wishlistPropertyData,
  clearPostPropertyErrorField,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
