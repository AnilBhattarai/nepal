/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Picker,
  Keyboard,
} from 'react-native';

import {
  formatAmount,
  trimDecimal,
  MONTH,
  MONTH_OPTIONS,
  YEAR_OPTIONS,
} from './utils';
import RNPickerSelect from 'react-native-picker-select';
class EMICalculator extends Component {
  state = {
    principal: '',
    rate: '',
    years: '',
    emi: '',
    totalInterest: '',
    totalPayable: '',
    isYearly: true,
    loanMonthlyBreakdown: [],
    startDate: new Date(),
  };
  handleChange = name => text => this.setState({ [name]: text });
  calculateLoan = () => {
    Keyboard.dismiss();
    const { principal, rate, years, isYearly, startDate } = this.state;

    const P = +principal;
    const Rate = +rate;
    const Years = +years;

    if (P > 0 && Rate > 0 && Years > 0) {
      const R = Rate / 1200;
      const N = isYearly ? Years * 12 : Years;
      const EMI = (P * R * (1 + R) ** N) / ((1 + R) ** N - 1);
      const totalPayableValue = EMI * N;
      const totalInterestValue = totalPayableValue - P;
      this.setState({ emi: trimDecimal(EMI) });
      this.setState({ totalPayable: trimDecimal(totalPayableValue) });
      this.setState({ totalInterest: trimDecimal(totalInterestValue) });
      let mi = '';
      let map = '';
      let lP = P;
      const tempDate = new Date(startDate);
      const loanMonthlyBreakdownValue = Array(Math.round(N))
        .fill(null)
        .map(() => {
          const e = tempDate.getMonth() + 1;
          mi = lP * R;
          map = EMI - mi;
          lP -= map;
          const result = {
            month: MONTH[tempDate.getMonth()],
            year: tempDate.getFullYear(),
            principal: map,
            interest: mi,
            emi: EMI,
            balance: lP,
          };
          tempDate.setMonth(e);
          return result;
        });
      this.setState({
        loanMonthlyBreakdown: loanMonthlyBreakdownValue,
      });
    }
    this.setState({
      principal: '',
      rate: '',
      years: '',
    });
  };
  render() {
    const { loanMonthlyBreakdown } = this.state;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#F3FBFF' }}
        behavior="padding"
        enabled
      >
        <ScrollView keyboardShouldPersistTaps={'always'}>
          <View
            style={{
              marginHorizontal: 20,
            }}
          >
            <View>
              <Text style={{ fontSize: 14, marginTop: 20 }}>Loan Amount</Text>
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
                keyboardType={'numeric'}
                value={this.state.principal}
                onChangeText={this.handleChange('principal')}
                placeholder={'Rs.'}
              />
            </View>
            <View>
              <Text style={{ fontSize: 14, marginTop: 20 }}>Term(Years)</Text>
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
                value={this.state.years}
                onChangeText={this.handleChange('years')}
                keyboardType={'numeric'}
              />
            </View>
            <View>
              <Text style={{ fontSize: 14, marginTop: 20 }}>Interest(%)</Text>
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
                value={this.state.rate}
                onChangeText={this.handleChange('rate')}
                keyboardType={'numeric'}
              />
            </View>
            <View>
              <Text style={{ fontSize: 14, marginTop: 20 }}>Starting From</Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    borderRadius: 5,
                    borderColor: '#d3d3d3',
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    flex: 1,
                    marginRight: 8,

                  }}
                >
                  <RNPickerSelect
                    style={pickerStyle}
                    placeholder={{
                      label: 'Year',
                      value: null,
                    }}
                    value={`${this.state.startDate.getMonth()}`}
                    onValueChange={value => {
                      const newMonth = +value;
                      const newDate = new Date(
                        this.state.startDate.getFullYear(),
                        newMonth,
                        1,
                      );
                      this.setState({ startDate: newDate });
                    }}
                    items={
                      MONTH_OPTIONS
                        ? MONTH_OPTIONS.map(function type(each) {
                          return {
                            label: each.text,
                            value: each.value,
                            key: each.text,
                          };
                        })
                        : []
                    }
                  />
                </View>
                <View
                  style={{
                    borderRadius: 5,
                    borderColor: '#d3d3d3',
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    flex: 1,
                    marginLeft: 8,

                  }}
                >
                  <RNPickerSelect
                    style={pickerStyle}
                    placeholder={{
                      label: 'Year',
                      value: null,
                    }}
                    value={`${this.state.startDate.getFullYear()}`}
                    onValueChange={value => {
                      const newYear = +value;
                      const newDate = new Date(
                        newYear,
                        this.state.startDate.getMonth(),
                        1,
                      );
                      this.setState({ startDate: newDate });
                    }}
                    items={
                      YEAR_OPTIONS
                        ? YEAR_OPTIONS.map(function type(each) {
                          return {
                            label: each.text,
                            value: each.value,
                            key: each.text,
                          };
                        })
                        : []
                    }
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity activeOpacity={1}
              style={{
                marginTop: 20,
                width: '100%',
                height: 44,
                backgroundColor: '#0291DD',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
              }}
              onPress={() => this.calculateLoan()}
            >
              <Text
                style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
              >
                Calculate
              </Text>
            </TouchableOpacity>
            {/* {console.log(this.state)} */}
            {this.state.emi ? (
              <View
                style={{
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Monthly Payment
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 24,
                      color: '#202B8B',
                    }}
                  >
                    {formatAmount(this.state.emi)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginTop: 20,
                      }}
                    >
                      Total Interest
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#202B8B',
                      }}
                    >
                      {formatAmount(this.state.totalInterest)}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        marginTop: 20,
                      }}
                    >
                      Payable Amount
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#202B8B',
                      }}
                    >
                      {formatAmount(this.state.totalPayable)}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: 20,
                    height: 40,
                    width: '100%',
                    backgroundColor: '#202B8B',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                  }}
                >
                  <Text
                    style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
                  >
                    Month-Year
                  </Text>
                  <Text
                    style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
                  >
                    Pricipal(A)
                  </Text>
                  <Text
                    style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
                  >
                    Interest(B)
                  </Text>
                </View>
                {loanMonthlyBreakdown.map(each => (
                  <View
                    key={`${each.month}-${each.year}`}
                    style={{
                      marginTop: 10,
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: '#d3d3d3',
                    }}
                  >
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 15,
                        fontWeight: 'normal',
                      }}
                    >
                      {each.month}-{each.year}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 15,
                        fontWeight: 'normal',
                      }}
                    >
                      {formatAmount(trimDecimal(each.principal))}
                    </Text>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 15,
                        fontWeight: 'normal',
                      }}
                    >
                      {formatAmount(trimDecimal(each.interest))}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null
              // <Text>loading</Text>
            }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const pickerStyle = {
  inputIOS: {
    color: 'black',
    paddingTop: 13,
    paddingHorizontal: 18,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: 'black',
    padding: 0,
    height: 44
  },
  placeholderColor: 'lightgrey',
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
export default EMICalculator;
