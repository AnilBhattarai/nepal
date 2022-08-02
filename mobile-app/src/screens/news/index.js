/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  selectData,
  selectLoading,
  selectBlogCategory,
  selectLoadMore,
} from '../../redux/news/news.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  newsData,
  blogData,
  blogCategoryData,
  clearNews,
  setLoadMore,
  loadMoreRequest,
  highlightedNewsData,
} from '../../redux/news/news.actions';
import SafeAreaView from 'react-native-safe-area-view';
import { IMAGE_URL } from '../../api';
import MyLoader from '../component/skeleton';

import tempImg3 from '../../../assets/home.png';
class NewsScreen extends Component {
  state = {
    selected: 'all',
    refreshing: false,
  };
  onRefresh = async () => {
    await this.props.blogCategoryData();
    if (this.state.selected === 'all') {
      this.props.highlightedNewsData();
      await this.props.newsData();
    } else {
      this.props.blogData(this.state.selected);
    }
  };
  async componentDidMount() {
    try {
      this.props.highlightedNewsData();
      await this.props.blogCategoryData();
      await this.props.newsData();
    } catch (error) {
      console.log(error);
    }
  }

  selectedOptions = async (slug_url) => {
    this.props.clearNews();
    if (slug_url === 'all') {
      this.props.highlightedNewsData();
      await this.props.newsData();
    } else {
      this.props.blogData(slug_url);
    }
    this.setState({ selected: slug_url });
  };
  renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 6,
        marginTop: 4,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 16,
        overflow: 'hidden',
        marginBottom: 10,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          this.props.navigation.navigate('NewsDetail', {
            id: item._id,
            slug: item.slug_url,
          })
        }
      >
        <View style={{ height: 160 }}>
          <Image
            resizeMode="cover"
            style={{
              width: undefined,
              height: undefined,
              flex: 1,
              backgroundColor: 'white',
            }}
            source={
              item.image && item.image.path.length > 0
                ? {
                    uri: `${IMAGE_URL}${item.image.path.replace(
                      'public/',
                      'public/400-300/',
                    )}`,
                  }
                : tempImg3
            }
          />
        </View>
        <Text
          style={{
            color: '#000',
            marginHorizontal: 16,
            fontSize: 20,
            marginVertical: 8,
            fontFamily: 'mukta',
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
  _handleLoadMore = (page) => {
    if (this.state.refreshing) {
      return null;
    } else {
      const { data } = this.props;
      const totalPages = Math.ceil(data.totaldata / data.size);
      if (page + 1 <= totalPages) {
        Promise.resolve(this.props.setLoadMore(true)).then(
          this.props.loadMoreRequest(page + 1),
        );
        console.log(page + 1, 'page');
      }
    }
  };
  render() {
    const { data, loading, blogtype, loadmore } = this.props;
    const { refreshing } = this.state;
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
              bottom: 0,
              overflow: 'hidden',
            }}
          >
            {/* <ScrollView
              showsVerticalScrollIndicator={false}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.refreshing}
            //     onRefresh={this.onRefresh}
            //   />
            // }
            > */}
            <View style={{ paddingTop: Platform.OS === 'ios' ? 0 : 40 }}>
              <Text
                style={{
                  fontSize: 28,
                  color: '#333',
                  fontWeight: 'bold',
                  marginHorizontal: 16,
                }}
              >
                News
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 16,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => this.selectedOptions('all')}
                    style={{
                      height: 32,
                      borderColor:
                        this.state.selected === 'all'
                          ? '#0291DD'
                          : 'transparent',
                      borderBottomWidth: 1,
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 16,
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        color:
                          this.state.selected === 'all' ? '#0291DD' : '#999',
                        fontSize: 16,
                      }}
                    >
                      {' '}
                      सबै न्युज
                    </Text>
                  </TouchableOpacity>
                  {blogtype.data
                    ? blogtype.data.map((each) => (
                        <TouchableOpacity
                          activeOpacity={1}
                          key={each._id}
                          onPress={() => this.selectedOptions(each.slug_url)}
                          style={{
                            height: 32,
                            borderColor:
                              each.slug_url === this.state.selected
                                ? '#0291DD'
                                : 'transparent',
                            borderBottomWidth: 1,
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 16,
                            marginBottom: 10,
                          }}
                        >
                          <Text
                            style={{
                              color:
                                each.slug_url === this.state.selected
                                  ? '#0291DD'
                                  : '#999',
                              fontSize: 16,
                            }}
                          >
                            {' '}
                            {each.title}
                          </Text>
                        </TouchableOpacity>
                      ))
                    : null}
                </View>
              </ScrollView>
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
                    Please wait we are searching...
                  </Text>
                </View>
              ) : Object.keys(data.data).length === 0 ? (
                <View
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                    alignItems: 'center',
                    marginTop: 200,
                  }}
                >
                  <Image
                    style={{ height: 100, width: 100, marginRight: 10 }}
                    source={require('../../../assets/home-single.png')}
                  />
                  <Text style={{ color: '#999', marginTop: 20 }}>
                    No News Found in this Category
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
                          height: 150,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <ActivityIndicator
                          animating
                          size="small"
                          color="blue"
                        />
                      </View>
                    ) : (
                      <View style={{ marginBottom: 120 }} />
                      // <React.Fragment  />
                    )
                  }
                />
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  data: selectData,
  loading: selectLoading,
  blogtype: selectBlogCategory,
  loadmore: selectLoadMore,
  // selectHighlightedNews,
});
const mapDispatchToProps = {
  newsData,
  blogData,
  blogCategoryData,
  clearNews,
  setLoadMore,
  loadMoreRequest,
  highlightedNewsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);
