/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  Switch,
  View,
  ScrollView,
  // Vibration,
  Platform,
  ActivityIndicator,
} from 'react-native';

// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
// import Constants from 'expo-constants';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectToken } from '../../redux/app/app.selectors';
import { registerRequest } from '../../redux/auth/auth.actions';
import { facebook, google } from '../../redux/auth/auth.actions';
import {
  selectAuthErrors,
  selectLoading,
} from '../../redux/auth/auth.selectors';
// import SafariView from 'react-native-safari-view';
// import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { SafeAreaView } from 'react-navigation';
class Register extends Component {
  state = {
    disabled: false,
    switchValue: false,
    data: {
      name: '',
      email: '',
      password: '',
      mobile_no: '',
    },
    user: null,
    FBInitialized: false,
    expoPushToken: '',
    notification: {},
    textentry: false,
  };
  static getDerivedStateFromProps = (nextProps) => {
    // console.log('reached here');
    if (nextProps.token) {
      // console.log(nextProps.token, 'here');
      nextProps.navigation.navigate('Login');
    }
    return null;
  };
  // registerForPushNotificationsAsync = async () => {
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(
  //       Permissions.NOTIFICATIONS,
  //     );
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(
  //         Permissions.NOTIFICATIONS,
  //       );
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     let token = await Notifications.getExpoPushTokenAsync();
  //     console.log(token);
  //     this.setState({ expoPushToken: token });
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }
  // };
  componentDidMount() {
    this.initAsync();
    // this.registerForPushNotificationsAsync();
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    // this._notificationSubscription = Notifications.addListener(
    //   this._handleNotification,
    // );
  }
  // _handleNotification = (notification) => {
  //   Vibration.vibrate();
  //   this.setState({ notification: notification });
  // };
  loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync('403635297248992', 'Nepal Homes');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        this.props.facebook({
          data: { access_token: token },
        });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  initAsync = async () => {
    // await GoogleSignIn.initAsync({
    //   clientId:
    //     '521974798939-0co9ftonu4570dsccfnqsmnt1sh5oi5k.apps.googleusercontent.com',
    // });
    // this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    //alert('FUNC');
    // const user = await GoogleSignIn.signInSilentlyAsync();
    // this.setState({ user });
  };

  signOutAsync = async () => {
    // await GoogleSignIn.signOutAsync();
    // this.setState({ user: null });
  };

  signInAsync = async () => {
    // try {
    //   let accessToken = '';
    //   await GoogleSignIn.askForPlayServicesAsync();
    //   const { type, user } = await GoogleSignIn.signInAsync();
    //   if (type === 'success') {
    //     this._syncUserWithStateAsync();
    //     accessToken = user.auth.accessToken;
    //   }
    //   if (accessToken) {
    //     this.props.google({
    //       data: { avatar: user.photoUrl, access_token: accessToken },
    //     });
    //   }
    // } catch ({ message }) {
    //   alert('login: Error:' + message);
    // }
  };
  handleGoogleSignin = () => {
    const config = {
      iosClientId: `521974798939-04r80dabdih7mk2edk053g5r8ri6quvn.apps.googleusercontent.com`,
      androidClientId: `521974798939-mjctm9c06u50gk6emfun8g69liii3hed.apps.googleusercontent.com`,
      iosStandaloneAppClientId: `521974798939-0co9ftonu4570dsccfnqsmnt1sh5oi5k.apps.googleusercontent.com`,
      androidStandaloneAppClientId: `521974798939-7ah11sa431mldsrbct374gsu16p9jpet.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type === 'success') {
          const accessToken = user.auth.accessToken;
          if (accessToken) {
            this.props.google({
              data: { avatar: user.photoUrl, access_token: accessToken },
            });
          } else {
            alert('login: Error: Google signin error');
          }
        } else {
          alert('login: Error: Google signin was cancelled');
        }
      })
      .catch((error) => {
        console.log(error, 'error in google signin');
        alert('login: Error: check your internet and try again');
      });
  };
  toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({ switchValue: value });
    //state changes according to switch
    //which will result in re-render the text
  };
  toggleEyes = () => {
    this.setState({
      textentry: !this.state.textentry,
    });
  };
  handleSubmit = () => {
    this.props.registerRequest(this.state.data);
  };
  // handleBack = () => {
  //   this.props.navigation.navigate('Login');
  // };
  handleChange = (name) => (text) =>
    this.setState({
      data: {
        ...this.state.data,
        [name]: text,
      },
    });
  render() {
    const { loading, errors } = this.props;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3FBFF' }}>
        <View style={{ backgroundColor: '#F3FBFF', flex: 1 }}>
          <View
            style={{
              // borderBottomLeftRadius: 20,
              // borderBottomRightRadius: 20,
              flex: 1,
              // backgroundColor: '#F3FBFF',
              // bottom: 0,
              // overflow: 'hidden',
            }}
          >
            <KeyboardAvoidingView
              style={{
                flex: 1,
                position: 'relative',
                paddingTop: Platform.OS === 'ios' ? 0 : 40,
              }}
              behavior="padding"
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  onPress={this.loginWithFacebook}
                  style={{
                    // marginTop: 50,
                    height: 44,
                    backgroundColor: '#4267B2',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginHorizontal: 24,
                    borderRadius: 4,
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20, marginRight: 12 }}
                    source={require('../../../assets/facebook.png')}
                  />
                  <Text
                    style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
                  >
                    Sign up with Facebook
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.signInAsync}
                  style={{
                    marginTop: 12,
                    height: 44,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginHorizontal: 24,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#555',
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20, marginRight: 12 }}
                    source={require('../../../assets/google.png')}
                  />
                  <Text
                    style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}
                  >
                    Sign up with Google
                  </Text>
                </TouchableOpacity>
                {/* <View
                  style={{
                    justifyContent: 'flex-start',
                    position: 'absolute',
                    left: 20,
                    top: 10,
                  }}
                >
                  <TouchableOpacity activeOpacity={1}onPress={this.handleBack}>
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require('../../../assets/cancel.png')}
                    />
                  </TouchableOpacity>
                </View> */}
                <TextInput
                  style={{
                    height: 48,
                    borderBottomWidth: 1,
                    borderBottomColor: '#d3d3d3',
                    marginBottom: 5,
                    marginTop: 20,
                    paddingHorizontal: 16,
                    fontSize: 16,
                    marginHorizontal: 16,
                  }}
                  value={this.state.data.name}
                  onChangeText={this.handleChange('name')}
                  placeholder={'Full Name'}
                  keyboardType={'default'}
                />
                <TextInput
                  style={{
                    height: 48,
                    borderBottomWidth: 1,
                    borderBottomColor: '#d3d3d3',
                    marginBottom: 5,
                    paddingHorizontal: 16,
                    fontSize: 16,
                    marginHorizontal: 16,
                  }}
                  value={this.state.data.email}
                  onChangeText={this.handleChange('email')}
                  placeholder={'Email'}
                  keyboardType={'default'}
                />
                <TextInput
                  style={{
                    height: 48,
                    borderBottomWidth: 1,
                    borderBottomColor: '#d3d3d3',
                    marginBottom: 5,
                    paddingHorizontal: 16,
                    fontSize: 16,
                    marginHorizontal: 16,
                  }}
                  value={this.state.data.mobile_no}
                  onChangeText={this.handleChange('mobile_no')}
                  placeholder={'Mobile No.'}
                  keyboardType={'number-pad'}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#d3d3d3',
                    marginBottom: 5,
                  }}
                >
                  <TextInput
                    style={{
                      height: 48,
                      marginBottom: 5,
                      paddingHorizontal: 16,
                      fontSize: 16,
                      width: '80%',
                    }}
                    value={this.state.data.password}
                    onChangeText={this.handleChange('password')}
                    placeholder={'Password'}
                    secureTextEntry={!this.state.textentry}
                  />
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 90,
                    }}
                    onPress={this.toggleEyes}
                  >
                    {this.state.textentry === false ? (
                      <Image
                        style={{ width: 20, height: 20, marginRight: 12 }}
                        source={require('../../../assets/eyeoff.png')}
                      />
                    ) : (
                      <Image
                        style={{ width: 20, height: 15, marginRight: 12 }}
                        source={require('../../../assets/eyeon.png')}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {loading && <ActivityIndicator />}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 16,
                  }}
                >
                  <Text
                    style={{
                      color: '#555',
                      fontSize: 15,
                      marginTop: 40,
                      marginRight: 16,
                    }}
                  >
                    I agree to terms and conditions
                  </Text>
                  <Switch
                    style={{ marginTop: 40 }}
                    onValueChange={this.toggleSwitch}
                    value={this.state.switchValue}
                  />
                </View>
                {this.state.switchValue === false ? (
                  <TouchableOpacity
                    disabled={this.state.disabled}
                    style={{
                      marginTop: 20,
                      height: 44,
                      backgroundColor: '#d3d3d3',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                      marginHorizontal: 16,
                    }}
                    onPress={this.handleSubmit}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}
                    >
                      SIGN UP
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      marginTop: 20,
                      height: 44,
                      backgroundColor: '#0291DD',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                      marginHorizontal: 16,
                    }}
                    onPress={this.handleSubmit}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}
                    >
                      SIGN UP
                    </Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  token: selectToken,
  loading: selectLoading,
  errors: selectAuthErrors,
});

const mapDispatchToProps = { registerRequest, facebook, google };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
