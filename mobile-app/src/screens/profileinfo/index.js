/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  TextInput,
  Modal,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { profileInfo } from '../../redux/auth/auth.actions';
import { changeprofileInfo } from '../../redux/auth/auth.actions';
import { setProfileData } from '../../redux/auth/auth.actions';
import { profilePhotoUpload } from '../../redux/auth/auth.actions';
import { selectProfileInfo, selectLoading, selectImageLoading } from '../../redux/auth/auth.selectors';
import { selectToken } from '../../redux/app/app.selectors';
import { selectData } from '../../redux/auth/auth.selectors';
import { IMAGE_URL } from '../../api';
import tempImg3 from '../../../assets/home.png';
class ProfileInfo extends Component {
  state = {
    modalVisible: false,
    // name: this.props.data.name,
    // email: this.props.data.email,
    image: null,
    showCamera: false,
  };

  handleGallery = async () => {
    // const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    // console.log(permission, 'camera roll permission');
    // if (permission.status === 'granted') {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result, 'hello');

    if (result.cancelled) {
      //not granted
      console.log('not granted');
      //  alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    const splits = result.uri.split('/');
    const name = splits[splits.length - 1];
    this.props.profilePhotoUpload({
      uri: result.uri,
      name,
      type: name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
    });
    this.setModalVisible(false);
  };
  // handleCamera = async () => {
  //   // const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  //   // console.log(permission, 'camera roll permission');
  //   // if (permission.status === 'granted') {
  //   let result = await ImagePicker.launchCameraAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     // aspect: [4, 3],
  //     quality: 1,
  //   });

  //   //  console.log(result, 'hello');

  //   if (result.cancelled) {
  //     //not granted
  //     console.log('not granted');
  //     // alert('Sorry, we need camera roll permissions to make this work!');
  //     return;
  //   }
  //   if (!result.cancelled) {
  //     this.setState({ image: result.uri });
  //   }
  //   const splits = result.uri.split('/');
  //   const name = splits[splits.length - 1];
  //   this.props.profilePhotoUpload({
  //     uri: result.uri,
  //     name,
  //     type: name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
  //   });
  //   this.setModalVisible(false);
  // };
  handleCamera = () => {
    Permissions.askAsync(Permissions.CAMERA).then(({ status }) => {
      if (status === 'granted') {
        Permissions.askAsync(Permissions.CAMERA_ROLL).then(({ status }) => {
          if (status === 'granted') {
            ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              // aspect: [1, 1],
            }).then(result => {
              if (!result.cancelled) {
                this.setState({ image: result.uri });
              }
              const splits = result.uri.split('/');
              const name = splits[splits.length - 1];
              this.props.profilePhotoUpload({
                uri: result.uri,
                name,
                type: name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
              });
              this.setModalVisible(false);
            });
          }
        });
      }
    });
  };
  componentDidMount() {
    this.props.profileInfo();
  }
  handleChange = name => text =>
    this.props.setProfileData({ key: name, value: text });

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  _handleBack = () => {
    this.props.navigation.navigate('Userprofile');
  };

  handleSave = () => {
    const { name, email, image } = this.props.data;
    this.props.changeprofileInfo({
      name,
      email,
      image,
    });
    Keyboard.dismiss();
  };
  //  console.log(this.state.name, this.state.email, this.state.image);
  render() {
    //const { token } = this.props;
    //  console.log(this.props.data);
    //let { image } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3FBFF' }}>
        <KeyboardAvoidingView
          style={{ flex: 1, bottom: 10, marginHorizontal: 16, }}
          enabled
        >
          <ScrollView keyboardShouldPersistTaps={'always'}>
            {/* <View style={{ flexDirection: 'row', height: 56, alignItems: 'center', }}>
          <TouchableOpacity activeOpacity={1}style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }} onPress={this._handleBack}>
            <Image
              style={{ height: 25, width: 25, }}
              source={require('../../../assets/left_blue.png')}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 20,
              color: '#3F51B5',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Profile
            </Text>
        </View> */}

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center', paddingTop: 20,
              }}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {this.props.imageLoader && (
                  <ActivityIndicator />
                )}
              </View>
              <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(true)}>
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 100,
                  }}
                  source={
                    this.props.data && this.props.data.image && Object.keys(this.props.data.image).length > 0 && this.props.data.image.path.length > 0
                      ? {
                        uri: `${IMAGE_URL}${this.props.data.image.path.replace('public/', 'public/200-200/')}`,
                      }
                      : tempImg3
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={() => this.setModalVisible(true)}>
                <Text
                  style={{
                    fontSize: 14, marginTop: 10,
                    fontWeight: 'bold',
                    color: '#0291DD',
                  }}
                >
                  Change Picture
              </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={{
                height: 40,
                width: '100%',
                borderWidth: 1,
                borderColor: '#979797',
                borderRadius: 5,
                padding: 10,
                marginTop: 40,
              }}
              value={this.props.data.name}
              onChangeText={this.handleChange('name')}
              placeholder={'Name'}
            />
            <TextInput
              style={{
                height: 40,
                width: '100%',
                borderWidth: 1,
                borderColor: '#979797',
                borderRadius: 5,
                padding: 10,
                marginTop: 10,
              }}
              value={this.props.data.email}
              onChangeText={this.handleChange('email')}
              placeholder={'Email'}
            />
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  this.setModalVisible(false);
                }}
              >
                <View
                  style={{
                    height: Dimensions.get('window').height, backgroundColor: 'rgba(0,0,0,0.2)'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(false)}
                    style={{ flex: 1 }}
                  />
                  <View
                    style={{
                      backgroundColor: '#fff',
                      marginBottom: 50,
                      marginHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 5,
                      elevation: 8,

                    }}
                  >
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={this.handleGallery}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}
                      >
                        Upload From Gallery
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#0291DD',
                        borderTopColor: '#C8C7CC',
                        borderTopWidth: 1,
                      }}
                      onPress={this.handleCamera}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}
                      >
                        Take Picture
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: 50,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopColor: '#C8C7CC',
                        borderTopWidth: 1,
                        borderRadius: 4,
                      }}
                      onPress={() => this.setModalVisible(false)}
                    >
                      <Text
                        style={{
                          color: '#FF3B30',
                          fontSize: 15,
                          fontWeight: 'bold',
                        }}
                      >
                        Cancel
                    </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  width: '100%',
                  height: 40,
                  backgroundColor: '#0291DD',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}
                onPress={this.handleSave}
              >
                <Text
                  style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
                >
                  Update Profile
              </Text>
              </TouchableOpacity>
              <View style={{ marginTop: 5 }}>
                {this.props.loading && (
                  <ActivityIndicator />
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: selectData,
  token: selectToken,
  selectProfileInfo,
  loading: selectLoading,
  imageLoader: selectImageLoading,
});
const mapDispatchToProps = {
  profileInfo,
  changeprofileInfo,
  profilePhotoUpload,
  setProfileData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
