import React, { Component } from 'react';
import { Text, View, SafeAreaView, ScrollView, Image, ImageBackground, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectAgencyData, selectPropertyByAgency, selectDataLoading } from '../../redux/property/property.selectors';
import { agencyDataGet, propertyByAgencyData, clearAgencyData, clearPropertyByAgency, clearAllPropertyByAgency } from '../../redux/property/property.actions';
import { IMAGE_URL } from '../../api';
import AgencyProperty from '../../screens/component/agencyproperty';
class AgencyPage extends Component {
  async componentDidMount() {
    try {
      this.props.clearAgencyData();
      this.props.clearPropertyByAgency();
      this.props.clearAllPropertyByAgency();
      await this.props.agencyDataGet(this.props.navigation.getParam('id'));
      await this.props.propertyByAgencyData(this.props.navigation.getParam('id'));
    } catch (err) {
      console.log(err)
    }

  }
  render() {
    const { agencyData, loading } = this.props;
    // console.log(Object.keys(agencyData).length);

    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              flex: 1,
              backgroundColor: '#F3FBFF',
              bottom: 0,
              overflow: 'hidden',
            }}
          >
            <ScrollView>
              {Object.keys(agencyData).length > 0 ?
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  {/* <ImageBackground
                    style={{
                      backgroundColor: '#006395',
                      position: 'relative',
                      height: 150,
                      width: '100%',
                    }}
                    source={require('../../../assets/cover.png')}
                  > */}
                  <View
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 60,
                      backgroundColor: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: 'white',
                      elevation: 4,
                      marginTop: 30,
                      alignSelf: 'center'
                    }}
                  >
                    <Image
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 100,
                        width: 100,
                        resizeMode: 'contain'
                      }}
                      source={agencyData.agencies && agencyData.agencies.logo ? {
                        uri: `${IMAGE_URL}${agencyData.agencies.logo.path}`,
                      }
                        : null}
                    />
                  </View>
                  {/* </ImageBackground> */}
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 24,
                        fontFamily: 'sfprodisplayRegular',
                        // fontWeight: 'bold',
                        marginTop: 20,
                      }}
                    >
                      {agencyData && agencyData.agencies && agencyData.agencies.title ?
                        agencyData.agencies.title : null}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000',
                        // fontWeight: 'bold',
                        fontFamily: 'sfprodisplayRegular',
                      }}
                    >
                      {agencyData && agencyData.agencies && agencyData.agencies.address ?
                        agencyData.agencies.address : null}
                    </Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`mailto:${agencyData.agencies.email}`)}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#535353',
                        }}
                      >
                        {agencyData && agencyData.agencies && agencyData.agencies.email ?
                          agencyData.agencies.email : null}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${agencyData.agencies.mobile}`)}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#535353',
                        }}
                      >
                        {agencyData && agencyData.agencies && agencyData.agencies.mobile ?
                          agencyData.agencies.mobile : null}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(agencyData.agencies.website)}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#535353',
                        }}
                      >
                        {agencyData && agencyData.agencies && agencyData.agencies.website ?
                          agencyData.agencies.website : null}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginHorizontal: 16, marginTop: 20 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#000',
                        fontFamily: 'sfprodisplayRegular',
                      }}
                    >
                      Agents
                </Text>
                    {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: '100%' }}> */}
                    <View style={{ flexDirection: 'row' }}>
                      {agencyData && agencyData.agents && agencyData.agents.length > 0 ? agencyData.agents.map(each => (
                        <View style={{
                          marginTop: 20,
                          borderRadius: 4,
                          flexDirection: 'row'
                        }}
                          key={each}>
                          <View
                            style={{
                              height: 48,
                              width: 48,
                              borderWidth: 5,
                              borderRadius: 40,
                              borderWidth: 0,
                              overflow: 'hidden'
                            }}
                          >
                            <Image
                              style={{
                                width: undefined, height: undefined, flex: 1,
                              }}
                              source={each && each.image ? {
                                uri: `${IMAGE_URL}${each.image.path}`,
                              }
                                : null}
                            />

                          </View>
                          <View style={{ paddingLeft: 16 }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: '#000',
                                fontFamily: 'sfprodisplayRegular',
                              }}
                            >
                              {each.name}
                            </Text>
                            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${each.email}`)}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#000',
                                  fontFamily: 'sfprodisplayRegular',
                                }}
                              >
                                {each.email}
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL(`tel:${each.mobile_no}`)}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#000',
                                  fontFamily: 'sfprodisplayRegular',
                                }}
                              >
                                {each.mobile_no}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )) : null}
                    </View >
                  </View>
                  {/* </ScrollView> */}
                  <View style={{ flex: 1, marginTop: 32 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#000',
                        fontFamily: 'sfprodisplayRegular',
                        marginHorizontal: 16
                      }}
                    >
                      Properties
                      </Text>
                    <AgencyProperty navigate={this.props.navigation.navigate} id={this.props.navigation.getParam('id')} />
                    <View style={{ marginTop: 32, marginHorizontal: 16 }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#000',
                          fontFamily: 'sfprodisplayRegular',
                        }}
                      >
                        About Agency
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#535353',
                          fontFamily: 'sfprotextRegular',
                          lineHeight: 22
                        }}
                      >
                        {agencyData && agencyData.agencies && agencyData.agencies.description ?
                          agencyData.agencies.description : null}
                      </Text>
                    </View>
                  </View>
                </View>
                : loading && <ActivityIndicator />}
              <View style={{ marginBottom: 20 }} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView >
    );
  }
}

const mapStateToProps = createStructuredSelector({
  agencyData: selectAgencyData,
  agentProperty: selectPropertyByAgency,
  loading: selectDataLoading,
});
const mapDispatchToProps = {
  agencyDataGet,
  propertyByAgencyData,
  clearAgencyData,
  clearPropertyByAgency,
  clearAllPropertyByAgency
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AgencyPage);
