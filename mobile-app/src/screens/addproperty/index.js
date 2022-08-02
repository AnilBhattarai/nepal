/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { enumsData } from '../../redux/enums/enums.actions';
import { selectEnumsData } from '../../redux/enums/enums.selectors';
import {
  setPostPropertyValueBasic,
  postPropertyData,
  clearPostPropertyErrorField,
  userInfoPropertyDataGet,
  setPostPropertyValueAgencyId,
  clearPostPropertyField,
} from '../../redux/property/property.actions';
import {
  selectPropertyDataBasic,
  selectPropertyData,
  selectDataErrors,
  selectUserInfoProperty,
  selectAgencyId,
} from '../../redux/property/property.selectors';
import * as Linking from 'expo-linking';
import Ionicon from 'react-native-vector-icons/Ionicons';

class AddProperty extends Component {
  state = {
    isChecked: false,
  };
  async componentDidMount() {
    try {
      await this.props.enumsData();
      await this.props.userInfoPropertyDataGet();
    } catch (error) {
      //do sth
      console.log(error);
    }
  }
  handleCall = () => {
    Linking.openURL('tel:+01-4793536');
  };

  onPurposeSelected = (id) => {
    this.props.setPostPropertyValueBasic({
      key: 'property_purpose',
      value: id,
    });
  };
  onCategoriesSelected = (id) => {
    this.props.setPostPropertyValueBasic({
      key: 'property_category',
      value: id,
    });
  };
  onTypeSelected = (id) => {
    const {
      data: { property_type },
    } = this.props;
    if (property_type.includes(id)) {
      this.props.setPostPropertyValueBasic({
        key: 'property_type',
        value: property_type.filter((each) => each !== id),
      });
    } else {
      this.props.setPostPropertyValueBasic({
        key: 'property_type',
        value: [...property_type, id],
      });
    }
    // this.props.setPostPropertyValueBasic({
    //   key: 'property_type',
    //   value: id,
    // });
  };
  onNextSelected = () => {
    if (
      this.props.selectPropertyData.basic.property_purpose === '' ||
      this.props.selectPropertyData.basic.property_category === '' ||
      this.props.selectPropertyData.basic.property_type === ''
    ) {
      this.props.postPropertyData(this.props.selectPropertyData);
    } else {
      this.onCheckBoxSelected();
      this.props.navigation.navigate('AddProperty2');
      this.props.clearPostPropertyErrorField();
    }
  };
  // onCheckBoxSelected = (key, value) => {
  //   if (value === '') {
  //     this.setState({ isChecked: false });
  //   } else {
  //     this.setState({ isChecked: !this.state.isChecked });
  //   }
  //   this.props.setPostPropertyValueAgencyId({
  //     key,
  //     value,
  //   });
  // };
  onCheckBoxSelected = () => {
    if (this.state.isChecked === true) {
      this.props.setPostPropertyValueAgencyId({
        key: 'agency_id',
        value: this.props.userInfo.agent.agency._id,
      });
    } else {
      //do nothing
    }
  };
  render() {
    const {
      data,
      selectEnumsData,
      selectDataErrors,
      selectPropertyData,
      userInfo,
      selectAgencyId,
    } = this.props;
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
            onPress={() => {
              const isFromHomePage = this.props.navigation.getParam('goback');
              if (isFromHomePage) {
                this.props.navigation.goBack();
                this.props.clearPostPropertyField();
              } else {
                this.props.navigation.navigate('Userprofile');
              }
            }}
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
            <Text style={{ color: '#666666', fontSize: 10 }}>Step 1 of 3</Text>
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
        <ScrollView style={{ flex: 1 }}>
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
                paddingRight: 16,
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
          {Object.keys(userInfo).length > 0 ? (
            <View>
              {userInfo.agent.is_apply === true ||
              userInfo.agent.is_verified === true ? (
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'normal',
                      marginTop: 10,
                      marginHorizontal: 16,
                    }}
                  >
                    Apply as Agent?
                  </Text>
                  <CheckBox
                    style={{ flex: 1, padding: 10 }}
                    onClick={() => {
                      this.setState({
                        isChecked: !this.state.isChecked,
                      });
                    }}
                    isChecked={this.state.isChecked}
                    rightText={'Agent'}
                  />
                </View>
              ) : null}
            </View>
          ) : null}
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'normal',
                marginTop: 10,
                marginHorizontal: 16,
              }}
            >
              PURPOSE
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: 16,
              marginTop: 20,
            }}
          >
            {selectEnumsData.property_purpose ? (
              selectEnumsData.property_purpose.map((each) => (
                <TouchableOpacity
                  key={each._id}
                  onPress={() => this.onPurposeSelected(each._id)}
                  style={{
                    height: 34,
                    backgroundColor: '#fff',
                    borderColor:
                      data.property_purpose === each._id ? '#0291DD' : '#999',
                    borderWidth: 1,
                    elevation: 2,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      color:
                        data.property_purpose === each._id ? '#0291DD' : '#999',
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
          {selectPropertyData.basic.property_purpose === '' ? (
            <View style={{ marginHorizontal: 20 }}>
              {Object.keys(selectDataErrors).length > 0 &&
              selectDataErrors.errors &&
              selectDataErrors.errors.basic ? (
                <Text style={{ color: 'red', fontSize: 10 }}>
                  {selectDataErrors.errors.basic.property_purpose}
                </Text>
              ) : null}
            </View>
          ) : null}
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'normal',
                marginTop: 10,
                marginHorizontal: 16,
              }}
            >
              CATEGORIES
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: 16,
              marginTop: 20,
            }}
          >
            {selectEnumsData.property_category ? (
              selectEnumsData.property_category.map((each) => (
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                  key={each._id}
                >
                  <TouchableOpacity
                    style={{
                      height: 34,
                      backgroundColor: '#fff',
                      borderColor:
                        data.property_category === each._id
                          ? '#0291DD'
                          : '#999',
                      borderWidth: 1,
                      elevation: 2,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                    }}
                    onPress={() => this.onCategoriesSelected(each._id)}
                  >
                    <Text
                      style={{
                        color:
                          data.property_category === each._id
                            ? '#0291DD'
                            : '#999',
                      }}
                    >
                      {each.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text>loading...</Text>
            )}
          </View>
          {selectPropertyData.basic.property_category === '' ? (
            <View style={{ marginHorizontal: 20 }}>
              {Object.keys(selectDataErrors).length > 0 &&
              selectDataErrors.errors &&
              selectDataErrors.errors.basic ? (
                <Text style={{ color: 'red', fontSize: 10 }}>
                  {selectDataErrors.errors.basic.property_category}
                </Text>
              ) : null}
            </View>
          ) : null}
          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'normal',
                marginTop: 10,
                marginHorizontal: 16,
              }}
            >
              PROPERTY TYPE
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: 16,
              marginTop: 20,
            }}
          >
            {selectEnumsData.property_type ? (
              selectEnumsData.property_type.map((each) => (
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                  key={each._id}
                >
                  <TouchableOpacity
                    style={{
                      height: 34,
                      backgroundColor: '#fff',
                      borderColor: data.property_type.includes(each._id)
                        ? '#0291DD'
                        : '#999',
                      borderWidth: 1,
                      elevation: 2,
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                    }}
                    onPress={() => this.onTypeSelected(each._id)}
                  >
                    <Text
                      style={{
                        color: data.property_type.includes(each._id)
                          ? '#0291DD'
                          : '#999',
                      }}
                    >
                      {each.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text>loading...</Text>
            )}
          </View>
          {selectPropertyData.basic.property_type === '' ? (
            <View style={{ marginHorizontal: 20 }}>
              {Object.keys(selectDataErrors).length > 0 &&
              selectDataErrors.errors &&
              selectDataErrors.errors.basic ? (
                <Text style={{ color: 'red', fontSize: 10 }}>
                  {selectDataErrors.errors.basic.property_type}
                </Text>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  data: selectPropertyDataBasic,
  selectEnumsData,
  selectPropertyData,
  selectDataErrors,
  userInfo: selectUserInfoProperty,
  selectAgencyId,
});
const mapDispatchToProps = {
  enumsData,
  setPostPropertyValueBasic,
  postPropertyData,
  clearPostPropertyField,
  clearPostPropertyErrorField,
  userInfoPropertyDataGet,
  setPostPropertyValueAgencyId,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);
