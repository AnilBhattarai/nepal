/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { enumsData } from '../../redux/enums/enums.actions';
import { selectEnumsData } from '../../redux/enums/enums.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { setPostPropertyValuePrice } from '../../redux/property/property.actions';
import { selectPropertyDataPrice } from '../../redux/property/property.selectors';
import {
  setPostPropertyValueAddress,
  clearPostPropertyErrorField,
  setPostPropertyValueMap,
} from '../../redux/property/property.actions';
import {
  selectPropertyDataAddress,
  selectDataErrors,
  selectPropertyData,
  selectPropertyMap,
} from '../../redux/property/property.selectors';
import { selectLocationData } from '../../redux/location/location.selectors';
import { locationData } from '../../redux/location/location.actions';
import {
  setPostPropertyValueBuildingNoOf,
  setPostPropertyValueBuilding,
  postPropertyData,
} from '../../redux/property/property.actions';
import { selectPropertyDataBuilding } from '../../redux/property/property.selectors';
import Ionicon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';

class AddProperty2 extends Component {
  async componentDidMount() {
    try {
      await this.props.enumsData();
      await this.props.locationData();
    } catch (error) {
      console.log(error);
    }
  }
  handleCall = () => {
    Linking.openURL('tel:+01-4793536');
  };
  onPriceValueSelected = (id, key) => {
    this.props.setPostPropertyValuePrice({
      key,
      value: id,
    });
  };
  onAddressValueSelected = (id, key) => {
    if (
      this.props.selectPropertyData.basic.property_category ===
      '5d662c7b8f12c7035cd39315'
    ) {
      let defaultValue = {
        state_id: '',
        district_id: '',
        city_id: '',
        area_id: '',
      };
      if (key === 'state_id') {
        defaultValue.state_id = id;
      } else if (key === 'district_id') {
        defaultValue.state_id = this.props.selectPropertyDataAddress.state_id;
        defaultValue.district_id = id;
      } else if (key === 'city_id') {
        defaultValue.state_id = this.props.selectPropertyDataAddress.state_id;
        defaultValue.district_id =
          this.props.selectPropertyDataAddress.district_id;
        defaultValue.city_id = id;
      } else {
        defaultValue = {
          ...this.props.selectPropertyDataAddress,
          [key]: id,
        };
      }
      this.props.setPostPropertyValueAddress({
        value: defaultValue,
      });
    } else {
      let defaultValue = {
        state_id: '',
        district_id: '',
        city_id: '',
        area_id: '',
        house_no: '',
      };
      if (key === 'state_id') {
        defaultValue.state_id = id;
      } else if (key === 'district_id') {
        defaultValue.state_id = this.props.selectPropertyDataAddress.state_id;
        defaultValue.district_id = id;
      } else if (key === 'city_id') {
        defaultValue.state_id = this.props.selectPropertyDataAddress.state_id;
        defaultValue.district_id =
          this.props.selectPropertyDataAddress.district_id;
        defaultValue.city_id = id;
      } else {
        defaultValue = {
          ...this.props.selectPropertyDataAddress,
          [key]: id,
        };
      }
      this.props.setPostPropertyValueAddress({
        value: defaultValue,
      });
    }
  };

  onMapValueSelected = (key, value) => {
    const src = value.split('src="')[1].split(/[ "']/)[0];
    this.props.setPostPropertyValueMap({
      key,
      src,
    });
  };
  onNoOfRoomSelected = (key, value) => {
    this.props.setPostPropertyValueBuildingNoOf({
      // key: 'property_purpose',
      key,
      value,
    });
  };
  onBuildingSelected = (key, value) => {
    this.props.setPostPropertyValueBuilding({
      // key: 'property_purpose',
      key,
      value,
    });
  };
  onNextSelected = () => {
    if (
      this.props.selectPropertyData.price.value === '' ||
      this.props.selectPropertyData.price.label === '' ||
      this.props.selectPropertyData.address.state_id === '' ||
      this.props.selectPropertyData.address.district_id === '' ||
      this.props.selectPropertyData.address.city_id === '' ||
      this.props.selectPropertyData.address.area_id === ''
    ) {
      this.props.postPropertyData(this.props.selectPropertyData);
    } else {
      this.props.clearPostPropertyErrorField();
      this.props.navigation.navigate('AddProperty3');
    }
  };
  render() {
    const {
      data,
      selectEnumsData,
      selectLocationData,
      selectPropertyDataAddress,
      selectPropertyDataBuilding,
      selectDataErrors,
      selectPropertyData,
    } = this.props;
    const ROOM = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3FBFF' }}>
        <View
          style={{
            flexDirection: 'row',
            height: 56,
            alignItems: 'center',
            marginTop: 22,
            paddingHorizontal: 16,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{ width: 48, height: 56, justifyContent: 'center' }}
            onPress={() => this.props.navigation.navigate('AddProperty')}
          >
            <Ionicon size={22} name="md-arrow-back" />
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
            <Text style={{ color: '#666666', fontSize: 10 }}>Step 2 of 3</Text>
          </View>
          <TouchableOpacity
            onPress={this.onNextSelected}
            style={{
              fontWeight: 'bold',
              borderRadius: 4,
              backgroundColor: '#0291DD',
              paddingHorizontal: 16,
              paddingVertical: 4,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 14, letterSpacing: 0.6 }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <TouchableOpacity
              activeOpacity={1}
              activeOpacity={1}
              onPress={this.handleCall}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                borderRadius: 5,
                marginTop: 10,
                elevation: 4,
                marginHorizontal: 16,
              }}
            >
              <View
                style={{
                  flex: 1,
                  paddingVertical: 16,
                  paddingRight: 24,
                  paddingLeft: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: 'normal',
                    color: '#777',
                    lineHeight: 20,
                  }}
                >
                  If you have any difficulty in filling the form, Call us at
                  01-4793536
                </Text>
              </View>
              <View
                style={{
                  width: 50,
                  backgroundColor: '#4CD964',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomLeftRadius: 60,
                  borderTopLeftRadius: 60,
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
            </TouchableOpacity>
            <View style={{ marginTop: 20, marginHorizontal: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'normal',
                  marginBottom: 10,
                }}
              >
                PRICE
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
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
                    value={data.value}
                    onChangeText={(text) =>
                      this.onPriceValueSelected(text, 'value')
                    }
                    placeholder={'Rs.'}
                    keyboardType={'number-pad'}
                  />

                  {/* <Picker
                  selectedValue={data.label}
                  style={{
                    width: 100,
                    height: 34,
                  }}
                  name="label"
                  onValueChange={(itemValue, itemIndex) =>
                    this.onPriceValueSelected(itemValue, 'label')
                  }
                >
                  {selectEnumsData.price_label ? (
                    selectEnumsData.price_label.map(each => (
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
                      label: 'Price Unit',
                      value: null,
                    }}
                    onValueChange={(value) =>
                      this.onPriceValueSelected(value, 'label')
                    }
                    items={
                      selectEnumsData.price_label
                        ? selectEnumsData.price_label.map(function type(each) {
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
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                {selectPropertyData.price.value === '' ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 &&
                    selectDataErrors.errors &&
                    selectDataErrors.errors.price ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {selectDataErrors.errors.price.value}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <View>
                {selectPropertyData.price.label === '' ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 &&
                    selectDataErrors.errors &&
                    selectDataErrors.errors.price ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {selectDataErrors.errors.price.label}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </View>
            <View style={{ marginTop: 20, flex: 1, marginHorizontal: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'normal',
                  marginTop: 10,
                  marginBottom: 20,
                }}
              >
                ADDRESS
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                marginHorizontal: 16,
              }}
            >
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
                {Object.keys(selectLocationData).length > 0 && (
                  <RNPickerSelect
                    style={pickerStyle}
                    placeholder={{
                      label: 'Select State',
                      value: null,
                    }}
                    onValueChange={(value) =>
                      this.onAddressValueSelected(value, 'state_id')
                    }
                    items={
                      selectLocationData.allState
                        ? selectLocationData.allState.map(function type(each) {
                            return {
                              label: each.name,
                              value: each._id,
                              key: each._id,
                            };
                          })
                        : []
                    }
                  />
                )}
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
                }}
              >
                {Object.keys(selectLocationData).length > 0 && (
                  <RNPickerSelect
                    style={pickerStyle}
                    placeholder={{
                      label: 'Choose District',
                      value: null,
                    }}
                    onValueChange={(value) =>
                      this.onAddressValueSelected(value, 'district_id')
                    }
                    items={
                      selectLocationData.allDistrict &&
                      selectLocationData.allDistrict !== null &&
                      selectLocationData.allDistrict
                        .filter(
                          (each) =>
                            selectPropertyDataAddress.state_id &&
                            selectPropertyDataAddress.state_id ===
                              each.state_id,
                        )
                        .map(function type(each) {
                          return {
                            label: each.name,
                            value: each._id,
                            key: each._id,
                          };
                        })
                    }
                  />
                )}
              </View>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                {selectPropertyData.address.state_id === '' ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 &&
                    selectDataErrors.errors &&
                    selectDataErrors.errors.address ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {selectDataErrors.errors.address.state_id}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <View>
                {selectPropertyData.address.district_id === '' ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 &&
                    selectDataErrors.errors &&
                    selectDataErrors.errors.address ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {selectDataErrors.errors.address.district_id}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginHorizontal: 16,
              }}
            >
              <View
                style={{
                  borderRadius: 5,
                  borderColor: '#C8C7CC',
                  borderWidth: 1,
                  backgroundColor: '#fff',
                  height: 40,
                  flex: 1,
                  marginRight: 5,
                  justifyContent: 'center',
                }}
              >
                {Object.keys(selectLocationData).length > 0 && (
                  <RNPickerSelect
                    style={pickerStyle}
                    placeholder={{
                      label: 'Choose City',
                      value: null,
                    }}
                    onValueChange={(value) =>
                      this.onAddressValueSelected(value, 'city_id')
                    }
                    items={
                      selectLocationData.allVdc &&
                      selectLocationData.allVdc !== null &&
                      selectLocationData.allVdc
                        .filter(
                          (each) =>
                            selectPropertyDataAddress.district_id &&
                            selectPropertyDataAddress.district_id ===
                              each.district_id,
                        )
                        .map(function type(each) {
                          return {
                            label: each.name,
                            value: each._id,
                            key: each._id,
                          };
                        })
                    }
                  />
                )}
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
                }}
              >
                {Object.keys(selectLocationData).length > 0 && (
                  <RNPickerSelect
                    style={pickerStyle}
                    placeholder={{
                      label: 'Choose Area',
                      value: null,
                    }}
                    onValueChange={(value) =>
                      this.onAddressValueSelected(value, 'area_id')
                    }
                    items={
                      selectLocationData.allArea &&
                      selectLocationData.allArea !== null &&
                      selectLocationData.allArea
                        .filter(
                          (each) =>
                            selectPropertyDataAddress.city_id &&
                            selectPropertyDataAddress.city_id ===
                              each.vdcmunicipality_id,
                        )
                        .map(function type(each) {
                          return {
                            label: each.name,
                            value: each._id,
                            key: each._id,
                          };
                        })
                    }
                  />
                )}
              </View>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View>
                {selectPropertyData.address.city_id === '' ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 &&
                    selectDataErrors.errors &&
                    selectDataErrors.errors.address ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {selectDataErrors.errors.address.city_id}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <View>
                {selectPropertyData.address.area_id === '' ? (
                  <View
                    style={{
                      marginHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {Object.keys(selectDataErrors).length > 0 &&
                    selectDataErrors.errors &&
                    selectDataErrors.errors.address ? (
                      <Text style={{ color: 'red', fontSize: 10 }}>
                        {selectDataErrors.errors.address.area_id}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </View>
            {selectPropertyData.basic.property_category ===
            '5d662c7b8f12c7035cd39315' ? null : (
              <TextInput
                style={{
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#C8C7CC',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  marginTop: 10,
                  marginHorizontal: 16,
                  backgroundColor: '#fff',
                }}
                value={selectPropertyDataAddress.house_no}
                onChangeText={(text) =>
                  this.onAddressValueSelected(text, 'house_no')
                }
                placeholder={'House No., Near Baneshowr Chowk'}
              />
            )}
            <Text
              style={{
                fontSize: 11,
                fontWeight: 'normal',
                color: '#999',
                marginTop: 5,
                marginHorizontal: 16,
              }}
            >
              Above address will not be visible to others.
            </Text>
            {/* <TextInput
              style={{
                height: 34,
                borderWidth: 1,
                borderColor: '#C8C7CC',
                borderRadius: 5,
                paddingHorizontal: 10,
                marginTop: 10,
                marginHorizontal: 16,
                backgroundColor: '#fff',
              }}
              value={selectPropertyMap}
              onChangeText={text => this.onMapValueSelected('map_src', text)}
              placeholder={'< iFrame >'}
            /> */}
            {/* {selectPropertyData.basic.property_category === '5d662c7b8f12c7035cd39315' ? null :
              <View>
                {selectPropertyData.address.house_no === '' ?
                  <View style={{ marginHorizontal: 20, }}>
                    {Object.keys(selectDataErrors).length > 0 ?
                      <Text style={{ color: 'red', fontSize: 10 }}>{selectDataErrors.address.house_no}</Text>
                      : null}
                  </View>
                  : null}
              </View>
            } */}
            {this.props.selectPropertyData.basic.property_category ===
            '5d662c7b8f12c7035cd39315' ? null : (
              <View style={{ marginHorizontal: 16 }}>
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
                      marginTop: 10,
                    }}
                  >
                    BEDROOM
                  </Text>
                </View>
                <ScrollView
                  horizontal
                  style={{ flex: 1 }}
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                    }}
                  >
                    {ROOM.map((each) => (
                      <TouchableOpacity
                        key={each}
                        onPress={() => this.onNoOfRoomSelected('bedroom', each)}
                        style={{
                          height: 34,
                          width: 34,
                          backgroundColor: '#fff',
                          borderColor:
                            selectPropertyDataBuilding.bedroom === each
                              ? '#0291DD'
                              : '#999',
                          borderWidth: 1,
                          borderRadius: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 12,
                        }}
                      >
                        <Text style={{ color: '#999' }}>{each}</Text>
                      </TouchableOpacity>
                    ))}
                    <TextInput
                      style={{
                        height: 34,
                        width: 150,
                        borderWidth: 1,
                        borderColor: '#C8C7CC',
                        borderRadius: 5,
                        padding: 10,
                      }}
                      value={selectPropertyDataBuilding.bedroom}
                      onChangeText={(text) =>
                        this.onNoOfRoomSelected('bedroom', parseInt(text))
                      }
                      placeholder={'No. of Bedrooms'}
                      keyboardType={'number-pad'}
                    />
                  </View>
                </ScrollView>
                {/* <View>
                  {isNaN(selectPropertyData.building.no_of.bedroom) ?
                    <View style={{ marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                      {Object.keys(selectDataErrors).length > 0 ?
                        <Text style={{ color: 'red', fontSize: 10 }}>{selectDataErrors.errors.building.no_of.bedroom}</Text>
                        : null}
                    </View>
                    : null}
                </View> */}
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
                      marginTop: 10,
                    }}
                  >
                    KITCHEN
                  </Text>
                </View>
                <ScrollView
                  horizontal
                  style={{ flex: 1 }}
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                    }}
                  >
                    {ROOM.map((each) => (
                      <TouchableOpacity
                        key={each}
                        onPress={() => this.onNoOfRoomSelected('kitchen', each)}
                        style={{
                          height: 34,
                          width: 34,
                          backgroundColor: '#fff',
                          borderColor:
                            selectPropertyDataBuilding.kitchen === each
                              ? '#0291DD'
                              : '#999',
                          borderWidth: 1,
                          borderRadius: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 12,
                        }}
                      >
                        <Text style={{ color: '#999' }}>{each}</Text>
                      </TouchableOpacity>
                    ))}
                    <TextInput
                      style={{
                        height: 34,
                        width: 150,
                        borderWidth: 1,
                        borderColor: '#C8C7CC',
                        borderRadius: 5,
                        padding: 10,
                      }}
                      value={selectPropertyDataBuilding.kitchen}
                      onChangeText={(text) =>
                        this.onNoOfRoomSelected('kitchen', parseInt(text))
                      }
                      keyboardType={'number-pad'}
                      placeholder={'No. of Kitchens'}
                    />
                  </View>
                </ScrollView>
                {/* <View>
                  {isNaN(selectPropertyData.building.no_of.kitchen) ?
                    <View style={{ marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                      {Object.keys(selectDataErrors).length > 0 ?
                        <Text style={{ color: 'red', fontSize: 10 }}>{selectDataErrors.errors.building.no_of.kitchen}</Text>
                        : null}
                    </View>
                    : null}
                </View> */}
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
                      marginTop: 10,
                    }}
                  >
                    BATHROOM
                  </Text>
                </View>
                <ScrollView
                  horizontal
                  style={{ flex: 1 }}
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                    }}
                  >
                    {ROOM.map((each) => (
                      <TouchableOpacity
                        key={each}
                        onPress={() =>
                          this.onNoOfRoomSelected('bathroom', each)
                        }
                        style={{
                          height: 34,
                          width: 34,
                          backgroundColor: '#fff',
                          borderColor:
                            selectPropertyDataBuilding.bathroom === each
                              ? '#0291DD'
                              : '#999',
                          borderWidth: 1,
                          borderRadius: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginRight: 12,
                        }}
                      >
                        <Text style={{ color: '#999' }}>{each}</Text>
                      </TouchableOpacity>
                    ))}
                    <TextInput
                      style={{
                        height: 34,
                        width: 150,
                        borderWidth: 1,
                        borderColor: '#C8C7CC',
                        borderRadius: 5,
                        padding: 10,
                      }}
                      value={selectPropertyDataBuilding.bathroom}
                      onChangeText={(text) =>
                        this.onNoOfRoomSelected('bathroom', parseInt(text))
                      }
                      placeholder={'No. of Bathrooms'}
                      keyboardType={'number-pad'}
                    />
                  </View>
                </ScrollView>
                {/* <View>
                  {isNaN(selectPropertyData.building.no_of.bathroom) ?
                    <View style={{ marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                      {Object.keys(selectDataErrors).length > 0 ?
                        <Text style={{ color: 'red', fontSize: 10 }}>{selectDataErrors.errors.building.no_of.bathroom}</Text>
                        : null}
                    </View>
                    : null}
                </View> */}
              </View>
            )}
            {this.props.selectPropertyData.basic.property_category ===
            '5d662c7b8f12c7035cd39315' ? null : (
              <React.Fragment>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'normal',
                    marginTop: 20,
                    marginHorizontal: 16,
                  }}
                >
                  PARKING
                </Text>
                <TextInput
                  style={{
                    height: 40,
                    borderWidth: 1,
                    borderColor: '#C8C7CC',
                    borderRadius: 5,
                    padding: 10,
                    backgroundColor: '#fff',
                    marginHorizontal: 16,
                    marginTop: 10,
                  }}
                  value={selectPropertyDataBuilding.parking}
                  onChangeText={(text) =>
                    this.onBuildingSelected('parking', text)
                  }
                />
              </React.Fragment>
            )}
            <View style={{ height: 40 }} />
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
  data: selectPropertyDataPrice,
  selectEnumsData,
  selectLocationData,
  selectPropertyDataAddress,
  selectPropertyDataBuilding,
  selectPropertyData,
  selectDataErrors,
  selectPropertyMap,
});
const mapDispatchToProps = {
  enumsData,
  setPostPropertyValuePrice,
  locationData,
  setPostPropertyValueAddress,
  setPostPropertyValueBuilding,
  setPostPropertyValueBuildingNoOf,
  postPropertyData,
  setPostPropertyValueMap,
  clearPostPropertyErrorField,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty2);
