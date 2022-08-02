/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import {
  selectHotData,
  selectHotDataLoading,
} from '../../redux/property/property.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { hotpropertyData } from '../../redux/property/property.actions';
import tempImg3 from '../../../assets/home.png';
import { IMAGE_URL } from '../../api';
import Icon from 'react-native-vector-icons/Ionicons';

export class HotProperty extends Component {
  state = {
    //hot: [],
    isRefreshing: false,
    scrollOpacity: 0.2,
  };
  async componentDidMount() {
    await this.props.hotpropertyData();
  }
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
        {Object.keys(this.props.hotdata).length > 0 ? (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: 5,
            }}
            onPress={() => this.props.navigate('PremiumPropertyAll')}
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
              <Icon size={24} name="ios-arrow-forward" />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  renderItem = ({ item }) => {
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
          width: 300,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          overflow: 'hidden',
          elevation: 4,
          backgroundColor: 'white',
        }}
      >
        {Object.keys(item).length > 0 && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              this.props.navigate('TypeDetails', {
                slug: item.id.slug_url,
                id: item.id._id,
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
                }}
                source={
                  item.id && item.id.media.images.length > 0
                    ? {
                        uri: `${IMAGE_URL}${item.id.media.images[0].id.path.replace(
                          'public/',
                          'public/400-300/',
                        )}`,
                      }
                    : tempImg3
                }
              />
            </View>

            {/* item1.properties[0].media.images[0].path */}

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
                  {item.id && item.id.basic.title ? item.id.basic.title : null}
                </Text>
                {/* <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 11,
                    color: '#8A8A8F',
                    marginTop: 5,
                    marginLeft: 10,
                  }}
                >
                  {item.id && item.id.address.area_id.name
                    ? item.id.address.area_id.name
                    : null}
                  {', '}
                  {item.id && item.id.address.city_id.name
                    ? item.id.address.city_id.name
                    : null}
                </Text> */}

                {item.id.price && item.id.price.is_price_on_call ? (
                  <Text
                    style={{
                      fontSize: 14,
                      marginTop: 4,
                      marginLeft: 10,
                      fontFamily: 'sfprotextSemibold',
                    }}
                  >
                    Price On Call
                  </Text>
                ) : (
                  <>
                    <Text
                      style={{
                        fontSize: 14,
                        marginTop: 4,
                        marginLeft: 10,
                        fontFamily: 'sfprotextSemibold',
                      }}
                    >
                      {item.id && item.id.price.value
                        ? this.formatAmount(item.id.price.value)
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
                      {item.id.price.label.title}
                    </Text>
                  </>
                )}

                {/* <Text
                  style={{
                    fontSize: 14,
                    marginTop: 4,
                    marginLeft: 10,
                    fontFamily: 'sfprotextSemibold',
                  }}
                >
                  {item.id && item.id.price.value
                    ? this.formatAmount(item.id.price.value)
                    : null}
                </Text> */}
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  render() {
    const { hotdata } = this.props;
    // console.log(hotdata.properties, 'hot data')
    return (
      <View>
        {Object.keys(hotdata).length > 0 ? (
          <FlatList
            // getItemLayout={index => index}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={hotdata.properties}
            renderItem={this.renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            ListFooterComponent={this.flatListEnd}
            snapToAlignment={'start'}
            snapToInterval={316} // Adjust to your content width
            decelerationRate={0.5}
          />
        ) : null}
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  hotdata: selectHotData,
  loading: selectHotDataLoading,
});
const mapDispatchToProps = {
  hotpropertyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(HotProperty);
