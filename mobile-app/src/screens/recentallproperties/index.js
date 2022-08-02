/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import tempImg3 from '../../../assets/home.png';
import { IMAGE_URL } from '../../api';
import {
  selectRecentDataAll,
  selectRecentDataLoading,
  selectDataLoadMore,
} from '../../redux/property/property.selectors';
import {
  recentpropertyDataAll,
  clearRecentData,
  setLoadMore,
} from '../../redux/property/property.actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

export class index extends Component {
  state = {
    refreshing: false,
    isInfiniteRefreshing: false,
  };
  async componentDidMount() {
    try {
      this.props.clearRecentData();
      await this.props.recentpropertyDataAll();
    } catch (error) {
      console.log(error);
    }
  }
  toggleRefreshing = () => {
    this.setState(state => ({
      refreshing: !state.refreshing,
    }));
  };
  onRefresh = async () => {
    this.props.clearRecentData();
    this.toggleRefreshing();
    await this.props.recentpropertyDataAll();
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
  formatAmount = value => {
    return `Rs. ${this.formatToNepaliStyle(value)}`;
  };
  renderRecentItem = ({ item }) => {
    const { recentdata } = this.props;
    return (
      <View
        style={{
          flex: 1,
          maxWidth: Dimensions.get('window').width / 2 - 12,
          flexDirection: 'column',
          marginLeft: 8,
          marginBottom: 8,
          position: 'relative',
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
          elevation: 4,
        }}
      >
        {Object.keys(recentdata).length > 0 && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              this.props.navigation.navigate('TypeDetails', {
                slug: item.slug_url,
              })
            }
          >
            <Image
              style={{
                height: 150,
                width: '100%',
                borderTopWidth: 0.5,
                borderColor: '#fff',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
              source={
                item.media && item.media.images.length > 0
                  ? {
                    uri: `${IMAGE_URL}${item.media.images[0].id.path}`,
                  }
                  : tempImg3
              }
            />
            <View>
              <View style={{ width: '100%' }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 5,
                    marginLeft: 10,
                  }}
                  numberOfLines={1}
                >
                  {item.basic.title}
                </Text>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 11,
                    color: '#8A8A8F',
                    marginTop: 5,
                    marginLeft: 10,
                  }}
                >
                  {item.address.area_id && item.address.area_id.name
                    ? item.address.area_id.name
                    : null}
                  {', '}
                  {item.address.city_id && item.address.city_id.name
                    ? item.address.city_id.name
                    : null}
                </Text>
                <Text
                  style={{
                    fontWeight: 'normal',
                    fontSize: 14,
                    marginBottom: 5,
                    marginLeft: 10,
                  }}
                >
                  {item.price && item.price.value
                    ? this.formatAmount(item.price.value)
                    : null}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  _handleLoadMore = page => {
    if (this.state.isInfiniteRefreshing) {
      return null;
    } else {
      const { recentdata } = this.props;
      const totalPages = Math.ceil(recentdata.totaldata / recentdata.size);
      if (page + 1 <= totalPages) {
        Promise.resolve(this.props.setLoadMore(true)).then(
          this.props.recentpropertyDataAll(page + 1),
        );
        console.log(page + 1, 'page');
      }
    }
  };
  render() {
    const { recentdata, loadmore } = this.props;
    const { isInfiniteRefreshing } = this.state;
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
        > */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.props.recentdata.data}
          renderItem={this.renderRecentItem}
          keyExtractor={item => item._id}
          numColumns={2}
          onEndReached={() => this._handleLoadMore(recentdata.page)}
          onEndReachedThreshold={0.1}
          onRefresh={this.onRefresh}
          refreshing={isInfiniteRefreshing}
          ListFooterComponent={() =>
            loadmore ? (
              <View
                style={{
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator animating size="small" color="green" />
              </View>
            ) : (
                <React.Fragment />
              )
          }
        />
        {/* </ScrollView> */}
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  recentdata: selectRecentDataAll,
  loading: selectRecentDataLoading,
  loadmore: selectDataLoadMore,
});
const mapDispatchToProps = {
  recentpropertyDataAll,
  clearRecentData,
  setLoadMore,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
