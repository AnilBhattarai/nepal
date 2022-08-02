/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  BackHandler,
  Platform,
  RefreshControl,
} from 'react-native';
import {
  selectRecentData,
  selectRecentDataLoading,
  selectWantedProperties,
  setQueryData,
} from '../../redux/property/property.selectors';
import Toast from 'react-native-tiny-toast';
import {
  recentpropertyData,
  wantedPropertyData,
  projectPropertyData,
  trendingpropertyData,
  hotpropertyData,
  setFilterDataValue,
  // clearQueryData,
  filterPropertyData,
  clearFilterData,
} from '../../redux/property/property.actions';
import { selectBlogCategory } from '../../redux/news/news.selectors';
import {
  newsData,
  blogData,
  blogCategoryData,
} from '../../redux/news/news.actions';
import Icon from 'react-native-vector-icons/Feather';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import FilterModal from '../component/modal';
import tempImg3 from '../../../assets/home.png';
import { IMAGE_URL } from '../../api';
import { enumsData } from '../../redux/enums/enums.actions';
import { selectEnumsData } from '../../redux/enums/enums.selectors';
import HotProperty from '../component/hotproperty';
import TrendingProperty from '../component/trendingproperty';
import ProjectsProperty from '../component/projectproperty';
import WantedProperty from '../component/wantedproperty';
import MyLoader from '../component/propertyskeleton';
import Slider from '../component/slider';
import News from '../component/newscomponent';
import Ionicon from 'react-native-vector-icons/Ionicons';

export class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      backClickCount: 0,
      refreshing: false,
    };
    this.backClickCount = 0;
  }
  onRefresh = async () => {
    await this.props.recentpropertyData();
    await this.props.wantedPropertyData();
    await this.props.trendingpropertyData();
    await this.props.projectPropertyData();
    await this.props.hotpropertyData();
    // await this.props.blogCategoryData();
    // this.setState({ searches: item.data.data });
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  async componentDidMount() {
    try {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackPress,
      );
      // console.log(this.props.navigation);
      await this.props.recentpropertyData();
      // await this.props.blogCategoryData();
    } catch (error) {
      console.log(error);
    }
  }
  UNSAFE_componentWillUnmount() {
    this.backHandler.remove();
  }
  onPurposeSelected = async (id) => {
    this.props.clearFilterData();
    Promise.resolve(
      this.props.setFilterDataValue({
        key: 'find_property_purpose',
        value: id,
      }),
    ).then(this.props.navigation.navigate('SearchScreen'));
  };
  onCategorySelected = async (id) => {
    this.props.clearFilterData();
    Promise.resolve(
      this.props.setFilterDataValue({
        key: 'find_property_category',
        value: id,
      }),
    ).then(this.props.navigation.navigate('SearchScreen'));
  };
  handleBackPress = () => {
    const isFocused = this.props.navigation.isFocused();
    if (isFocused) {
      this.backClickCount++;
      this.goBack();
      return true;
    } else {
      if (this.backClickCount > 1) {
        this.backClickCount = 0;
      }
    }
    return false;
  };

  goBack = () => {
    if (this.backClickCount > 1) {
      this.backClickCount = 0;
      BackHandler.exitApp();
    } else if (this.backClickCount === 1) {
      Toast.show('Press Again to exit !');
    }
  };

  formatToNepaliStyle(amt) {
    if (!amt) {
      return '0';
    }
    const amtStr = `${amt}`;
    const indexOfPeriod = amtStr.indexOf('.');
    let sliceIndex = indexOfPeriod - 1;
    if (indexOfPeriod === -1) {
      sliceIndex = amtStr.length - 1;
    }
    const part1 = amtStr.slice(0, sliceIndex);
    const part2 = amtStr.slice(sliceIndex);
    const withCommas = part1.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return `${withCommas}${part2}`;
  }
  formatAmount = (value) => {
    return `Rs. ${this.formatToNepaliStyle(value)}`;
  };
  flatListEnd = () => {
    return (
      <View
        style={{
          padding: 32,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        {Object.keys(this.props.recentdata).length > 0 ? (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: 5,
            }}
            onPress={() => this.props.navigation.navigate('AllProperties')}
          >
            <Text style={{ fontWeight: 'bold' }}>View All</Text>
            <View
              style={{
                marginLeft: 16,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                width: 44,
                height: 44,
                borderRadius: 22,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 2,
              }}
            >
              <Ionicon size={24} name="ios-arrow-forward" />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  renderRecentItem = ({ item }) => {
    const { recentdata } = this.props;
    return (
      <View
        style={{
          flexDirection: 'column',
          marginTop: 12,
          marginRight: 8,
          marginLeft: 8,
          borderRadius: 6,
          alignItems: 'center',
          position: 'relative',
          marginBottom: 8,
          backgroundColor: 'white',
          width: 300,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
        }}
      >
        {Object.keys(recentdata).length > 0 ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              this.props.navigation.navigate('TypeDetails', {
                slug: item.slug_url,
                id: item._id,
              })
            }
          >
            <View
              style={{
                height: 185,
                width: 300,
              }}
            >
              <Image
                style={{
                  height: undefined,
                  width: undefined,
                  flex: 1,
                  borderRadius: 6,
                }}
                source={
                  item.media && item.media.images.length > 0
                    ? {
                        uri: `${IMAGE_URL}${item.media.images[0].id.path.replace(
                          'public/',
                          'public/400-300/',
                        )}`,
                      }
                    : tempImg3
                }
              />
            </View>
            <View>
              <View style={{ width: '100%' }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 5,
                    marginLeft: 10,
                    fontFamily: 'sfprodisplayRegular',
                  }}
                >
                  {item.basic.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 4,
                    marginLeft: 10,
                    fontFamily: 'sfprotextSemibold',
                  }}
                >
                  {item && item.price.value
                    ? this.formatAmount(item.price.value)
                    : null}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#999',
                    marginLeft: 10,

                    marginBottom: 8,

                    fontFamily: 'sfprotextRegular',
                  }}
                >
                  {item.price.label.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  render() {
    const { loading, recentdata, blogtype, selectEnumsData } = this.props;
    // console.log(loading, 'loading');
    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents
          onDidBlur={(payload) => {
            this.backClickCount = 0;
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: '#202B8B',
          }}
        >
          <View
            style={{
              backgroundColor: '#F3FBFF',
              bottom: 0,
              overflow: 'hidden',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  marginTop: 22,
                  height: 56,
                }}
              >
                <Image
                  style={{ height: 25, width: 180 }}
                  source={require('../../../assets/logo.png')}
                />
                <TouchableOpacity
                  style={{
                    height: 48,
                    width: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  activeOpacity={1}
                  onPress={() => this.setState({ modalVisible: true })}
                >
                  <Icon
                    style={{
                      color: '#4A4A4A',
                    }}
                    size={20}
                    name="search"
                  />
                </TouchableOpacity>
              </View>

              <Slider />
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#F3FBFF',
                    paddingVertical: 16,
                  }}
                >
                  {selectEnumsData.property_purpose
                    ? selectEnumsData.property_purpose.map((each) => (
                        <View style={{ width: 90 }} key={each._id}>
                          <TouchableOpacity
                            activeOpacity={1}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              flex: 1,
                            }}
                            onPress={() => this.onPurposeSelected(each._id)}
                          >
                            <Image
                              style={{ height: 48, width: 48 }}
                              source={
                                each && each.media
                                  ? {
                                      uri: `${IMAGE_URL}${each.media.path}`,
                                    }
                                  : tempImg3
                              }
                            />
                            <Text style={{ fontFamily: 'sfprotextRegular' }}>
                              {each.title}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))
                    : null}
                  {selectEnumsData.property_category
                    ? selectEnumsData.property_category.map((each) => (
                        <View style={{ width: 96 }} key={each._id}>
                          <TouchableOpacity
                            activeOpacity={1}
                            activeOpacity={1}
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              flex: 1,
                            }}
                            key={each._id}
                            onPress={() => this.onCategorySelected(each._id)}
                          >
                            <Image
                              style={{ height: 48, width: 48 }}
                              source={
                                each && each.media
                                  ? {
                                      uri: `${IMAGE_URL}${each.media.path}`,
                                    }
                                  : tempImg3
                              }
                            />
                            <Text style={{ fontFamily: 'sfprotextRegular' }}>
                              {each.title}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))
                    : null}
                </View>
              </ScrollView>
              <FilterModal
                modalVisible={this.state.modalVisible}
                setModalVisible={this.setModalVisible}
                navigate={this.props.navigation.navigate}
              />

              {/* <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 16,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  display: 'none',
                }}
              >
                <Text
                  style={{
                    color: '#212529',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  Recent Projects
                </Text>
                {Object.keys(recentdata).length > 0 ? (
                  <TouchableOpacity
                    style={{
                      alignItems: 'flex-end',
                      marginHorizontal: 5,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('ProjectAllProperties')
                    }
                  >
                    <Text
                      style={{
                        borderBottomColor: '#0291DD',
                        borderBottomWidth: 1,
                        fontSize: 12,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                      }}
                    >
                      View All
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View> */}
              {loading && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      marginHorizontal: 16,
                    }}
                  >
                    <MyLoader />
                    <MyLoader />
                    <MyLoader />
                  </View>
                </ScrollView>
              )}
              {/* <ProjectsProperty navigate={this.props.navigation.navigate} /> */}

              <View
                style={{
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontSize: 24,
                    marginLeft: 16,
                    fontFamily: 'sfprodisplayRegular',
                  }}
                >
                  Premium
                </Text>
                {/* {Object.keys(recentdata).length > 0 ? (
                  <TouchableOpacity
                    style={{
                      alignItems: 'flex-end',
                      marginHorizontal: 5,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('PremiumPropertyAll')
                    }
                  >
                    <Text
                      style={{
                        borderBottomColor: '#0291DD',
                        borderBottomWidth: 1,
                        fontSize: 12,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                      }}
                    >
                      View All
                    </Text>
                  </TouchableOpacity>
                ) : null} */}
                {loading && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View
                      style={{
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        marginHorizontal: 16,
                      }}
                    >
                      <MyLoader />
                      <MyLoader />
                      <MyLoader />
                    </View>
                  </ScrollView>
                )}

                <HotProperty navigate={this.props.navigation.navigate} />
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontSize: 24,
                    marginLeft: 10,
                    fontFamily: 'sfprodisplayRegular',
                  }}
                >
                  Featured
                </Text>
                {/* {Object.keys(recentdata).length > 0 ? (
                  <TouchableOpacity
                    style={{
                      alignItems: 'flex-end',
                      marginHorizontal: 5,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('TrendingPropertyAll')
                    }
                  >
                    <Text
                      style={{
                        borderBottomColor: '#0291DD',
                        borderBottomWidth: 1,
                        fontSize: 12,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                      }}
                    >
                      View All
                    </Text>
                  </TouchableOpacity>
                ) : null} */}
              </View>
              {loading && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      marginHorizontal: 16,
                    }}
                  >
                    <MyLoader />
                    <MyLoader />
                    <MyLoader />
                  </View>
                </ScrollView>
              )}
              <TrendingProperty navigate={this.props.navigation.navigate} />

              {/* <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.navigation.navigate('ApplyLoan')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 6,
                  backgroundColor: '#0291DD',
                  marginHorizontal: 16,
                  marginTop: 16,
                  padding: 12,
                }}
              >
                <View style={{ width: 64 }}>
                  <Image
                    style={{ height: 48, width: 48 }}
                    source={require('../../../assets/loan.png')}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: 'sfprodisplayRegular',
                      color: '#fff',
                      fontSize: 20,
                      marginLeft: 16,
                      marginVertical: 4,
                    }}
                  >
                    Thinking of Home Loan?
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'sfprotextRegular',
                      color: '#fff',
                      fontSize: 14,
                      marginLeft: 16,
                    }}
                  >
                    Apply for home loan and get advices from loan experts.
                  </Text>
                </View> 
              </TouchableOpacity>*/}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.navigation.navigate('UnitConverter')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 6,
                  backgroundColor: '#FFE394',
                  marginHorizontal: 16,
                  marginTop: 16,
                  padding: 12,
                }}
              >
                <View style={{ width: 64, justifyContent: 'center' }}>
                  <Image
                    style={{ height: 35, width: 56 }}
                    source={require('../../../assets/tape.png')}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: 'sfprodisplayRegular',
                      color: '#333',
                      fontSize: 20,
                      marginLeft: 16,
                      marginVertical: 4,
                    }}
                  >
                    Convert Area Units?
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'sfprotextRegular',
                      color: '#333',
                      fontSize: 14,
                      marginLeft: 16,
                    }}
                  >
                    Hassle free conversion, Convert anything at one shot
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.props.navigation.navigate('EMICalculator')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 6,
                  backgroundColor: '#0291DD',
                  marginHorizontal: 16,
                  marginTop: 16,
                  padding: 12,
                }}
              >
                <View style={{ width: 64 }}>
                  <Image
                    style={{ height: 62, width: 60 }}
                    source={require('../../../assets/calc.png')}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: 'sfprodisplayRegular',
                      color: '#fff',
                      fontSize: 20,
                      marginLeft: 16,
                      marginVertical: 4,
                    }}
                  >
                    Find Loan Amount
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'sfprotextRegular',
                      color: '#fff',
                      fontSize: 14,
                      marginLeft: 16,
                    }}
                  >
                    Calculate home loans and get bigger picture of future
                  </Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 16,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontSize: 24,
                    marginLeft: 10,
                    fontFamily: 'sfprodisplayRegular',
                  }}
                >
                  Recent
                </Text>
              </View>
              {loading && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      marginHorizontal: 16,
                    }}
                  >
                    <MyLoader />
                    <MyLoader />
                    <MyLoader />
                  </View>
                </ScrollView>
              )}
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recentdata.data}
                renderItem={this.renderRecentItem}
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ paddingHorizontal: 12 }}
                ListFooterComponent={this.flatListEnd}
                snapToAlignment={'start'}
                snapToInterval={316} // Adjust to your content width
                decelerationRate={0.5}
                // onEndReachedThreshold={0.1}
              />
              <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 16,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    color: '#000',
                    fontSize: 24,
                    marginLeft: 10,
                    fontFamily: 'sfprodisplayRegular',
                  }}
                >
                  News
                </Text>
              </View>
              {loading && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      flexDirection: 'row',
                      marginHorizontal: 16,
                    }}
                  >
                    <MyLoader />
                    <MyLoader />
                    <MyLoader />
                  </View>
                </ScrollView>
              )}
              <View
                style={{
                  marginHorizontal: 10,
                }}
              >
                <News navigate={this.props.navigation.navigate} />
              </View>
              {/* <View
                style={{
                  marginVertical: 20,
                  marginHorizontal: 16,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  style={{
                    color: '#212529',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  Wanted Properties
              </Text>
                {Object.keys(recentdata).length > 0 ? (
                  <TouchableOpacity
                    style={{
                      alignItems: 'flex-end',
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('WantedAllProperties')
                    }
                  >
                    <Text
                      style={{
                        borderBottomColor: '#0291DD',
                        borderBottomWidth: 1,
                        fontSize: 12,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                      }}
                    >
                      View All
                  </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <WantedProperty navigate={this.props.navigation.navigate} />*/}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  this.props.navigation.navigate('RequestProperty')
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 16,
                  marginVertical: 8,
                }}
              >
                <Image
                  style={{ height: 70, width: 70, marginTop: 10 }}
                  source={require('../../../assets/home-single.png')}
                />
                <View style={{ flex: 1, paddingLeft: 16 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'sfprotextSemibold',
                      color: '#000',
                    }}
                  >
                    Didn't find what you looking for?
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'sfprotextRegular',
                      color: '#777',
                    }}
                  >
                    Share your requirements with us.
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ paddingBottom: 30 }} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    height: 48,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    elevation: 2,
  },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 16,
    marginTop: 20,
    elevation: 3,
    paddingHorizontal: 8,
  },
});

const mapStateToProps = createStructuredSelector({
  recentdata: selectRecentData,
  loading: selectRecentDataLoading,
  wantedData: selectWantedProperties,
  selectEnumsData,
  query: setQueryData,
  blogtype: selectBlogCategory,
});
const mapDispatchToProps = {
  recentpropertyData,
  wantedPropertyData,
  projectPropertyData,
  trendingpropertyData,
  hotpropertyData,
  enumsData,
  setFilterDataValue,
  // clearQueryData,
  filterPropertyData,
  blogCategoryData,
  newsData,
  blogData,
  clearFilterData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
