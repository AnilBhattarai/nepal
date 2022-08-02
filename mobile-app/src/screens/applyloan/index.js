/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectToken } from '../../redux/app/app.selectors';
import {
  selectApplyLoan,
  selectApplyLoanData,
  selectDataErrors,
} from '../../redux/property/property.selectors';
import { locationData } from '../../redux/location/location.actions';
import { selectLocationData } from '../../redux/location/location.selectors';
import {
  setApplyLoanValue,
  loanApplyData,
  clearApplyLoan,
} from '../../redux/property/property.actions';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-tiny-toast';
export class ApplyLoan extends Component {
  componentDidMount() {
    try {
      this.props.locationData();
      this.props.clearApplyLoan();
      this.onMyApplyLoanValueBankName();
    } catch (error) {
      console.log(error);
    }
  }
  // componentWillUnmount() {

  // }
  onMyApplyLoanValueSelected = (key, value) => {
    this.props.setApplyLoanValue({
      key,
      value,
    });
  };
  onMyApplyLoanValueBankName = () => {
    this.props.setApplyLoanValue({
      key: 'bank_name',
      value: this.props.navigation.getParam('bank_name'),
    });
  };
  onSelect = (key, value) => {
    this.props.setApplyLoanValue({
      key,
      value,
    });
  };
  onSubmitForm = () => {
    const { apply, token, errors } = this.props;
    if (token !== '' || errors.length !== 0) {
      this.props.loanApplyData(apply);
    } else {
      Toast.show('Please Login First!');
    }
    this.props.clearApplyLoan();
    Keyboard.dismiss();
  };
  render() {
    const { apply, location, errors } = this.props;
    // console.log(errors.email, 'hello');
    const propertyType = [
      { id: '1', name: 'Home Purchase' },
      { id: '2', name: 'Home Construction' },
      { id: '3', name: 'Refinance' },
      { id: '4', name: 'Loan Against Property' },
      { id: '5', name: 'Plot Purchase' },
    ];
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, bottom: 10, top: 10, backgroundColor: '#F3FBFF' }}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps={'always'}>
          <View style={{ marginHorizontal: 10 }}>
            <View>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#404040' }}
              >
                {' '}
                Full Name{' '}
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  height: 40,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#d3d3d3',
                  borderRadius: 5,
                  marginTop: 10,
                  padding: 10,
                }}
                keyboardType={'default'}
                value={apply.full_name}
                onChangeText={text =>
                  this.onMyApplyLoanValueSelected('full_name', text)
                }
                placeholder={'Full Name'}
              />
            </View>
            {apply.full_name === '' ? (
              <View style={{ marginHorizontal: 20 }}>
                {Object.keys(errors).length > 0 ? (
                  <Text style={{ color: 'red', fontSize: 10 }}>
                    {errors.full_name}
                  </Text>
                ) : null}
              </View>
            ) : null}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#404040' }}
              >
                {' '}
                Email{' '}
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  height: 40,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#d3d3d3',
                  borderRadius: 5,
                  marginTop: 10,
                  padding: 10,
                }}
                keyboardType={'email-address'}
                value={apply.email}
                onChangeText={text =>
                  this.onMyApplyLoanValueSelected('email', text)
                }
                placeholder={'Email'}
              />
            </View>
            {apply.email === '' ? (
              <View style={{ marginHorizontal: 20 }}>
                {Object.keys(errors).length > 0 ? (
                  <Text style={{ color: 'red', fontSize: 10 }}>
                    {errors.email}
                  </Text>
                ) : null}
              </View>
            ) : null}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#404040' }}
              >
                {' '}
                Mobile No.{' '}
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  height: 40,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#d3d3d3',
                  borderRadius: 5,
                  marginTop: 10,
                  padding: 10,
                }}
                keyboardType={'phone-pad'}
                value={apply.mobile}
                onChangeText={text =>
                  this.onMyApplyLoanValueSelected('mobile', text)
                }
                placeholder={'Mobile No.'}
              />
            </View>
            {apply.mobile === '' ? (
              <View style={{ marginHorizontal: 20 }}>
                {Object.keys(errors).length > 0 ? (
                  <Text style={{ color: 'red', fontSize: 10 }}>
                    {errors.mobile}
                  </Text>
                ) : null}
              </View>
            ) : null}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#404040' }}
              >
                {' '}
                Have You Identified Property?{' '}
              </Text>
              <RadioGroup
                onSelect={(key, value) => this.onSelect('is_identified', value)}
              >
                <RadioButton value={true}>
                  <Text>Yes</Text>
                </RadioButton>
                <RadioButton value={false}>
                  <Text>No</Text>
                </RadioButton>
              </RadioGroup>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#404040' }}
              >
                {' '}
                What Type Of Property Are You Looking For?{' '}
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  borderColor: '#C8C7CC',
                  borderWidth: 1,
                  flex: 1,
                  backgroundColor: '#fff',
                  marginLeft: 5,
                  height: 40,
                }}
              >
                <RNPickerSelect
                  style={pickerStyle}
                  placeholder={{
                    label: 'Choose Type',
                    value: null,
                  }}
                  onValueChange={text =>
                    this.onMyApplyLoanValueSelected('type_of_property', text)
                  }
                  items={
                    propertyType
                      ? propertyType.map(function type(each) {
                        return {
                          label: each.name,
                          value: each.name,
                          key: each.id,
                        };
                      })
                      : []
                  }
                />
              </View>
            </View>
            {apply.type_of_property === '' ? (
              <View style={{ marginHorizontal: 20 }}>
                {Object.keys(errors).length > 0 ? (
                  <Text style={{ color: 'red', fontSize: 10 }}>
                    {errors.type_of_property}
                  </Text>
                ) : null}
              </View>
            ) : null}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#404040' }}
              >
                {' '}
                What is the city you are seeking loan for?{' '}
              </Text>
              <View
                style={{
                  borderRadius: 5,
                  borderColor: '#C8C7CC',
                  borderWidth: 1,
                  flex: 1,
                  backgroundColor: '#fff',
                  marginLeft: 5,
                  height: 40,
                }}
              >
                <RNPickerSelect
                  style={pickerStyle}
                  placeholder={{
                    label: 'Choose City',
                    value: null,
                  }}
                  onValueChange={text =>
                    this.onMyApplyLoanValueSelected('looking_for_city', text)
                  }
                  items={
                    location.allVdc
                      ? location.allVdc.map(function type(each) {
                        return {
                          label: each.name,
                          value: each.name,
                          key: each._id,
                        };
                      })
                      : []
                  }
                />
              </View>
            </View>
            {apply.looking_for_city === '' ? (
              <View style={{ marginHorizontal: 20 }}>
                {Object.keys(errors).length > 0 ? (
                  <Text style={{ color: 'red', fontSize: 10 }}>
                    {errors.looking_for_city}
                  </Text>
                ) : null}
              </View>
            ) : null}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#404040' }}
              >
                {' '}
                Resident Status{' '}
              </Text>
              <RadioGroup
                onSelect={(key, value) =>
                  this.onSelect('resident_status', value)
                }
              >
                <RadioButton value={'Resident Nepalese'}>
                  <Text>Resident Nepalese</Text>
                </RadioButton>
                <RadioButton value={'Non Resident Nepalese'}>
                  <Text>Non-Resident Nepalese</Text>
                </RadioButton>
              </RadioGroup>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#404040' }}
              >
                {' '}
                Employment Type{' '}
              </Text>
              <RadioGroup
                onSelect={(key, value) =>
                  this.onSelect('employment_type', value)
                }
              >
                <RadioButton value={'Salaried'}>
                  <Text>Salaried</Text>
                </RadioButton>
                <RadioButton value={'Non Salaried'}>
                  <Text>Non Salaried</Text>
                </RadioButton>
              </RadioGroup>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#404040' }}
              >
                {' '}
                Monthly Income{' '}
              </Text>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  height: 40,
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#d3d3d3',
                  borderRadius: 5,
                  marginTop: 10,
                  padding: 10,
                }}
                keyboardType={'number-pad'}
                value={apply.monthly_income}
                onChangeText={text =>
                  this.onMyApplyLoanValueSelected('monthly_income', text)
                }
                placeholder={'Monthly Income'}
              />
            </View>
            {apply.monthly_income === '' ? (
              <View style={{ marginHorizontal: 20 }}>
                {Object.keys(errors).length > 0 ? (
                  <Text style={{ color: 'red', fontSize: 10 }}>
                    {errors.monthly_income}
                  </Text>
                ) : null}
              </View>
            ) : null}
            <View style={{ marginTop: 20 }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#404040' }}
              >
                {' '}
                Add A Co-Borrower?{' '}
              </Text>
              <RadioGroup
                onSelect={(key, value) =>
                  this.onSelect('is_co_borrower', value)
                }
              >
                <RadioButton value={true}>
                  <Text>Yes</Text>
                </RadioButton>
                <RadioButton value={false}>
                  <Text>No</Text>
                </RadioButton>
              </RadioGroup>
            </View>
            <TouchableOpacity
              onPress={this.onSubmitForm}
              style={{
                marginTop: 30,
                height: 44,
                backgroundColor: '#4267B2',
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: 16,
                paddingLeft: 24,
                borderRadius: 4,
                bottom: 20,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  flex: 1,
                  marginRight: 40,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                Submit Form
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const pickerStyle = {
  inputIOS: {
    color: '#404040',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: '#404040',
  },
  placeholderColor: '#404040',
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
  apply: selectApplyLoan,
  selectApplyLoanData,
  location: selectLocationData,
  token: selectToken,
  errors: selectDataErrors,
});
const mapDispatchToProps = {
  setApplyLoanValue,
  loanApplyData,
  clearApplyLoan,
  locationData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyLoan);
