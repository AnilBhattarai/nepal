/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Picker,
  Modal,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { IMAGE_URL } from '../../api';
import tempImg3 from '../../../assets/home.png';
import { enumsData } from '../../redux/enums/enums.actions';
import { selectEnumsData } from '../../redux/enums/enums.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setPostPropertyValueLocationProperty } from '../../redux/property/property.actions';
import {
  selectLocationPropertyData,
  selectPropertyDataBuilding,
  selectMediaData,
  selectPropertyDataBasic,
  selectPropertyData,
  selectPropertyTags,
  selectDataErrors,
  selectDataLoading,
  selectPostPropertyLoading,
  selectPostPropertyResponse,
} from '../../redux/property/property.selectors';
import {
  setPostPropertyValueBuilding,
  setPostPropertyValueMedia,
  setPostPropertyValueBasic,
  postPropertyData,
  setPostPropertyValueTags,
  clearPostPropertyErrorField,
  clearPostPropertyField,
} from '../../redux/property/property.actions';
import { mediaUpload } from '../../redux/property/property.actions';
import Ionicon from 'react-native-vector-icons/Ionicons';

class AddProperty3 extends Component {
  state = {
    modalVisible: false,
    showCamera: false,
    image: null,
    tags: '',
    url: '',
  };
  async componentDidMount() {
    try {
      this.props.clearPostPropertyErrorField();
      await this.props.enumsData();
    } catch (error) {
      //do sth
      console.log(error);
    }
  }

  handleCall = () => {
    Linking.openURL('tel:+01-4793536');
  };

  handleGallery = async () => {
    // const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    // // console.log(permission, 'camera roll permission');
    // if (permission.status === 'granted') {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      //not granted
      console.log('not granted');
      // alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    const splits = result.uri.split('/');
    const name = splits[splits.length - 1];
    this.props.mediaUpload({
      uri: result.uri,
      name,
      type: name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
    });

    // } else {
    //   alert('Please Provide Gallery Permission!')
    // }
    this.setModalVisible(false);
  };

  handleCamera = async () => {
    // const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    // //console.log(permission, 'camera roll permission');
    // if (permission.status === 'granted') {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    //  console.log(result, 'hello');

    if (result.cancelled) {
      //not granted
      console.log('not granted');
      // alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    const splits = result.uri.split('/');
    const name = splits[splits.length - 1];
    this.props.mediaUpload({
      uri: result.uri,
      name,
      type: name.substr(name.length - 3) === 'png' ? 'image/png' : 'image/jpeg',
    });
    // } else {
    //   alert('Please Provide Camera Permission! ')
    // }
    this.setModalVisible(false);
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  handleChange = (name) => (text) => this.setState({ [name]: text });

  onAmenitiesSelected = (id) => {
    // console.log(id, 'console');
    const {
      selectPropertyDataBuilding: { amenities },
    } = this.props;
    if (amenities.includes(id)) {
      this.props.setPostPropertyValueBuilding({
        key: 'amenities',
        value: amenities.filter((each) => each !== id),
      });
    } else {
      this.props.setPostPropertyValueBuilding({
        key: 'amenities',
        value: [...amenities, id],
      });
    }
  };

  onDeleteTags = (index) => () => {
    const {
      selectPropertyData: { tags },
    } = this.props;

    const chipData = [...tags];

    chipData.splice(index, 1);
    this.props.setPostPropertyValueTags([...chipData]);
  };
  onDeleteSelected = (id) => {
    this.props.setPostPropertyValueMedia({
      key: 'images',
      value: id,
    });
  };

  onTagsSelected = () => {
    const value = this.state.tags;
    const {
      selectPropertyData: { tags },
    } = this.props;
    if (tags.includes(value) || value === '' || value.trim() === '') {
      return null;
    } else {
      this.props.setPostPropertyValueTags([...tags, value]);
    }
    this.setState({ tags: '' });
  };
  onPropertyLocationValueSelected = (id, key) => {
    this.props.setPostPropertyValueLocationProperty({
      key,
      value: id,
    });
  };
  onBuildingSelected = (key, value) => {
    //console.log(value, key, 'value, key');
    this.props.setPostPropertyValueBuilding({
      // key: 'property_purpose',
      key,
      value,
    });
  };
  onMediaSelected = () => {
    const link = this.state.url;
    const Url = link.split('/');
    const name = Url[Url.length - 1];
    this.props.setPostPropertyValueMedia({
      key: 'youtube_video_id',
      value: name,
    });
  };
  onBasicSelected = (key, value) => {
    //console.log(value, key, 'value, key');
    this.props.setPostPropertyValueBasic({
      // key: 'property_purpose',
      key,
      value,
    });
  };
  onPostNow = async () => {
    if (
      this.props.selectPropertyData.media.images.length < 1 ||
      this.props.selectPropertyData.basic.title === '' ||
      this.props.selectPropertyData.basic.description === '' ||
      this.props.selectPropertyData.tags.length < 1
    ) {
      this.props.postPropertyData(this.props.selectPropertyData);
    } else {
      const link = this.state.url;
      const Url = link.split('/');
      const name = Url[Url.length - 1];

      const image_id = this.props.selectPropertyData.media.images.map(
        function image(each) {
          return {
            id: each.id._id,
            caption: each.caption,
          };
        },
      );
      let main_data = {};
      main_data = {
        ...this.props.selectPropertyData,
        media: {
          images: [...image_id],
          youtube_video_id: name,
        },
      };
      await this.props.postPropertyData(main_data);
    }
    const data = await this.props.response;
    if (data.success === true) {
      this.props.navigation.navigate('Success');
      this.props.clearPostPropertyErrorField();
      this.props.clearPostPropertyField();
    } else if (this.props.selectDataErrors.success === false) {
      alert('Input Error!');
    }
  };
  render() {
    const {
      data,
      selectEnumsData,
      selectPropertyDataBuilding,
      selectPropertyDataBasic,
      media,
      selectDataErrors,
      selectPropertyData,
      selectPropertyTags,
    } = this.props;
    const AD = [
      { name: 'January', id: 1 },
      { name: 'February', id: 2 },
      { name: 'March', id: 3 },
      { name: 'April', id: 4 },
      { name: 'May', id: 5 },
      { name: 'June', id: 6 },
      { name: 'July', id: 7 },
      { name: 'August', id: 8 },
      { name: 'September', id: 9 },
      { name: 'October', id: 10 },
      { name: 'November', id: 11 },
      { name: 'December', id: 12 },
    ];
    const BS = [
      { name: 'Baishak', id: 1 },
      { name: 'Jestha', id: 2 },
      { name: 'Ashad', id: 3 },
      { name: 'Shrawan', id: 4 },
      { name: 'Bhadra', id: 5 },
      { name: 'Ashwin', id: 6 },
      { name: 'Kartik', id: 7 },
      { name: 'Mangshir', id: 8 },
      { name: 'Poush', id: 9 },
      { name: 'Magh', id: 10 },
      { name: 'Falgun', id: 11 },
      { name: 'Chaitra', id: 12 },
    ];
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3FBFF' }}>
        <View
          style={{
            flexDirection: 'row',
            height: 56,
            alignItems: 'center',
            marginTop: 22,
            marginHorizontal: 16,
          }}
        >
          <TouchableOpacity
            style={{ width: 48, height: 56, justifyContent: 'center' }}
            onPress={() => this.props.navigation.navigate('AddProperty2')}
          >
            <Ionicon size={22} name="md-arrow-back" />
            {/* <Image
              style={{ height: 25, width: 25 }}
              source={require('../../../assets/left_blue.png')}
            /> */}
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: '#333',
                fontWeight: 'bold',
                fontSize: 18,
              }}
            >
              Post Property
            </Text>
            <Text style={{ color: '#666666', fontSize: 10 }}>Step 3 of 3</Text>
          </View>
          <TouchableOpacity
            onPress={this.onPostNow}
            style={{
              fontWeight: 'bold',
              borderRadius: 4,
              backgroundColor: '#0291DD',
              paddingHorizontal: 16,
              paddingVertical: 4,
              width: 80,
            }}
          >
            {this.props.postLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{ color: '#fff', fontSize: 14, letterSpacing: 0.6 }}>
                POST
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <ScrollView
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1, marginBottom: 20, marginHorizontal: 16 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  height: 80,
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  marginTop: 30,
                  elevation: 4,
                }}
              >
                <View style={{ width: '85%', marginLeft: 10 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
                      color: '#4A4A4A',
                    }}
                  >
                    If you have any difficulty in filling the form,{'\n'}Call us
                    01-4793536
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#4CD964',
                    width: '15%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderBottomLeftRadius: 40,
                    borderTopLeftRadius: 40,
                    borderStartWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#4CD964',
                    borderTopRightRadius: 5,
                    borderBottomEndRadius: 4,
                  }}
                >
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require('../../../assets/phone.png')}
                  />
                </View>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                  }}
                >
                  TOTAL AREA
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                }}
              >
                <TextInput
                  style={{
                    height: 40,
                    width: 150,
                    borderWidth: 1,
                    borderColor: '#C8C7CC',
                    borderRadius: 5,
                    backgroundColor: '#fff',
                    padding: 10,
                  }}
                  value={data.total_area}
                  placeholder={'Area'}
                  onChangeText={(text) =>
                    this.onPropertyLocationValueSelected(text, 'total_area')
                  }
                  keyboardType={'number-pad'}
                />
                <View
                  style={{
                    borderRadius: 5,
                    borderColor: '#C8C7CC',
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    height: 40,
                    flex: 1,
                    justifyContent: 'center',
                    marginLeft: 5,
                  }}
                >
                  <RNPickerSelect
                    style={pickerStyle}
                    placeholder={{
                      label: 'Area Unit',
                      value: null,
                    }}
                    onValueChange={(value, itemIndex) =>
                      this.onPropertyLocationValueSelected(
                        value,
                        'total_area_unit',
                      )
                    }
                    items={
                      selectEnumsData.area_unit
                        ? selectEnumsData.area_unit.map(function type(each) {
                            return {
                              label: each.title,
                              value: each._id,
                              key: each._id,
                            };
                          })
                        : []
                    }
                  />
                  {/* <Picker
                    selectedValue={data.total_area_unit}
                    style={{
                      width: 150,
                      height: 34,
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.onPropertyLocationValueSelected(
                        itemValue,
                        'total_area_unit',
                      )
                    }
                  >
                    {selectEnumsData.area_unit ? (
                      selectEnumsData.area_unit.map(each => (
                        <Picker.Item
                          label={each.title}
                          value={each._id}
                          key={each._id}
                        />
                      ))
                    ) : (
                        <Text>loading...</Text>
                      )}
                  </Picker> */}
                </View>
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  {selectPropertyData.location_property.total_area === '' ? (
                    <View
                      style={{
                        marginHorizontal: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {Object.keys(selectDataErrors).length > 0 ? (
                        <Text style={{ color: 'red', fontSize: 10 }}>
                          {selectDataErrors.errors.location_property.total_area}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                </View>
                <View>
                  {selectPropertyData.location_property.total_area_unit ===
                    '' ? (
                      <View
                        style={{
                          marginHorizontal: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {Object.keys(selectDataErrors).length > 0 ? (
                          <Text style={{ color: 'red', fontSize: 10 }}>
                            {
                              selectDataErrors.errors.location_property
                                .total_area_unit
                            }
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                </View>
              </View> */}
              {this.props.selectPropertyData.basic.property_category ===
              '5d662c7b8f12c7035cd39315' ? null : (
                <View>
                  <View style={{ marginTop: 20 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'normal',
                        marginTop: 10,
                      }}
                    >
                      BUILT UP AREA
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                    }}
                  >
                    <TextInput
                      style={{
                        height: 40,
                        width: 150,
                        borderWidth: 1,
                        borderColor: '#C8C7CC',
                        borderRadius: 5,
                        padding: 10,
                        backgroundColor: '#fff',
                      }}
                      value={data.built_area}
                      placeholder={'Area'}
                      onChangeText={(text) =>
                        this.onPropertyLocationValueSelected(text, 'built_area')
                      }
                      keyboardType={'number-pad'}
                    />
                    <View
                      style={{
                        borderRadius: 5,
                        borderColor: '#C8C7CC',
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        height: 40,
                        flex: 1,
                        justifyContent: 'center',
                        marginLeft: 5,
                      }}
                    >
                      <RNPickerSelect
                        style={pickerStyle}
                        placeholder={{
                          label: 'Area Unit',
                          value: null,
                        }}
                        onValueChange={(value) =>
                          this.onPropertyLocationValueSelected(
                            value,
                            'built_area_unit',
                          )
                        }
                        items={
                          selectEnumsData.area_unit
                            ? selectEnumsData.area_unit.map(function type(
                                each,
                              ) {
                                return {
                                  label: each.title,
                                  value: each._id,
                                  key: each._id,
                                };
                              })
                            : []
                        }
                      />
                    </View>
                  </View>

                  {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View>
                        {selectPropertyData.location_property.built_area ===
                          '' ? (
                            <View
                              style={{
                                marginHorizontal: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              {Object.keys(selectDataErrors).length > 0 ? (
                                <Text style={{ color: 'red', fontSize: 10 }}>
                                  {
                                    selectDataErrors.errors.location_property
                                      .built_area
                                  }
                                </Text>
                              ) : null}
                            </View>
                          ) : null}
                      </View>
                      <View>
                        {selectPropertyData.location_property.built_area_unit ===
                          '' ? (
                            <View
                              style={{
                                marginHorizontal: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              {Object.keys(selectDataErrors).length > 0 ? (
                                <Text style={{ color: 'red', fontSize: 10 }}>
                                  {
                                    selectDataErrors.errors.location_property
                                      .built_area_unit
                                  }
                                </Text>
                              ) : null}
                            </View>
                          ) : null}
                      </View>
                    </View> */}
                </View>
              )}
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                  }}
                >
                  PROPERTY FACE
                </Text>
              </View>
              <View
                style={{
                  borderRadius: 5,
                  borderColor: '#C8C7CC',
                  borderWidth: 1,
                  backgroundColor: '#fff',
                  height: 40,
                  flex: 1,
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                <RNPickerSelect
                  style={pickerStyle}
                  placeholder={{
                    label: 'Property Face',
                    value: null,
                  }}
                  onValueChange={(value) =>
                    this.onPropertyLocationValueSelected(value, 'property_face')
                  }
                  items={
                    selectEnumsData.property_face
                      ? selectEnumsData.property_face.map(function type(each) {
                          return {
                            label: each.title,
                            value: each._id,
                            key: each._id,
                          };
                        })
                      : []
                  }
                />
              </View>
              {/* <View>
                {selectPropertyData.location_property.property_face === '' ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {
                          selectDataErrors.errors.location_property
                            .property_face
                        }
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View> */}
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                  }}
                >
                  ROAD ACCESS
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                }}
              >
                <TextInput
                  style={{
                    height: 40,
                    width: 150,
                    borderWidth: 1,
                    borderColor: '#C8C7CC',
                    borderRadius: 5,
                    padding: 10,
                    backgroundColor: '#fff',
                  }}
                  value={data.road_access_value}
                  onChangeText={(text) =>
                    this.onPropertyLocationValueSelected(
                      text,
                      'road_access_value',
                    )
                  }
                  keyboardType={'number-pad'}
                  placeholder={'Road Width'}
                />
                <View
                  style={{
                    borderRadius: 5,
                    borderColor: '#C8C7CC',
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    height: 40,
                    flex: 1,
                    justifyContent: 'center',
                    marginLeft: 5,
                  }}
                >
                  <RNPickerSelect
                    style={pickerStyle}
                    placeholder={{
                      label: 'Road Length Unit',
                      value: null,
                    }}
                    onValueChange={(value) =>
                      this.onPropertyLocationValueSelected(
                        value,
                        'road_access_length_unit',
                      )
                    }
                    items={
                      selectEnumsData.length_unit
                        ? selectEnumsData.length_unit.map(function type(each) {
                            return {
                              label: each.title,
                              value: each._id,
                              key: each._id,
                            };
                          })
                        : []
                    }
                  />
                </View>
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View>
                  {selectPropertyData.location_property.road_access_value ===
                    '' ? (
                      <View
                        style={{
                          marginHorizontal: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {Object.keys(selectDataErrors).length > 0 ? (
                          <Text style={{ color: 'red', fontSize: 10 }}>
                            {
                              selectDataErrors.errors.location_property
                                .road_access_value
                            }
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                </View>
                <View>
                  {selectPropertyData.location_property
                    .road_access_length_unit === '' ? (
                      <View
                        style={{
                          marginHorizontal: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {Object.keys(selectDataErrors).length > 0 ? (
                          <Text style={{ color: 'red', fontSize: 10 }}>
                            {
                              selectDataErrors.errors.location_property
                                .road_access_length_unit
                            }
                          </Text>
                        ) : null}
                      </View>
                    ) : null}
                </View>
              </View> */}
              <View
                style={{
                  borderRadius: 5,
                  borderColor: '#C8C7CC',
                  borderWidth: 1,
                  backgroundColor: '#fff',
                  height: 40,
                  flex: 1,
                  justifyContent: 'center',
                  marginTop: 10,
                }}
              >
                <RNPickerSelect
                  style={pickerStyle}
                  placeholder={{
                    label: 'Road Type',
                    value: null,
                  }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.onPropertyLocationValueSelected(
                      itemValue,
                      'road_access_road_type',
                    )
                  }
                  items={
                    selectEnumsData.road_type
                      ? selectEnumsData.road_type.map(function type(each) {
                          return {
                            label: each.title,
                            value: each._id,
                            key: each._id,
                          };
                        })
                      : []
                  }
                />
              </View>
              <View>
                {selectPropertyData.location_property.road_access_road_type ===
                '' ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {
                          selectDataErrors.errors.location_property
                            .road_access_road_type
                        }
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
              {this.props.selectPropertyData.basic.property_category ===
              '5d662c7b8f12c7035cd39315' ? null : (
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ marginTop: 20, flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'normal',
                          marginTop: 10,
                        }}
                      >
                        BUILT YEAR
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <View
                          style={{
                            borderRadius: 5,
                            borderColor: '#C8C7CC',
                            borderWidth: 1,
                            backgroundColor: '#fff',
                            height: 40,
                            flex: 1,
                            justifyContent: 'center',
                            marginRight: 5,
                          }}
                        >
                          <RNPickerSelect
                            style={pickerStyle}
                            placeholder={{
                              label: 'Calendar Type',
                              value: null,
                            }}
                            onValueChange={(itemValue, itemIndex) =>
                              this.onBuildingSelected(
                                'calender_type',
                                itemValue,
                              )
                            }
                            items={
                              selectEnumsData.calender_type
                                ? selectEnumsData.calender_type.map(
                                    function type(each) {
                                      return {
                                        label: each.title,
                                        value: each._id,
                                        key: each._id,
                                      };
                                    },
                                  )
                                : []
                            }
                          />
                        </View>
                      </View>
                    </View>
                    <View style={{ marginTop: 20, flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'normal',
                          marginTop: 10,
                        }}
                      >
                        BUILT MONTH
                      </Text>
                      <View
                        style={{
                          borderRadius: 5,
                          borderColor: '#C8C7CC',
                          borderWidth: 1,
                          backgroundColor: '#fff',
                          height: 40,
                          flex: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <RNPickerSelect
                          style={pickerStyle}
                          placeholder={{
                            label: 'Built Month',
                            value: null,
                          }}
                          onValueChange={(itemValue, itemIndex) =>
                            this.onBuildingSelected('built_month', itemValue)
                          }
                          items={
                            selectPropertyDataBuilding.calender_type ===
                            '5d6cc52873552113c0396023'
                              ? BS.map(function type(each) {
                                  return {
                                    label: each.name,
                                    value: each.id,
                                    key: each.id,
                                  };
                                })
                              : AD.map(function type(each) {
                                  return {
                                    label: each.name,
                                    value: each.id,
                                    key: each.id,
                                  };
                                })
                          }
                        />
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: 10 }}>
                    <TextInput
                      style={{
                        height: 40,
                        borderWidth: 1,
                        borderColor: '#C8C7CC',
                        borderRadius: 5,
                        padding: 10,
                        flex: 1,
                        marginRight: 4,
                        backgroundColor: '#fff',
                      }}
                      value={selectPropertyDataBuilding.built_year}
                      onChangeText={(text) =>
                        this.onBuildingSelected('built_year', text)
                      }
                      placeholder={'Year'}
                      keyboardType={'number-pad'}
                    />
                  </View>
                  {/* <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View>
                        {selectPropertyData.building.built_year === '' ? (
                          <View
                            style={{
                              marginHorizontal: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {Object.keys(selectDataErrors).length > 0 ? (
                              <Text style={{ color: 'red', fontSize: 10 }}>
                                {selectDataErrors.errors.building.built_year}
                              </Text>
                            ) : null}
                          </View>
                        ) : null}
                      </View>
                      <View>
                        {selectPropertyData.building.calender_type === '' ? (
                          <View
                            style={{
                              marginHorizontal: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {Object.keys(selectDataErrors).length > 0 ? (
                              <Text style={{ color: 'red', fontSize: 10 }}>
                                {selectDataErrors.errors.building.calender_type}
                              </Text>
                            ) : null}
                          </View>
                        ) : null}
                      </View>
                      <View>
                        {selectPropertyData.building.built_month === '' ? (
                          <View
                            style={{
                              marginHorizontal: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {Object.keys(selectDataErrors).length > 0 ? (
                              <Text style={{ color: 'red', fontSize: 10 }}>
                                {selectDataErrors.errors.building.built_month}
                              </Text>
                            ) : null}
                          </View>
                        ) : null}
                      </View>
                    </View> */}
                </View>
              )}
              {this.props.selectPropertyData.basic.property_category ===
              '5d662c7b8f12c7035cd39315' ? null : (
                <React.Fragment>
                  <View style={{ marginTop: 20 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 'normal',
                        marginTop: 10,
                        marginHorizontal: 10,
                      }}
                    >
                      AMENITIES
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                  >
                    {selectEnumsData.amenities ? (
                      selectEnumsData.amenities.map((each) => (
                        <TouchableOpacity
                          activeOpacity={0.8}
                          key={each._id}
                          onPress={() => this.onAmenitiesSelected(each._id)}
                          style={{
                            backgroundColor: '#fff',
                            borderColor:
                              selectPropertyDataBuilding.amenities.includes(
                                each._id,
                              )
                                ? '#0291DD'
                                : 'transparent',
                            borderWidth: 1,
                            backgroundColor:
                              selectPropertyDataBuilding.amenities.includes(
                                each._id,
                              )
                                ? '#F5F9FF'
                                : '#fff',
                            borderRadius: 4,
                            marginTop: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 4,
                            width: '31%',
                            marginRight: '2%',
                            elevation: 1,
                          }}
                        >
                          <View style={{ width: 24, height: 24, margin: 8 }}>
                            <Image
                              resizeMode="contain"
                              style={{
                                flex: 1,
                                height: undefined,
                                width: undefined,
                                opacity: 0.5,
                              }}
                              source={
                                each && each.media.path.length > 0
                                  ? {
                                      uri: `${IMAGE_URL}${each.media.path}`,
                                    }
                                  : tempImg3
                              }
                            />
                          </View>

                          <Text
                            numberOfLines={1}
                            style={{
                              color: '#999',
                              marginBottom: 4,
                            }}
                          >
                            {each.title}
                          </Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text>loading...</Text>
                    )}
                  </View>
                </React.Fragment>
              )}
              <View>
                <TouchableOpacity
                  onPress={() => this.setModalVisible(true)}
                  style={{
                    height: 100,
                    backgroundColor: '#fff',
                    borderColor: '#d3d3d3',
                    borderWidth: 1,
                    borderStyle: 'dotted',
                    borderRadius: 5,
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    paddingHorizontal: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <Image
                    style={{ height: 25, width: 25 }}
                    source={require('../../../assets/imageupload.png')}
                  />
                  <Text style={{ color: '#0291DD' }}>UPLOAD PHOTOS</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginHorizontal: 20,
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  marginTop: 5,
                }}
              >
                {media.images
                  ? media.images.map((each) => (
                      <View key={each.id._id}>
                        <ImageBackground
                          style={{ height: 100, width: 100 }}
                          source={require('../../../assets/image_loader.gif')}
                        >
                          <Image
                            style={{
                              height: 100,
                              width: 100,
                              borderWidth: 0.5,
                              borderColor: '#fff',
                              borderRadius: 5,
                            }}
                            source={
                              each && each.id.path
                                ? {
                                    uri: `${IMAGE_URL}${each.id.path}`,
                                  }
                                : tempImg3
                            }
                          />
                        </ImageBackground>
                        <TouchableOpacity
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => this.onDeleteSelected(each.id._id)}
                        >
                          <Ionicon size={20} name="md-close" />
                        </TouchableOpacity>
                      </View>
                    ))
                  : null}
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {this.props.loading && <ActivityIndicator />}
              </View>
              <View>
                {selectPropertyData.media.images.length < 1 ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 &&
                    selectDataErrors.errors &&
                    selectDataErrors.errors.media ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {selectDataErrors.errors.media.images}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <View>
                <Modal
                  style={{ justifyContent: 'center' }}
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    this.setModalVisible(false);
                  }}
                >
                  <View
                    style={{
                      height: Dimensions.get('window').height,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.setModalVisible(false)}
                      style={{ flex: 1 }}
                    />
                    <View
                      style={{
                        backgroundColor: '#fff',
                        height: 170,
                        marginTop: 20,
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
                          height: 34,
                          backgroundColor: '#0291DD',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderColor: '#0291DD',
                          borderWidth: 1,
                          borderRadius: 4,
                        }}
                        onPress={this.handleGallery}
                      >
                        <Text
                          style={{
                            color: 'white',
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
                          height: 34,
                          backgroundColor: '#0291DD',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderColor: '#0291DD',
                          borderWidth: 1,
                          borderRadius: 4,
                        }}
                        onPress={this.handleCamera}
                      >
                        <Text
                          style={{
                            color: 'white',
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
                          height: 34,
                          marginTop: 10,
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderColor: '#C8C7CC',
                          borderWidth: 1,
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
              </View>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                  }}
                >
                  YOUTUBE VIDEO URL
                </Text>
              </View>
              <TextInput
                style={{
                  height: 40,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#C8C7CC',
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 10,
                  backgroundColor: '#fff',
                }}
                value={this.state.url}
                onChangeText={this.handleChange('url')}
                placeholder={'Video Url'}
              />
              <View>
                {Object.keys(selectDataErrors).length > 0 &&
                selectDataErrors.errors &&
                selectDataErrors.errors.media ? (
                  <Text style={{ color: 'red', fontSize: 10 }}>
                    {selectDataErrors.errors.media.youtube_video_id}
                  </Text>
                ) : null}
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                  }}
                >
                  PROPERTY TITLE
                </Text>
              </View>
              <TextInput
                style={{
                  height: 40,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#C8C7CC',
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 10,
                  backgroundColor: '#fff',
                }}
                value={selectPropertyDataBasic.built_year}
                onChangeText={(text) => this.onBasicSelected('title', text)}
                placeholder={'Property Title'}
              />
              <View>
                {selectPropertyData.basic.title === '' ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 &&
                    selectDataErrors.errors &&
                    selectDataErrors.errors.basic ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {selectDataErrors.errors.basic.title}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                  }}
                >
                  DESCRIPTION
                </Text>
              </View>
              <TextInput
                style={{
                  height: 150,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#C8C7CC',
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 10,
                  backgroundColor: '#fff',
                }}
                value={selectPropertyDataBasic.description}
                onChangeText={(text) =>
                  this.onBasicSelected('description', text)
                }
                placeholder={'Description'}
              />
              <View>
                {selectPropertyData.basic.description === '' ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 &&
                    selectDataErrors.errors &&
                    selectDataErrors.errors.basic ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {selectDataErrors.errors.basic.description}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <View style={{ marginTop: 20 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 10,
                  }}
                >
                  TAGS
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              >
                <TextInput
                  style={{
                    height: 40,
                    width: '80%',
                    borderWidth: 1,
                    borderColor: '#C8C7CC',
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 10,
                    backgroundColor: '#fff',
                  }}
                  value={this.state.tags}
                  onChangeText={this.handleChange('tags')}
                  placeholder={'Tags'}
                />
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    width: 60,
                    height: 40,
                    backgroundColor: '#0291DD',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderColor: '#0291DD',
                    borderWidth: 1,
                    borderRadius: 4,
                  }}
                  onPress={this.onTagsSelected}
                >
                  <Text
                    style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around' }}
              >
                {selectPropertyTags &&
                Object.keys(selectPropertyTags).length > 0
                  ? selectPropertyTags.map((tag, index) => (
                      <View
                        key={`${tag}-${index}`}
                        style={{
                          marginTop: 10,
                          height: 40,
                          width: 60,
                          backgroundColor: '#d3d3d3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderColor: '#d3d3d3',
                          borderWidth: 1,
                          borderRadius: 10,
                        }}
                      >
                        <Text style={{ color: '#000', fontSize: 10 }}>
                          {tag}
                        </Text>
                        <TouchableOpacity
                          onPress={this.onDeleteTags(index)}
                          style={{
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            flex: 1,
                          }}
                        >
                          <Ionicon size={15} name="md-close" />
                        </TouchableOpacity>
                      </View>
                    ))
                  : null}
              </View>

              <View>
                {selectPropertyData.tags.length < 1 ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 &&
                    selectDataErrors.errors &&
                    selectDataErrors.errors.tags ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {selectDataErrors.errors.tags}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const pickerStyle = {
  inputIOS: {
    color: 'black',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: 'black',
  },
  placeholderColor: 'light-grey',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};
const mapStateToProps = createStructuredSelector({
  selectEnumsData,
  data: selectLocationPropertyData,
  selectPropertyDataBuilding,
  media: selectMediaData,
  selectPropertyDataBasic,
  selectPropertyData,
  selectPropertyTags,
  selectDataErrors,
  loading: selectDataLoading,
  postLoading: selectPostPropertyLoading,
  response: selectPostPropertyResponse,
});
const mapDispatchToProps = {
  enumsData,
  setPostPropertyValueLocationProperty,
  setPostPropertyValueBuilding,
  mediaUpload,
  setPostPropertyValueMedia,
  setPostPropertyValueBasic,
  postPropertyData,
  setPostPropertyValueTags,
  clearPostPropertyErrorField,
  clearPostPropertyField,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty3);
