/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  selectMyRequest,
  selectMyRequestData,
  selectDataErrors,
} from '../../redux/property/property.selectors';
import {
  setMyRequestValue,
  myRequestPostData,
  clearMyRequestField,
} from '../../redux/property/property.actions';
import { enumsData } from '../../redux/enums/enums.actions';
import { selectEnumsData } from '../../redux/enums/enums.selectors';
export class RequestProperty extends Component {
  constructor() {
    super();
    this.maxLength = 140;
    this.state = {
      textLength: 0,
    };
  }
  componentDidMount() {
    try {
      this.props.enumsData();
      this.props.clearMyRequestField();
    } catch (error) {
      console.log(error);
    }
  }
  handleChange(text) {
    this.setState({
      textLength: text.length,
    });
    this.onMyRequestValueSelected('message', text);
  }
  onMyRequestValueSelected = (key, value) => {
    this.props.setMyRequestValue({
      key,
      value,
    });
  };
  onPurposeValueSelected = (key, id) => {
    this.props.setMyRequestValue({
      key,
      value: id,
    });
  };
  onMyRequestPost = () => {
    const myRequest = this.props.request;
    this.props.myRequestPostData(myRequest);
    this.props.clearMyRequestField();
  };
  onBackPressed = () => {
    this.props.navigation.navigate('Explore');
    this.props.clearMyRequestField();
  };
  render() {
    const { request, selectEnumsData, selectDataErrors } = this.props;
    // console.log(request)
    return (
      <SafeAreaView>
        {Object.keys(selectEnumsData).length > 0 && (
          <View
            style={{
              height: Dimensions.get('window').height,
              backgroundColor: '#F3FBFF',
              justifyContent: 'flex-start',
            }}
          >

            <KeyboardAvoidingView
              style={{ flex: 1, bottom: 10, marginHorizontal: 16, }}
              enabled
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
              >
                <View
                  style={{
                    marginTop: 40,
                    marginHorizontal: 16,
                    flex: 1,
                  }}
                >
                  <Text style={{ fontSize: 13, marginBottom: 10 }}>
                    Tell us your requirements and get matching properties.
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      height: 50,
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                      padding: 10,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    value={request.name}
                    onChangeText={text =>
                      this.onMyRequestValueSelected('name', text)
                    }
                    keyboardType={'default'}
                    placeholder={'Name'}
                  />
                  {request.name === '' ? (
                    <View style={{ marginHorizontal: 20 }}>
                      {Object.keys(selectDataErrors).length > 0 ? (
                        <Text style={{ color: 'red', fontSize: 10 }}>
                          {selectDataErrors.name}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      height: 50,
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                      padding: 10,
                      marginTop: 5,
                      marginBottom: 5,
                    }}
                    value={request.email}
                    onChangeText={text =>
                      this.onMyRequestValueSelected('email', text)
                    }
                    keyboardType="email-address"
                    placeholder={'Email'}
                  />
                  {request.email === '' ? (
                    <View style={{ marginHorizontal: 20 }}>
                      {Object.keys(selectDataErrors).length > 0 ? (
                        <Text style={{ color: 'red', fontSize: 10 }}>
                          {selectDataErrors.email}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                  <TextInput
                    style={{
                      backgroundColor: '#fff',
                      height: 100,
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                      padding: 10,
                      marginTop: 5,
                      marginBottom: 5,
                      textAlignVertical: 'top',
                    }}
                    value={request.message}
                    maxLength={140}
                    onChangeText={text => this.handleChange(text)}
                    keyboardType={'default'}
                    placeholder={'Message'}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      color: 'lightgrey',
                      textAlign: 'right',
                    }}
                  >
                    {this.state.textLength}/140
                  </Text>
                  {request.message === '' ? (
                    <View style={{ marginHorizontal: 20 }}>
                      {Object.keys(selectDataErrors).length > 0 ? (
                        <Text style={{ color: 'red', fontSize: 10 }}>
                          {selectDataErrors.message}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {/* <Text style={{ fontSize: 18, marginTop: 10, marginBottom: 5 }}>Purpose :</Text> */}
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                        marginTop: 5,
                        marginBottom: 5,
                        width: '100%',
                        backgroundColor: '#fff',
                      }}
                    >
                      <RNPickerSelect
                        style={pickerStyle}
                        placeholder={{
                          label: 'Select Purpose',
                          value: null,
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                          this.onPurposeValueSelected('purpose', itemValue)
                        }
                        items={
                          selectEnumsData.property_purpose
                            ? selectEnumsData.property_purpose.map(
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
                  <TouchableOpacity
                    style={{
                      height: 50,
                      width: '100%',
                      backgroundColor: '#0291DD',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#0291DD',
                      borderWidth: 1,
                      borderRadius: 4,
                      marginTop: 5,
                    }}
                    onPress={this.onMyRequestPost}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}
                    >
                      Send Request
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const pickerStyle = {
  inputIOS: {
    color: 'black',
    paddingTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 8,
    backgroundColor: '#fff',
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
  request: selectMyRequest,
  selectMyRequestData,
  selectEnumsData,
  selectDataErrors,
});
const mapDispatchToProps = {
  setMyRequestValue,
  myRequestPostData,
  enumsData,
  clearMyRequestField,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestProperty);
