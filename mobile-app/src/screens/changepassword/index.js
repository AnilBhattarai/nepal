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
import { changePasswordRequest, clearErrorFiled } from '../../redux/auth/auth.actions';
import { selectAuthErrors } from '../../redux/auth/auth.selectors';
import { selectToken } from '../../redux/app/app.selectors';

class ChangePassword extends Component {
  state = {
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
    oldTextEntry: false,
    newTextEntry: false,
    confirmTextEntry: false,
  };
  componentDidMount() {
    this.props.clearErrorFiled();
  }
  handleSubmit = nextProps => {
    this.props.changePasswordRequest(this.state).then(() => {
      this.props.navigation.navigate('Userprofile');
    });
  };
  oldToggleEyes = () => {
    this.setState({
      oldTextEntry: !this.state.oldTextEntry,
    });
  };
  newToggleEyes = () => {
    this.setState({
      newTextEntry: !this.state.newTextEntry,
    });
  };
  confirmToggleEyes = () => {
    this.setState({
      confirmTextEntry: !this.state.confirmTextEntry,
    });
  };
  handleChange = name => text => this.setState({ [name]: text });
  render() {
    const { selectAuthErrors } = this.props;
    //console.log(selectAuthErrors)
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
          {/* <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>
            Change Password
          </Text> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderBottomColor: '#d3d3d3',
              marginTop: 20,
            }}
          >
            <TextInput
              style={{
                height: 40,
                // borderBottomWidth: 1,
                // borderBottomColor: '#d3d3d3',
                // marginBottom: 5,
                padding: 10,
              }}
              value={this.state.oldPassword}
              onChangeText={this.handleChange('oldPassword')}
              placeholder={'Old Password'}
              secureTextEntry={!this.state.oldTextEntry}
            />
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 90,
              }}
              onPress={this.oldToggleEyes}
            >
              {this.state.oldTextEntry === false ? (
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
          {/* {this.state.oldPassword === '' ? ( */}
          <View style={{ marginHorizontal: 20 }}>
            {Object.keys(selectAuthErrors).length > 0 && selectAuthErrors.oldPassword ? (
              <Text style={{ color: 'red', fontSize: 10 }}>
                {selectAuthErrors.oldPassword}
              </Text>
            ) : null}
          </View>
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
                // borderBottomWidth: 1,
                // borderBottomColor: '#d3d3d3',
                // marginBottom: 5,
                // marginTop: 20,
                // color: '#006395',
                padding: 10,
              }}
              value={this.state.newPassword}
              onChangeText={this.handleChange('newPassword')}
              placeholder={'New Password'}
              secureTextEntry={!this.state.newTextEntry}
            />
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 90,
              }}
              onPress={this.newToggleEyes}
            >
              {this.state.newTextEntry === false ? (
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
          {/* {this.state.newPassword === '' ? ( */}
          <View style={{ marginHorizontal: 20 }}>
            {Object.keys(selectAuthErrors).length > 0 && selectAuthErrors.newPassword ? (
              <Text style={{ color: 'red', fontSize: 10 }}>
                {selectAuthErrors.newPassword}
              </Text>
            ) : null}
          </View>
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
                // borderBottomWidth: 1,
                // borderBottomColor: '#d3d3d3',
                // marginBottom: 5,
                // marginTop: 20,
                // color: '#006395',
                padding: 10,
              }}
              value={this.state.newPassword2}
              onChangeText={this.handleChange('newPassword2')}
              placeholder={'Confirm New Password'}
              secureTextEntry={!this.state.confirmTextEntry}
            />
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 90,
              }}
              onPress={this.confirmToggleEyes}
            >
              {this.state.confirmTextEntry === false ? (
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
          {/* {this.state.newPassword2 === '' ? ( */}
          <View style={{ marginHorizontal: 20 }}>
            {Object.keys(selectAuthErrors).length > 0 && selectAuthErrors.newPassword2 ? (
              <Text style={{ color: 'red', fontSize: 10 }}>
                {selectAuthErrors.newPassword2}
              </Text>
            ) : null}
          </View>
          {/* ) : null} */}
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
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  token: selectToken,
  selectAuthErrors,
});

const mapDispatchToProps = { changePasswordRequest, clearErrorFiled };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword);
