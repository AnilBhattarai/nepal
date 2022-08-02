/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {
  selectHotDataAll,
  selectHotDataLoading,
  selectDataLoadMore,
} from '../../redux/property/property.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  hotpropertyDataAll,
  setLoadMore,
} from '../../redux/property/property.actions';
import tempImg3 from '../../../assets/home.png';
import { IMAGE_URL } from '../../api';

export class HotPropertyAll extends Component {
  state = {
    refreshing: false,
    scrollOpacity: 0.2,
    isInfiniteRefreshing: false,
  };
  async componentDidMount() {
    await this.props.hotpropertyDataAll();
  }
  toggleRefreshing = () => {
    this.setState(state => ({
      refreshing: !state.refreshing,
    }));
  };
  onRefresh = async () => {
    await this.props.hotpropertyDataAll();
    this.toggleRefreshing();
    // this.setState({ searches: item.data.data });
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
  // _handleLoadMore = page => {
  //   if (this.state.isRefreshing) {
  //     return null;
  //   } else {
  //     const { offer } = this.props;
  //     const totalPages = Math.ceil(offer.totaldata / offer.size);
  //     if (page + 1 <= totalPages) {
  //       // this.props.refreshAction({ page: page + 1 });
  //       // );
  //       Promise.resolve(this.props.setLoadMoreIndicator(true)).then(
  //         // Promise.resolve(
  //         this.props.refreshAction.filter
  //           ? this.props.refreshAction.offerRequest({ filter: true, page: page + 1 })
  //           : this.props.refreshAction({ page: page + 1 }),
  //       );
  //       console.log(page + 1, 'page');
  //     }
  //   }
  // };

  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          width: Dimensions.get('window').width / 2 - 16,
          flexDirection: 'column',
          marginVertical: 4,
          marginHorizontal: 4,
          position: 'relative',
          backgroundColor: '#FFFFFF',
          borderRadius: 2,
          elevation: 4,
          overflow: 'hidden',
        }}
      >
        {Object.keys(item).length > 0 && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              this.props.navigation.navigate('TypeDetails', {
                slug: item.slug_url,
                id: item._id,
                goback: 'goback',
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
                  item && item.media.images.length > 0
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
                  {item && item.basic.title ? item.basic.title : null}
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
        )}
      </View>
    );
  };
  _handleLoadMore = page => {
    if (this.state.isInfiniteRefreshing) {
      return null;
    } else {
      const { hotdata } = this.props;
      const totalPages = Math.ceil(hotdata.totaldata / hotdata.size);
      if (page + 1 <= totalPages) {
        Promise.resolve(this.props.setLoadMore(true)).then(
          this.props.hotpropertyDataAll(page + 1),
        );
        console.log(page + 1, 'page');
      }
    }
  };
  render() {
    const { hotdata, loadmore } = this.props;
    const { isInfiniteRefreshing } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, marginHorizontal: 8 }}>
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        > */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={hotdata.data}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          onEndReached={() => this._handleLoadMore(hotdata.page)}
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
      </SafeAreaView>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  hotdata: selectHotDataAll,
  loading: selectHotDataLoading,
  loadmore: selectDataLoadMore,
});
const mapDispatchToProps = {
  hotpropertyDataAll,
  setLoadMore,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HotPropertyAll);
