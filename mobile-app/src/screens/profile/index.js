/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { selectToken } from '../../redux/app/app.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/auth/auth.actions';
class Profile extends Component {
  state = {};
  static getDerivedStateFromProps = nextProps => {
    console.log('reached here');
    if (nextProps.token) {
      // console.log(nextProps.token, 'here');
      nextProps.navigation.navigate('Userprofile');
    }
    return null;
  };
  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View style={{ backgroundColor: '#202B8B' }}>
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
            <ScrollView>
              <View
                style={{
                  flex: 1,
                }}
              >
                {/* <ImageBackground
                style={{
                  backgroundColor: '#006395',
                  position: 'relative',
                  height: 250,
                  width: '100%',
                }}
                source={require('../../../assets/cover.png')}
              >
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderWidth: 0.5,
                    borderRadius: 50,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: 'white',
                    elevation: 4,
                    position: 'absolute',
                    bottom: -50,
                    left: '50%',
                    marginLeft: -50,
                  }}
                >
                  <Image
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 40,
                      width: 40,
                    }}
                    source={require('../../../assets/user.png')}
                  />
                </View>
              </ImageBackground> */}
                {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginTop: 50,
                    color: '#202B8B',
                  }}
                >
                  Welcome Guest
                </Text>
              </View> */}

                <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 10,
                      borderStyle: 'dashed',
                      borderBottomColor: '#d3d3d3',
                      borderBottomWidth: 1,
                    }}
                    onPress={() => this.props.navigation.navigate('Signup')}
                  >
                    <Text
                      style={{
                        marginHorizontal: 10,
                        color: '#202B8B',
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginBottom: 5,
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 10,
                      borderStyle: 'dashed',
                      borderBottomColor: '#d3d3d3',
                      borderBottomWidth: 1,
                      marginTop: 10,
                    }}
                    onPress={() => this.props.navigation.navigate('Login')}
                  >
                    <Text
                      style={{
                        marginTop: 10,
                        marginHorizontal: 10,
                        color: '#202B8B',
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginBottom: 5,
                      }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
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
});
const mapDispatchToProps = { setCurrentUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
