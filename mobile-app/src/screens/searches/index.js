/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaView from 'react-native-safe-area-view';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';

import { IMAGE_URL } from '../../api';
import tempImg3 from '../../../assets/home.png';
import FilterModal from '../component/modal';
import {
  selectFilterData,
  selectDataLoading,
  selectDataLoadMore,
  setQueryData,
} from '../../redux/property/property.selectors';
import {
  filterPropertyData,
  setLoadMore,
  loadMoreRequest,
} from '../../redux/property/property.actions';
import {
  setFilterDataValue,
  clearQueryData,
  clearFilterData,
} from '../../redux/property/property.actions';
import { formatAmount } from './utils';

export class Search extends Component {
  constructor(props) {
    super(props);
    const { query } = this.props;
    let queryStr = '';
    // todo refactor to use a library for this query-string
    Object.keys(query).forEach((item) => {
      if (query[item] !== '') {
        queryStr = `${queryStr}&${item}=${query[item]}`;
      }
    });
    this.state = {
      modalVisible: false,
      refreshing: false,
      sort: false,
      query: queryStr,
    };
  }

  async componentDidMount() {
    this.props.clearFilterData();
    // initial api call goes here with default values
    await this.props.filterPropertyData(this.state.query);
    // console.log(this.state.query);
  }
  UNSAFE_componentWillUnmount() {
    this.props.clearQueryData();
  }
  onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.filterPropertyData(this.state.query).then(() => {
      this.setState({ refreshing: false });
    });
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  onSortSelected = (key, value) => {
    this.props.clearFilterData();
    this.props.setFilterDataValue({
      key,
      value,
    });
    const { query } = this.props;
    let queryStr = '';
    const completeQuery = { ...query, [key]: value };
    Object.keys(completeQuery).forEach((item) => {
      if (completeQuery[item] !== '') {
        queryStr = `${queryStr}&${item}=${completeQuery[item]}`;
      }
    });
    this.setState({ query: queryStr });
    this.props.filterPropertyData(queryStr);
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          marginVertical: 8,
          backgroundColor: 'white',
          elevation: 2,
          borderRadius: 6,
          overflow: 'hidden',
          marginHorizontal: 16,
        }}
        activeOpacity={1}
        onPress={() =>
          this.props.navigation.navigate('DetailScreen', {
            slug: item.slug_url,
            id: item._id,
            goback: 'goback',
          })
        }
      >
        <Image
          style={{
            height: 200,
            width: '100%',
          }}
          source={
            item.media && item.media.images.length > 0
              ? {
                  uri: `${IMAGE_URL}${item.media.images[0].id.path}`,
                }
              : tempImg3
          }
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'sfprodisplayRegular',
            paddingHorizontal: 16,
            paddingTop: 12,
          }}
        >
          {item.basic.title}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'sfprotextSemibold',
            paddingHorizontal: 16,
          }}
        >
          {item.price && item.price.value
            ? formatAmount(item.price.value)
            : null}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: 'gray',
            fontFamily: 'sfprotextRegular',
            paddingHorizontal: 16,
            marginBottom: 12,
          }}
        >
          {item.price.label.title}
        </Text>
      </TouchableOpacity>
    );
  };
  toggleSort = () => {
    this.setState((state) => ({
      sort: !state.sort,
    }));
  };

  _handleLoadMore = async (page) => {
    if (this.state.refreshing) {
      return null;
    } else {
      const { data } = this.props;
      const totalPages = Math.ceil(data.totaldata / data.size);
      if (page + 1 <= totalPages) {
        this.props.setLoadMore(true);
        const { query } = this.props;
        let queryStr = '';
        Object.keys(query).forEach((item) => {
          if (query[item] !== null) {
            queryStr = `${queryStr}&${item}=${query[item]}`;
          }
        });
        this.props.loadMoreRequest(`${queryStr}&page=${page + 1}`);
      }
    }
  };
  render() {
    const { data, loadmore, loading, query } = this.props;
    const { refreshing } = this.state;
    const sortData = [
      { id: 1, name: 'Latest Property First' },
      { id: 2, name: 'Highest Price First' },
      { id: 3, name: 'Lowest Price First' },
    ];
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F3FBFF' }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              backgroundColor: '#0291DD',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 16,
              }}
              onPress={() => this.setState({ modalVisible: true })}
            >
              <Icon style={{ color: '#fff' }} name="ios-funnel" />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              >
                Filter
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                padding: 5,
                backgroundColor: '#0291DD',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Icon style={{ color: '#fff' }} name="md-funnel" />

              <RNPickerSelect
                useNativeAndroidPickerStyle={false}
                style={pickerStyle}
                placeholder={{
                  label: 'Sort By',
                  value: null,
                }}
                Icon={() => (
                  <View style={{ display: 'none' }}>
                    <Icon style={{ color: '#fff' }} name="md-funnel" />
                  </View>
                )}
                placeholderTextColor="white"
                onValueChange={(itemValue) =>
                  this.onSortSelected('sort', itemValue)
                }
                items={
                  sortData
                    ? sortData.map(function type(each) {
                        return {
                          label: each.name,
                          value: each.id,
                          key: each.id,
                        };
                      })
                    : []
                }
              />
            </View>
          </View>
          <FilterModal
            modalVisible={this.state.modalVisible}
            setModalVisible={this.setModalVisible}
            navigate={this.props.navigation.navigate}
            routeName={'SearchScreen'}
          />
          <View
            style={{
              flex: 1,
            }}
          >
            {loading ? (
              <View
                style={{
                  padding: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ActivityIndicator />
                <Text style={{ color: '#999', marginTop: 20 }}>
                  Please wait while we are loading...
                </Text>
              </View>
            ) : Object.keys(data.data).length === 0 ? (
              <View
                style={{
                  padding: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  style={{ height: 100, width: 100, marginRight: 10 }}
                  source={require('../../../assets/home-single.png')}
                />
                <Text style={{ color: '#999', marginTop: 20 }}>
                  No properties matched your search
                </Text>
              </View>
            ) : (
              <FlatList
                data={data.data}
                renderItem={this.renderItem}
                keyExtractor={(item) => item._id}
                onEndReached={() => this._handleLoadMore(data.page)}
                onEndReachedThreshold={0.1}
                onRefresh={this.onRefresh}
                refreshing={refreshing}
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
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const pickerStyle = {
  inputIOS: {
    color: 'white',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputAndroid: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  placeholderColor: 'white',
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
    width: 10,
    height: 0,
    // top: 20,
    right: 15,
  },
};
const mapStateToProps = createStructuredSelector({
  query: setQueryData,
  data: selectFilterData,
  loading: selectDataLoading,
  loadmore: selectDataLoadMore,
});
const mapDispatchToProps = {
  setFilterDataValue,
  filterPropertyData,
  clearQueryData,
  setLoadMore,
  clearFilterData,
  loadMoreRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
