/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { selectWishListData, selectDataLoading, selectFavouriteData } from '../../redux/property/property.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { wishlistPropertyData, favouritePropertyDataGet } from '../../redux/property/property.actions';
import tempImg3 from '../../../assets/home.png';
import { IMAGE_URL } from '../../api';
import MyLoader from './propertyskeleton';

export class WishListProperty extends Component {
  async componentDidMount() {
    try {
      await this.props.wishlistPropertyData();
      // await this.props.favouritePropertyDataGet();
    } catch (error) {
      console.log(error);
    }
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
  renderItem = ({ item }) => {
    const onHandleProject = () => {
      if (item.property_id.is_project === true) {
        this.props.navigate('ProjectDetails', {
          slug: item.property_id.slug_url,
          id: item.property_id._id,
          goback: 'goback',
        });
      } else {
        this.props.navigate('TypeDetails', {
          slug: item.property_id.slug_url,
          id: item.property_id._id,
          goback: 'goback',
        });
      }
    };
    return (
      <View
        style={{
          flexDirection: 'column',
          marginTop: 12,
          marginRight: 8,
          marginLeft: 8,
          borderRadius: 2,
          alignItems: 'center',
          position: 'relative',
          marginBottom: 8,
          width: 300,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onHandleProject}
        >
          <View style={{
            height: 185,
            width: 300,
          }}>
            <Image
              style={{
                height: undefined,
                width: undefined,
                flex: 1,
                borderRadius: 6
              }}
              source={
                item && item.property_id.media && item.property_id.media.images.length > 0
                  ? {
                    uri: `${IMAGE_URL}${item.property_id.media.images[0].id.path.replace(
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
                {item && item.property_id.basic && item.property_id.basic.title
                  ? item.property_id.basic.title
                  : null}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 4,
                  marginLeft: 10,
                  fontFamily: 'sfprotextSemibold'
                }}
              >
                {item && item.property_id.price && item.property_id.price.value
                  ? this.formatAmount(item.property_id.price.value)
                  : null}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{ justifyContent: 'space-around', flexDirection: 'row' }}
          >
            {loading && <MyLoader />}
            {loading && <MyLoader />}
            {loading && <MyLoader />}
            {loading && <MyLoader />}
            {loading && <MyLoader />}
          </View>
        </ScrollView> */}
        {/* {this.props.projectdata.length &&  */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.props.projectdata}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          snapToAlignment={'start'}
          snapToInterval={316} // Adjust to your content width
          decelerationRate={0.5}
        />

      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  projectdata: selectWishListData,
  loading: selectDataLoading,
  selectFavouriteData,
});
const mapDispatchToProps = {
  wishlistPropertyData,
  favouritePropertyDataGet,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishListProperty);
