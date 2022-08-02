/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { forgotPasswordRequest } from '../../redux/auth/auth.actions';
import Toast from 'react-native-tiny-toast';
class ForgotPassword extends Component {
  state = {
    email: '',
  }
  handleSubmit = () => {
    this.props.forgotPasswordRequest(this.state);
    Keyboard.dismiss();
    Toast.show("Password for " + this.state.email + " has been sent to email");

  };
  handleChange = name => text => this.setState({ [name]: text });
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#F3FBFF', paddingHorizontal: 16, paddingTop: 40 }}>
        <Text style={{ color: '#666', fontSize: 15 }}>Don’t worry! Just fill in your email and we’ll help you reset your password.</Text>
        <View
          style={{
            borderRadius: 4,
            width: '100%',
            marginTop: 20,
            backgroundColor: '#fff', elevation: 2
          }}
        >
          <TextInput
            style={{
              height: 52,
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: '#d3d3d3',
              marginBottom: 5,
              padding: 10,
            }}
            value={this.state.email}
            onChangeText={this.handleChange('email')}
            placeholder={'Email'}
          />
          <TouchableOpacity
            style={{
              width: '100%',
              height: 52,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this.handleSubmit}
          >
            <Text style={{ fontSize: 17, color: '#0291DD', fontWeight: 'bold' }}>
              Submit
          </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
          onPress={() => this.props.navigation.navigate('ForgotPasswordChange')}
        >
          <Text style={{ fontSize: 17, color: '#0291DD', fontWeight: 'bold' }}>
            Reset your Password
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const mapStateToProps = null;

const mapDispatchToProps = { forgotPasswordRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);