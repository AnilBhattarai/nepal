/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectEnumsData } from '../../redux/enums/enums.selectors';
import { enumsData } from '../../redux/enums/enums.actions';
import { setQueryData } from '../../redux/property/property.selectors';
import {
  setFilterDataValue,
  filterPropertyData,
  clearFilterData,
} from '../../redux/property/property.actions';
import { selectToken } from '../../redux/app/app.selectors';
import tempImg3 from '../../../assets/home.png';
import calc from '../../../assets/calc-icon.png';
import uc from '../../../assets/uc.png';
import hl from '../../../assets/hl.png';
import ap from '../../../assets/ap.png';
import pr from '../../../assets/pr.png';
import about from '../../../assets/about.png';
import star from '../../../assets/star.png';
import { IMAGE_URL } from '../../api';
import Toast from 'react-native-tiny-toast';
export class menu extends Component {
  componentDidMount() {
    this.props.enumsData();
  }
  handleEmail = () => {
    Linking.openURL('mailto:support@nepalhomes.com');
  };
  handleCall = () => {
    Linking.openURL('tel:1800 572 5050');
  };
  loginCheck = () => {
    const { token } = this.props;
    if (token === '') {
      this.props.navigation.navigate('Login');
    }
  };
  onPostProperty = () => {
    if (this.props.token === '') {
      Toast.show('Please Login First!!');
    } else {
      this.props.navigation.navigate('AddProperty', { goback: 'goback' });
    }
  };
  onPurposeSelected = async (id) => {
    this.props.clearFilterData();
    Promise.resolve(
      this.props.setFilterDataValue({
        key: 'find_property_purpose',
        value: id,
      }),
    ).then(this.props.navigation.navigate('SearchScreen'));
  };
  render() {
    const { selectEnumsData, token } = this.props;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#F3FBFF',
        }}
      >
        <View style={{ backgroundColor: '#202B8B', flex: 1 }}>
          <View
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              flex: 1,
              backgroundColor: '#F3FBFF',
              overflow: 'hidden',
            }}
          >
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 20,
                  paddingTop: Platform.OS === 'ios' ? 0 : 40,
                }}
              >
                <Text
                  style={{
                    fontSize: 28,
                    color: '#333',
                    fontWeight: 'bold',
                  }}
                >
                  Menu
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: 80,
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    elevation: 3,
                    bottom: 10,
                    display: 'none',
                  }}
                >
                  <Image
                    style={{
                      height: 70,
                      width: 70,
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                    source={require('../../../assets/email.png')}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={this.handleEmail}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'normal',
                          color: '#202B8B',
                        }}
                      >
                        Need any help? Write to us
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'normal',
                          color: '#0291DD',
                        }}
                      >
                        info@nepalhomes.com
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    height: 80,
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: 5,
                    marginTop: 10,
                    elevation: 3,
                    bottom: 10,
                    display: 'none',
                  }}
                >
                  <Image
                    style={{
                      height: 70,
                      width: 70,
                      marginTop: 10,
                      marginLeft: 10,
                    }}
                    source={require('../../../assets/call.png')}
                  />
                  <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={this.handleCall}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'normal',
                          color: '#202B8B',
                        }}
                      >
                        Toll Free Number
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: 'normal',
                          color: '#0291DD',
                        }}
                      >
                        1800 572 5050
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* {token === '' ?
                  <TouchableOpacity activeOpacity={1}
                    onPress={() => this.loginCheck()}
                    style={{ paddingVertical: 10, fontFamily:'sfprotextRegular', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D8D8D8', borderStyle: 'dashed' }}>
                    <Image
                      style={{ height: 20, width: 20 }}
                      source={require('../../../assets/appicon.png')}
                    />
                    <Text style={{ marginLeft: 16, color: '#444', fontSize: 15, fontWeight: 'normal' }}>Login</Text>
                  </TouchableOpacity>
                  : null} */}
                {/* <TouchableOpacity activeOpacity={1}
                  onPress={() => this.props.navigation.navigate('ProjectAllProperties')}
                  style={{ paddingVertical: 10, fontFamily:'sfprotextRegular', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D8D8D8', borderStyle: 'dashed' }}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={require('../../../assets/appicon.png')}
                  />
                  <Text style={{ marginLeft: 16, color: '#444', fontSize: 15, fontWeight: 'normal' }}>New Projects </Text>
                </TouchableOpacity> */}

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{ fontSize: 14, color: '#8A8A8F', paddingBottom: 8 }}
                  >
                    Properties
                  </Text>
                </View>
                {selectEnumsData.property_purpose
                  ? selectEnumsData.property_purpose.map((each) => (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this.onPurposeSelected(each._id)}
                        key={each._id}
                        style={{
                          paddingVertical: 10,
                          alignItems: 'center',
                          flexDirection: 'row',
                          borderBottomWidth: 1,
                          borderBottomColor: '#D8D8D8',
                          borderStyle: 'dashed',
                        }}
                      >
                        <View
                          style={{
                            width: 24,
                            height: 24,
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <Image
                            style={{
                              height: 36,
                              width: 36,
                              position: 'absolute',
                              left: -5,
                              top: -5,
                            }}
                            source={
                              each && each.media
                                ? {
                                    uri: `${IMAGE_URL}${each.media.path}`,
                                  }
                                : tempImg3
                            }
                          />
                        </View>
                        <Text
                          style={{
                            color: '#444',
                            fontSize: 15,
                            fontWeight: 'normal',
                            fontFamily: 'sfprotextRegular',
                            marginLeft: 16,
                          }}
                        >
                          Properties for {each.title}{' '}
                        </Text>
                      </TouchableOpacity>
                    ))
                  : null}
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={this.onPostProperty}
                  style={{
                    paddingVertical: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#D8D8D8',
                    borderStyle: 'dashed',
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Image
                      style={{
                        height: 34,
                        width: 34,
                        position: 'absolute',
                        left: -5,
                        top: -5,
                      }}
                      source={ap}
                    />
                  </View>

                  <Text
                    style={{
                      color: '#444',
                      fontSize: 15,
                      fontWeight: 'normal',
                      fontFamily: 'sfprotextRegular',
                      marginLeft: 16,
                    }}
                  >
                    Post Property{' '}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 8,
                      fontSize: 12,
                      borderRadius: 12,
                      paddingHorizontal: 12,
                      color: '#fff',
                      paddingVertical: 1,
                      backgroundColor: '#0291DD',
                    }}
                  >
                    FOR FREE
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    paddingVertical: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#D8D8D8',
                    borderStyle: 'dashed',
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('PostRequirement')
                  }
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Image
                      style={{
                        height: 34,
                        width: 34,
                        position: 'absolute',
                        left: -5,
                        top: -5,
                      }}
                      source={pr}
                    />
                  </View>
                  <Text
                    style={{
                      color: '#444',
                      fontSize: 15,
                      fontWeight: 'normal',
                      fontFamily: 'sfprotextRegular',
                      marginLeft: 16,
                    }}
                  >
                    Post Requirements
                  </Text>
                </TouchableOpacity> */}

                <View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#ccc',
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#8A8A8F',
                        paddingBottom: 8,
                      }}
                    >
                      Tools
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      this.props.navigation.navigate('EMICalculator')
                    }
                    style={{
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#D8D8D8',
                      borderStyle: 'dashed',
                      flexDirection: 'row',
                    }}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Image
                        style={{
                          height: 36,
                          width: 36,
                          position: 'absolute',
                          left: -5,
                          top: -5,
                        }}
                        source={calc}
                      />
                    </View>

                    <Text
                      style={{
                        color: '#444',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontFamily: 'sfprotextRegular',
                        marginLeft: 16,
                      }}
                    >
                      EMI Calculator
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#D8D8D8',
                      borderStyle: 'dashed',
                      flexDirection: 'row',
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('UnitConverter')
                    }
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Image
                        style={{
                          height: 34,
                          width: 34,
                          position: 'absolute',
                          left: -5,
                          top: -5,
                        }}
                        source={uc}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#444',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontFamily: 'sfprotextRegular',
                        marginLeft: 16,
                      }}
                    >
                      Unit Converter
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#D8D8D8',
                      borderStyle: 'dashed',
                      flexDirection: 'row',
                    }}
                    onPress={() => this.props.navigation.navigate('BankLoan')}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Image
                        style={{
                          height: 34,
                          width: 34,
                          position: 'absolute',
                          left: -5,
                          top: -5,
                        }}
                        source={hl}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#444',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontFamily: 'sfprotextRegular',
                        marginLeft: 16,
                      }}
                    >
                      Home Loan
                    </Text>
                  </TouchableOpacity> */}
                </View>
                <View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: '#ccc',
                      marginTop: 40,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#8A8A8F',
                        paddingBottom: 8,
                      }}
                    >
                      Other
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#D8D8D8',
                      borderStyle: 'dashed',
                      flexDirection: 'row',
                    }}
                    onPress={() => this.props.navigation.navigate('About')}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Image
                        style={{
                          height: 34,
                          width: 34,
                          position: 'absolute',
                          left: -5,
                          top: -5,
                        }}
                        source={about}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#444',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontFamily: 'sfprotextRegular',
                        marginLeft: 16,
                      }}
                    >
                      About NepalHomes.com
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#D8D8D8',
                      borderStyle: 'dashed',
                      flexDirection: 'row',
                    }}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Image
                        style={{
                          height: 34,
                          width: 34,
                          position: 'absolute',
                          left: -5,
                          top: -5,
                        }}
                        source={star}
                      />
                    </View>
                    <Text
                      style={{
                        color: '#444',
                        fontSize: 15,
                        fontWeight: 'normal',
                        fontFamily: 'sfprotextRegular',
                        marginLeft: 16,
                      }}
                    >
                      Rate This App
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'center',
                    marginBottom: 52,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    activeOpacity={1}
                    onPress={() =>
                      Linking.openURL('https://www.facebook.com/NepalhomesNP/')
                    }
                  >
                    <Image
                      style={{ height: 30, width: 30, marginHorizontal: 8 }}
                      source={require('../../../assets/facebook_f.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    activeOpacity={1}
                    onPress={() =>
                      Linking.openURL('https://twitter.com/nepalhomes')
                    }
                  >
                    <Image
                      style={{ height: 30, width: 30, marginHorizontal: 8 }}
                      source={require('../../../assets/twitter.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    activeOpacity={1}
                    onPress={() =>
                      Linking.openURL('https://www.instagram.com/nepalhomes/')
                    }
                  >
                    <Image
                      style={{ height: 30, width: 30, marginHorizontal: 8 }}
                      source={require('../../../assets/instagram.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  query: setQueryData,
  selectEnumsData,
  token: selectToken,
});
const mapDispatchToProps = {
  setFilterDataValue,
  filterPropertyData,
  enumsData,
  clearFilterData,
};

export default connect(mapStateToProps, mapDispatchToProps)(menu);
