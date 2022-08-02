/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  Image,
  View,
  // Vibration,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';
// import Constants from 'expo-constants';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { loginRequest, facebook, google } from '../../redux/auth/auth.actions';
import { selectToken } from '../../redux/app/app.selectors';
import {
  selectAuthErrors,
  selectLoading,
} from '../../redux/auth/auth.selectors';
// import SafariView from 'react-native-safari-view';
import * as Google from 'expo-google-app-auth';
// import * as GoogleSignIn from 'expo-google-sign-in';
import * as Facebook from 'expo-facebook';

class Login extends Component {
  state = {
    email: '',
    password: '',
    user: null,
    FBInitialized: false,
    expoPushToken: '',
    notification: {},
    textentry: false,
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
    // this.initAsync();
    // this.registerForPushNotificationsAsync();
    // this.signOutAsync();
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
  // sendPushNotification = async () => {
  //   const message = {
  //     to: this.state.expoPushToken,
  //     sound: 'default',
  //     title: 'Original Title',
  //     body: 'And here is the body!',
  //     data: { data: 'goes here' },
  //   };
  //   const response = await fetch('https://exp.host/--/api/v2/push/send', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Accept-encoding': 'gzip, deflate',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(message),
  //   });
  //   const data = response._bodyInit;
  //   console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
  // };
  loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '403635297248992',
        appName: 'Nepal Homes',
      });
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
    // await GoogleSignIn.askForPlayServicesAsync();
    // const user = await GoogleSignIn.signInSilentlyAsync();
    // this.setState({ user });
  };

  signOutAsync = async () => {
    // await GoogleSignin.revokeAccess();
    // await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
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
        const { type, user, accessToken } = result;
        if (type === 'success') {
          console.log(accessToken);
          // const accessToken = user.auth.accessToken;
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

  static getDerivedStateFromProps = (nextProps) => {
    if (nextProps.token) {
      nextProps.navigation.navigate('Userprofile');
    }
    return null;
  };

  handleSubmit = () => {
    this.props.loginRequest(this.state);
    //this.sendPushNotification();
  };

  handleChange = (name) => (text) => this.setState({ [name]: text });

  // handleBack = () => {
  //   this.props.navigation.navigate('ProfileScreen');
  // };
  toggleEyes = () => {
    this.setState({
      textentry: !this.state.textentry,
    });
  };
  render() {
    const { loading, errors } = this.props;
    // console.log(this.state)
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#F3FBFF',
        }}
      >
        <View style={{ backgroundColor: '#202B8B', flex: 1 }}>
          <View
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              flex: 1,
              backgroundColor: '#F3FBFF',
              bottom: 0,
              overflow: 'hidden',
            }}
          >
            <KeyboardAvoidingView
              style={{
                flex: 1,
                position: 'relative',
              }}
              behavior="padding"
              // keyboardVerticalOffset={70}
            >
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
                  <Text
                    style={{
                      fontSize: 28,
                      color: '#333',
                      fontWeight: 'bold',
                      marginHorizontal: 16,
                    }}
                  >
                    Login
                  </Text>
                </View>
                {/* <View
          style={{
            justifyContent: 'flex-start',
            position: 'absolute',
            left: 10,
            top: 30,
          }}
        >
          <TouchableOpacity activeOpacity={1}onPress={this.handleBack}>
            <Image
              style={{ width: 25, height: 25 }}
              source={require('../../../assets/cancel.png')}
            />
          </TouchableOpacity>
        </View> */}
                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ height: 35, width: 250, marginTop: 40 }}
              source={require('../../../assets/logo.png')}
            />
          </View> */}
                <TouchableOpacity
                  onPress={this.loginWithFacebook}
                  style={{
                    marginTop: 30,
                    height: 44,
                    backgroundColor: '#4267B2',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    paddingLeft: 24,
                    borderRadius: 4,
                  }}
                >
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require('../../../assets/facebook.png')}
                  />
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      flex: 1,
                      marginRight: 40,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}
                  >
                    Continue with Facebook
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.handleGoogleSignin}
                  style={{
                    marginTop: 12,
                    height: 44,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    // justifyContent: 'center',
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    borderRadius: 4,
                    borderWidth: 1,
                    paddingLeft: 20,
                    borderColor: '#ccc',
                  }}
                >
                  <Image
                    style={{ width: 22, height: 22 }}
                    source={require('../../../assets/google.png')}
                  />
                  <Text
                    style={{
                      color: 'black',
                      textAlign: 'center',
                      flex: 1,
                      marginRight: 40,
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}
                  >
                    Continue with Google
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#999',
                    marginTop: 20,
                    paddingVertical: 10,
                  }}
                >
                  or continue with email
                </Text>
                <View
                  style={{
                    borderRadius: 4,
                    borderColor: '#d3d3d3',
                    marginHorizontal: 16,
                    position: 'relative',
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,

                    elevation: 4,
                  }}
                >
                  <TextInput
                    style={{
                      height: 48,
                      borderBottomWidth: 1,
                      borderColor: '#d3d3d3',
                      marginBottom: 5,
                      paddingHorizontal: 16,
                    }}
                    value={this.state.email}
                    onChangeText={this.handleChange('email')}
                    placeholder={'Email'}
                    keyboardType={'default'}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      marginBottom: 5,
                      borderBottomColor: '#d3d3d3',
                      justifyContent: 'space-between',
                    }}
                  >
                    <TextInput
                      style={{
                        height: 48,
                        paddingHorizontal: 16,
                        width: Dimensions.get('window').width - 80,
                      }}
                      value={this.state.password}
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
                  <TouchableOpacity
                    style={{
                      height: 48,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={this.handleSubmit}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        color: '#0291DD',
                        fontWeight: 'bold',
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
                {loading && <ActivityIndicator />}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                    paddingVertical: 40,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('ForgotPassword')
                    }
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#555',
                      }}
                    >
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => this.props.navigation.navigate('Signup')}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#555',
                      }}
                    >
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </View>
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

const mapDispatchToProps = { loginRequest, facebook, google };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
