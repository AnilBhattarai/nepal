/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from 'react-native-check-box';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { enumsData } from '../../redux/enums/enums.actions';
import { selectEnumsData } from '../../redux/enums/enums.selectors';
import { selectFilterData, selectDataLoading } from '../../redux/property/property.selectors';
import { filterPropertyData } from '../../redux/property/property.actions';
import { setQueryData } from '../../redux/property/property.selectors';
import { setFilterDataValue, clearQueryData, clearFilterData } from '../../redux/property/property.actions';
import { ScrollView } from 'react-native-gesture-handler';
import { selectLocationData } from '../../redux/location/location.selectors';
import { locationData } from '../../redux/location/location.actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-tiny-toast';

class FilterModal extends Component {
  state = {
    query: {},
    moreOption: false,
    placeHolderText: 'Search Location...',
    selectedText: '',
    selectedId: '',
    hideContents: false,
  };
  async componentDidMount() {
    try {
      await this.props.enumsData();
      await this.props.locationData();
      // console.log(this.props.routeName)
    } catch (error) {
      console.log(error);
    }
  }
  setHideContents = value => this.setState({ hideContents: value });
  setModalVisible = value => {
    this.props.setModalVisible(value);
  };
  toggleOption = value => {
    this.setState({ moreOption: value });
  };
  handleChange = name => text => {
    this.setState({ [name]: text });
    this.setState({ query: { key: `find_${name}`, value: text } });
  };
  handleSearchPage = async () => {
    this.props.clearFilterData();
    const { query } = this.props;
    let queryStr = '';
    Object.keys(query).forEach(item => {
      if (query[item] !== null) {
        queryStr = `${queryStr}&${item}=${query[item]}`;
      }
    });
    const data = await this.props.filterPropertyData(queryStr);
    // console.log(data.success);
    if (data.success === true) {
      this.setModalVisible(false);
      this.props.navigate('SearchScreen');
      this.setState({ selectedText: '' });
    } else {
      Toast.show(
        `Something Went Wrong! ${JSON.stringify(data)}`
      );
    }
  };

  // sendDataRequest({ is_premium: this.state.is_premium });
  onCheckBoxSelected = (name, value) => {
    this.props.setFilterDataValue({
      key: name,
      value: value === false ? '' : true,
    });
  };

  onPurposeSelected = id => {
    const {
      query: { find_property_purpose },
    } = this.props;
    if (find_property_purpose.includes(id)) {
      this.props.setFilterDataValue({
        key: 'find_property_purpose',
        value: '',
      });
    } else {
      this.props.setFilterDataValue({
        key: 'find_property_purpose',
        value: id,
      });
    }
  };
  onCategorySelected = id => {
    const {
      query: { find_property_category },
    } = this.props;
    if (find_property_category.includes(id)) {
      this.props.setFilterDataValue({
        key: 'find_property_category',
        value: '',
      });
    } else {
      this.props.setFilterDataValue({
        key: 'find_property_category',
        value: id,
      });
    }
  };
  onLocationSelected = () => {
    this.props.setFilterDataValue({
      // key: 'find_is_negotiable',
      // value:id,
    });
  };
  onPriceRangeSelected = (key, value) => {
    this.props.setFilterDataValue({
      key,
      value,
    });
  };
  onPropertyFaceSelected = id => {
    this.props.setFilterDataValue({
      key: 'find_property_face',
      value: id,
    });
  };
  onModalBackPressed = () => {
    this.setState({ hideContents: false, selectedText: '' });
    this.setModalVisible(false);
  }
  onSelected = (each) => {
    // console.log(each, 'fgfggfh')
    this.setState({ selectedText: each.name, hideContents: false });
    this.handleLocationChange(each);
  }
  _selectedValue = (text) => {
    //console.log(text);
    this.setHideContents(true);
    this.setState({ selectedText: text });

  }
  clearText = () => {
    this.setState({ selectedText: '', hideContents: false });
  }
  handleLocationChange = event => {
    //console.log(event.name, 'Helloooo')
    this.setState({ key: 'find_location', value: event });
    this.setState({ selectedText: event.name });
    if (this.props.query.find_state_id) {
      this.props.setFilterDataValue({ key: 'find_state_id', value: '' });
    }
    if (this.props.query.find_district_id) {
      this.props.setFilterDataValue({ key: 'find_district_id', value: '' });
    }
    if (this.props.query.find_vdc_id) {
      this.props.setFilterDataValue({ key: 'find_vdc_id', value: '' });
    }
    if (this.props.query.find_area_id) {
      this.props.setFilterDataValue({ key: 'find_area_id', value: '' });
    }
    if (event.custom === 'State') {
      this.props.setFilterDataValue({ key: 'find_state_id', value: event.id });
    }
    if (event.custom === 'District') {
      this.props.setFilterDataValue({ key: 'find_district_id', value: event.id });
    }
    if (event.custom === 'Vdc') {
      this.props.setFilterDataValue({ key: 'find_vdc_id', value: event.id });
    }
    if (event.custom === 'Area') {
      this.props.setFilterDataValue({ key: 'find_area_id', value: event.id });
    }
  };
  render() {
    const { selectEnumsData, query, locations } = this.props;
    const optionStates = locations.allState
      ? locations.allState.map(function state(each) {
        let displayName = '';
        displayName = each.name.replace(/-/g, ', ');
        return {
          id: each._id,
          name: displayName,
          custom: 'State',
        };
      })
      : [];
    const optionDistricts = locations.allDistrict
      ? locations.allDistrict.map(function district(each) {
        const displayName1 = each.name.replace('-', ' ');
        const displayName2 = displayName1.replace(/-/g, ', ');
        return {
          id: each._id,
          name: displayName2,
          custom: 'District',
        };
      })
      : [];
    const optionVdc = locations.allVdc
      ? locations.allVdc.map(function vdc(each) {
        const displayName1 = each.name.replace('-', ' ');
        const displayName2 = displayName1.replace(/-/g, ', ');
        return {
          id: each._id,
          name: displayName2,
          custom: 'Vdc',
        };
      })
      : [];
    const optionArea = locations.allArea
      ? locations.allArea.map(function state(each) {
        const displayName1 = each.name.replace('-', ' ');
        const displayName2 = displayName1
          .split('-')
          .reverse()
          .join(', ');
        // const displayName2 = displayName1.replace(/-/g, ', ');
        return {
          id: each._id,
          name: displayName2,
          custom: 'Area',
        };
      })
      : [];
    const optionLocations = optionStates.concat(
      optionArea,
      optionVdc,
      optionDistricts,
    );
    // console.log(optionLocations, 'hello')
    const filteredOptions = optionLocations.filter((location) => (
      location.name.toLowerCase().includes(this.state.selectedText.toLowerCase())
    ));

    //console.log(filteredOptions);
    const optionMaxPrice = [
      { id: '1', name: 'Up To 50 K' },
      { id: '2', name: '50 K to 5 Lakh' },
      { id: '3', name: '5 Lakh to 50 Lakh' },
      { id: '4', name: '50 Lakh to 3 Cr.' },
      { id: '5', name: '3 Cr. to max' },
    ];
    // console.log(optionLocations, 'hello')
    return (
      <SafeAreaView style={{ top: 50 }}>
        {Object.keys(selectEnumsData).length > 0 && (
          <Modal
            presentationStyle={'formSheet'}
            animationType="fade"
            handleClick={this.setModalVisible}
            // transparent={true}
            visible={this.props.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false);
            }}
          >
            <View style={{ flexDirection: 'row', elevation: 4, position: 'absolute', width: Dimensions.get('window').width, backgroundColor: '#fff', height: 56, alignItems: 'center', left: 0, top: 0, right: 0, zIndex: 90 }}>
              <TouchableOpacity activeOpacity={1} style={{ height: 48, width: 48, justifyContent: 'center', alignItems: 'center' }} onPress={this.onModalBackPressed}>
                <Icon size={24} name="md-arrow-back" />
              </TouchableOpacity>
              <View style={{ flex: 1, position: 'relative' }}>
                <TextInput numberOfLines={1}
                  style={{
                    // width: this.state.hideContents ? '80%' : '90%',
                    height: 48,
                    color: '#4A4A4A',
                    marginLeft: 16,
                    fontSize: 18,
                    textTransform: 'capitalize',
                    textAlign: 'left',
                    width: Dimensions.get('window').width - 112,
                  }}
                  value={this.state.selectedText}
                  onChangeText={text => this._selectedValue(text)}
                  placeholder={'Search Location...'}
                  autoFocus={true}
                />
                <TouchableOpacity activeOpacity={1} onPress={this.clearText} style={{
                  position: 'absolute', width: 48, backgroundColor: '#fff', zIndex: 900, height: 50, right: 0, top: 0, alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={24} name="ios-close" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' style={{ backgroundColor: '#F3FBFF', height: Dimensions.get('window').height }}>
              <View
                style={{
                  flex: 1,
                  position: 'relative',
                }}
              >

                {this.state.hideContents ?
                  <View style={{ marginTop: 50 }}>
                    {this.state.selectedText === '' ? this.setHideContents(false) :
                      <View style={{ padding: 10 }}>
                        {filteredOptions ? (
                          filteredOptions.map(each => (
                            <View key={`filter-${each.id}`} style={{
                              justifyContent: 'center',
                              // alignItems: 'center',

                            }} >
                              <TouchableOpacity
                                style={{
                                  borderBottomColor: '#d3d3d3',
                                  borderBottomWidth: 1,
                                  padding: 10,
                                }}
                                onPress={() => this.onSelected(each)}>
                                <Text style={{ fontSize: 15, textTransform: 'capitalize' }}>{each.name}</Text>
                              </TouchableOpacity>
                            </View>

                          ))
                        ) : null}
                      </View>
                    }
                  </View>
                  : <>
                    <View style={{ marginTop: 60, marginHorizontal: 20 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'normal',
                          color: '#333',
                          marginTop: 10,
                        }}
                      >
                        Purpose
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        flexWrap: 'wrap',
                        marginHorizontal: 20,
                      }}
                    >
                      {selectEnumsData.property_purpose ? (
                        selectEnumsData.property_purpose.map(each => (
                          <TouchableOpacity
                            key={each._id}
                            onPressIn={() => this.onPurposeSelected(each._id)}
                            style={{
                              height: 32,
                              marginRight: 10,
                              paddingHorizontal: 20,
                              borderWidth: 1,
                              borderRadius: 20,
                              backgroundColor: '#fff',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor:
                                query.find_property_purpose === each._id
                                  ? '#0291DD'
                                  : '#aaa',
                            }}
                          >
                            <Text style={{
                              color: query.find_property_purpose === each._id
                                ? '#0291DD'
                                : '#aaa',
                            }}>{each.description}</Text>
                          </TouchableOpacity>
                        ))
                      ) : (
                          <Text>loading...</Text>
                        )}
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 'normal',
                          color: '#333',
                          marginTop: 20,
                        }}
                      >
                        Category
                </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        flexWrap: 'wrap',
                        marginHorizontal: 20,
                      }}
                    >
                      {selectEnumsData.property_category ? (
                        selectEnumsData.property_category.map(each => (
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginRight: 10,
                              marginBottom: 10,
                            }}
                            key={each._id}
                          >
                            <TouchableOpacity
                              style={{
                                height: 32,
                                paddingHorizontal: 20,
                                borderWidth: 1,
                                borderRadius: 20,
                                backgroundColor: '#fff',
                                alignItems: 'center',
                                elevation: 1,
                                justifyContent: 'center',
                                borderColor:
                                  query.find_property_category === each._id
                                    ? '#0291DD'
                                    : '#aaa',
                              }}
                              onPress={() => this.onCategorySelected(each._id)}
                            >
                              <Text style={{
                                color: query.find_property_category === each._id
                                  ? '#0291DD'
                                  : '#aaa',
                              }}>{each.title}</Text>
                            </TouchableOpacity>
                          </View>
                        ))
                      ) : (
                          <Text>loading...</Text>
                        )}
                    </View>
                    {this.state.moreOption === true ? (
                      <View>
                        <View>


                          <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 'normal',
                                color: '#333',
                                marginTop: 20,
                              }}
                            >
                              Price Range
                      </Text>
                          </View>
                          <View
                            style={{
                              borderRadius: 5,
                              borderColor: '#aaa',
                              borderWidth: 1,
                              marginHorizontal: 20,
                              marginTop: 10,
                              backgroundColor: '#fff',
                              height: 40,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <RNPickerSelect
                              style={pickerStyle}
                              placeholder={{
                                label: 'Select Price Range',
                                value: null,
                              }}
                              onValueChange={(itemValue, itemIndex) =>
                                this.onPriceRangeSelected('find_selected_price', itemValue)}
                              items={
                                optionMaxPrice ? (
                                  optionMaxPrice.map(function type(each) {
                                    return {
                                      label: each.name,
                                      value: each.id,
                                      key: each.id,
                                    };
                                  }))
                                  : []
                              }
                            />
                          </View>
                        </View>
                        <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 'normal',
                              color: '#333',
                              marginTop: 20,
                            }}
                          >
                            Property Face
                        </Text>
                        </View>
                        <View
                          style={{
                            borderRadius: 5,
                            borderColor: '#aaa',
                            borderWidth: 1,
                            marginTop: 10,
                            marginHorizontal: 20,
                            backgroundColor: '#fff',
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {/* <Picker
                            selectedValue={query.find_property_face}
                            style={{
                              height: 34,
                            }}
                            onValueChange={(itemValue, itemIndex) =>
                              this.onPropertyFaceSelected(itemValue)
                            }
                          >
                            <Picker.Item key="0" label="Select Property Face" value="" />
                            {selectEnumsData.property_face ? (
                              selectEnumsData.property_face.map(each => (
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
                          <RNPickerSelect
                            style={pickerStyle}
                            placeholder={{
                              label: 'Select Property Face',
                              value: null,
                            }}
                            onValueChange={(itemValue, itemIndex) =>
                              this.onPropertyFaceSelected(itemValue)}
                            items={
                              selectEnumsData.property_face ? (
                                selectEnumsData.property_face.map(function type(each) {
                                  return {
                                    label: each.title,
                                    value: each._id,
                                    key: each._id,
                                  };
                                }))
                                : []
                            }
                          />
                        </View>

                        <View
                          style={{
                            marginTop: 20,
                            marginHorizontal: 20,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <CheckBox
                            style={{ flex: 1, height: 30 }}
                            onClick={() =>
                              this.onCheckBoxSelected(
                                'find_is_premium',
                                !query.find_is_premium,
                              )
                            }
                            isChecked={
                              query.find_is_premium.length <= 0
                                ? false
                                : query.find_is_premium
                            }
                            rightText={'Premium'}
                          />

                          <CheckBox
                            style={{ flex: 1, height: 30 }}
                            onClick={() =>
                              this.onCheckBoxSelected(
                                'find_is_featured',
                                !query.find_is_featured,
                              )
                            }
                            isChecked={
                              query.find_is_featured.length <= 0
                                ? false
                                : query.find_is_featured
                            }
                            rightText={'Featured'}
                          />
                        </View>
                      </View>
                    ) : null}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 20,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginHorizontal: 20,
                        }}
                      >
                        {this.state.moreOption === false ? (
                          <TouchableOpacity
                            style={{
                              height: 40,
                              paddingVertical: 10,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor: '#aaa',
                            }}
                            onPress={() => this.toggleOption(true)}
                          >
                            <Text style={{ color: '#0291DD', fontSize: 15 }}>
                              more options...
                            </Text>
                          </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                              style={{
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor: '#aaa',
                              }}
                              onPress={() => this.toggleOption(false)}
                            >
                              <Text style={{ color: '#0291DD', fontSize: 15 }}>
                                less options...
                              </Text>
                            </TouchableOpacity>
                          )}
                      </View>

                      <View
                        style={{
                          marginHorizontal: 20,
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            height: 44,
                            backgroundColor: '#0291DD',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50,
                            flexDirection: 'row',
                            paddingHorizontal: 32,
                          }}
                          onPress={this.handleSearchPage}
                        >
                          {this.props.routeName === 'SearchScreen' ?
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 16,
                              }}
                            >
                              Filter
                          </Text>
                            :
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 16,
                              }}
                            >
                              Search
                          </Text>}
                          {this.props.loading && (
                            <ActivityIndicator color="white" />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>

                  </>}
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => this.setModalVisible(false)}
              style={{ flex: 1 }}
            />
          </Modal>
        )
        }
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
  placeholderColor: 'black',
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
  query: setQueryData,
  selectFilterData,
  locations: selectLocationData,
  loading: selectDataLoading,
});
const mapDispatchToProps = {
  enumsData,
  setFilterDataValue,
  filterPropertyData,
  locationData,
  clearQueryData,
  clearFilterData,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
