/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { selectTrendingData, selectTrendingDataLoading } from '../../redux/property/property.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { trendingpropertyData } from '../../redux/property/property.actions';
import tempImg3 from '../../../assets/home.png';
import { IMAGE_URL } from '../../api';
import MyLoader from '../component/propertyskeleton';
import Icon from 'react-native-vector-icons/Ionicons';
export class TrendingProperty extends Component {
  async componentDidMount() {
    await this.props.trendingpropertyData();
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
  formatAmount = value => {
    return `Rs. ${this.formatToNepaliStyle(value)}`;
  };
  flatListEnd = () => {
    return (
      <View
        style={{
          padding: 32,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}
      >
        {Object.keys(this.props.trendingdata).length > 0 ? (
          <TouchableOpacity
            style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginHorizontal: 5 }}
            onPress={() => this.props.navigate('TrendingPropertyAll')}
          >
            <Text style={{ fontWeight: 'bold' }}
            >
              View All
          </Text>
            <View style={{
              marginLeft: 16,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              width: 44, height: 44, borderRadius: 22,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.20,
              shadowRadius: 1.41,
              elevation: 2,
            }}><Icon size={24} name="ios-arrow-forward" /></View>
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
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
          backgroundColor: 'white',
          overflow: 'hidden'

        }}
      >
        {Object.keys(item).length > 0 ?
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              this.props.navigate('TypeDetails', {
                slug: item.id.slug_url,
                id: item.id._id,
              })
            }
          >
            <View style={{
              height: 185,
              width: 300,
            }}>
              <Image
                style={{
                  height: undefined,
                  width: undefined, flex: 1,
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

            <View>
              <View style={{ width: '100%' }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 5,
                    marginLeft: 10,
                    fontFamily: 'sfprodisplayRegular'
                  }}
                >
                  {item.id && item.id.basic.title ? item.id.basic.title : null}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 4,
                    marginLeft: 10,
                    fontFamily: 'sfprotextSemibold'
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
                    fontFamily: 'sfprotextRegular'
                  }}>
                  {item.id.price.label.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
          : null}
      </View>
    );
  };
  render() {
    const { trendingdata } = this.props;
    // console.log(trendingdata)
    return (
      <View>
        {Object.keys(trendingdata).length > 0 ?
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={trendingdata.properties}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            ListFooterComponent={this.flatListEnd}
            snapToAlignment={'start'}
            snapToInterval={316} // Adjust to your content width
            decelerationRate={0.5}
          />
          : null}
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  trendingdata: selectTrendingData,
  loading: selectTrendingDataLoading,
});
const mapDispatchToProps = {
  trendingpropertyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendingProperty);
