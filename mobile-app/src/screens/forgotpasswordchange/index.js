/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  View,
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  setforgotPasswordData,
  forgotPasswordData,
  clearforgotPasswordData,
} from '../../redux/auth/auth.actions';
import {
  selectForgotPassword,
  selectForgotPasswordData,
} from '../../redux/auth/auth.selectors';

class ForgotPasswordChange extends Component {
  state = {
    textentry: false,
    confirmtextentry: false,
  };
  handleSubmit = () => {
    this.props.forgotPasswordData(this.props.forgot).then(res => {
      this.props.navigation.navigate('Login');
    });
    this.props.clearforgotPasswordData();
  };

  onForgotPasswordValueSelected = (key, value) => {
    this.props.setforgotPasswordData({
      key,
      value,
    });
  };
  toggleEyes = () => {
    this.setState({
      textentry: !this.state.textentry,
    });
  };
  confirmtoggleEyes = () => {
    this.setState({
      confirmtextentry: !this.state.confirmtextentry,
    });
  };
  render() {
    const { forgot } = this.props;
    // console.log(forgot);
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          position: 'relative',
        }}
        behavior="padding"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal: 16 }}
        >
          <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
            Reset Password
          </Text>
          <TextInput
            style={{
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: '#d3d3d3',
              marginBottom: 5,
              padding: 10,
            }}
            value={forgot.code}
            onChangeText={text =>
              this.onForgotPasswordValueSelected('code', text)
            }
            placeholder={'Code'}
            secureTextEntry={false}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: '#d3d3d3',
              // marginBottom: 5,
            }}
          >
            <TextInput
              style={{
                height: 40,
                marginBottom: 5,
                paddingHorizontal: 16,
                // fontSize: 16,
                width: '80%',
                padding: 10,
              }}
              value={forgot.password}
              onChangeText={text =>
                this.onForgotPasswordValueSelected('password', text)
              }
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
                  style={{ width: 20, height: 15, marginRight: 12 }}
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
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: '#d3d3d3',
              // marginBottom: 10,
            }}
          >
            <TextInput
              style={{
                height: 40,
                marginBottom: 5,
                paddingHorizontal: 16,
                // fontSize: 16,
                width: '80%',
                padding: 10,
              }}
              value={forgot.confirm_password}
              onChangeText={text =>
                this.onForgotPasswordValueSelected('confirm_password', text)
              }
              placeholder={'Confirm Password'}
              secureTextEntry={!this.state.confirmtextentry}
            />
            <TouchableOpacity
              style={{
                height: 50,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 90,
              }}
              onPress={this.confirmtoggleEyes}
            >
              {this.state.confirmtextentry === false ? (
                <Image
                  style={{ width: 20, height: 15, marginRight: 12 }}
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
          <TextInput
            style={{
              height: 50,
              borderBottomWidth: 1,
              borderBottomColor: '#d3d3d3',
              marginBottom: 5,
              padding: 10,
            }}
            value={forgot.email}
            onChangeText={text =>
              this.onForgotPasswordValueSelected('email', text)
            }
            placeholder={'Email'}
            keyboardType={'email-address'}
          />
          <View>
            <TouchableOpacity
              style={{
                marginTop: 20,
                height: 40,
                backgroundColor: '#0291DD',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}
              onPress={this.handleSubmit}
            >
              <Text
                style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
              >
                Reset Password
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  forgot: selectForgotPassword,
  selectForgotPasswordData,
});

const mapDispatchToProps = {
  forgotPasswordData,
  setforgotPasswordData,
  clearforgotPasswordData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordChange);
