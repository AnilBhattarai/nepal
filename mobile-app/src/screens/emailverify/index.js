/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Toast from 'react-native-tiny-toast';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  verifyEmailData,
  setVerifyEmailData,
  resendVerifyEmailData,
  setResendVerifyEmailData,
  profileInfo,
} from '../../redux/auth/auth.actions';
import {
  selectVerifyEmail,
  selectVerifyEmailData,
  selectResendVerifyEmail,
  selectResendVerifyEmailData,
  selectData,
  selectAuthResponse,
} from '../../redux/auth/auth.selectors';

class VerifyEmail extends Component {
  // state = {
  //   email: '',
  // };
  handleBackPress = () => {
    console.log('object');
    return false;
  };
  componentDidMount() {
    // this.backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.handleBackPress,
    // );
    //console.log(this.props.navigation.getParam('email'));
    this.props.setVerifyEmailData({
      key: 'email',
      value: this.props.navigation.getParam('email'),
    });
    this.props.setResendVerifyEmailData({
      key: 'email',
      value: this.props.navigation.getParam('email'),
    });
  }
  handleSubmit = async () => {
    // const { errors } = this.props;
    await this.props.verifyEmailData(this.props.selectVerifyEmail);
    const data = await this.props.response;
    if (data.success === true) {
      this.props.profileInfo();
      this.props.navigation.navigate('Userprofile');
    } else {
      console.log('error');
    }
  };
  handleResendVerification = () => {
    this.props.resendVerifyEmailData(this.props.selectResendVerifyEmail);
  };
  onCodeSelected = text => {
    //console.log('text code', text);
    this.props.setVerifyEmailData({
      key: 'code',
      value: text,
    });
  };
  handleChange = name => text => this.setState({ [name]: text });
  render() {
    const { selectVerifyEmail, selectVerifyEmailData } = this.props;
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 32,
          marginTop: 40,
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#d3d3d3',
            padding: 8,
            width: '100%',
            borderRadius: 4,
          }}
          value={selectVerifyEmailData.code}
          onChangeText={text => this.onCodeSelected(text)}
          placeholder={'Enter Code'}
        />
        <TouchableOpacity
          style={{
            marginTop: 20,
            height: 44,
            backgroundColor: '#0291DD',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
          }}
          onPress={this.handleSubmit}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
            Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 20,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={this.handleResendVerification}
        >
          <Text style={{ color: '#4267B2', fontSize: 15, fontWeight: 'bold' }}>
            Resend Verification
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  selectVerifyEmail,
  selectVerifyEmailData,
  selectResendVerifyEmail,
  selectResendVerifyEmailData,
  data: selectData,
  response: selectAuthResponse,
});

const mapDispatchToProps = {
  verifyEmailData,
  setVerifyEmailData,
  resendVerifyEmailData,
  setResendVerifyEmailData,
  profileInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyEmail);
