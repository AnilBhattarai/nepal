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
  RefreshControl,
} from 'react-native';
import moment from 'moment';
import {
  selectLatestLoading,
  selectLatestNews,
} from '../../redux/news/news.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { latestNewsData } from '../../redux/news/news.actions';
import { IMAGE_URL } from '../../api';
import MyLoader from './skeleton';
import Icon from 'react-native-vector-icons/Ionicons';

import tempImg3 from '../../../assets/home.png';

class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
    this.flatList = React.createRef();
  }

  onRefresh = async () => {
    await this.props.latestNewsData();
  };
  componentDidMount() {
    try {
      this.props.latestNewsData();
    } catch (error) {
      console.log(error);
    }
  }
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
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 5,
          }}
          onPress={() => this.props.navigate('NewsScreen')}
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
      </View>
    );
  };
  renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: 'column',
        marginTop: 12,
        marginRight: 8,
        marginLeft: 8,
        alignItems: 'center',
        position: 'relative',
        marginBottom: 8,
        width: 300,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        overflow: 'hidden',
        elevation: 4,
        borderRadius: 6,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          this.props.navigate('NewsDetail', {
            // image:
            //   item.image && item.image.path.length > 0
            //     ? {
            //       uri: `${IMAGE_URL}${item.image.path}`,
            //     }
            //     : tempImg3,
            // title: item.title,
            // desc: item.description,
            id: item._id,
            slug: item.slug_url,
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
            //source={{ uri: `${IMAGE_URL}${item.image.path}` }}
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
            marginHorizontal: 10,
            fontSize: 18,
            marginVertical: 10,
            fontFamily: 'mukta',
          }}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
  render() {
    const { data, loading } = this.props;
    // console.log(data, 'hello')
    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <ScrollView showsHorizontalScrollIndicator={false}>
            {loading && <MyLoader />}
            {loading && <MyLoader />}
            {loading && <MyLoader />}
            {loading && <MyLoader />}
            {loading && <MyLoader />}
          </ScrollView>
          {Object.keys(data).length > 0 && (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={data.data.blogs}
              renderItem={this.renderItem}
              keyExtractor={(item) => item._id}
              ListFooterComponent={this.flatListEnd}
              snapToAlignment={'start'}
              snapToInterval={316} // Adjust to your content width
              decelerationRate={0.5}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  data: selectLatestNews,
  loading: selectLatestLoading,
});
const mapDispatchToProps = { latestNewsData };

export default connect(mapStateToProps, mapDispatchToProps)(NewsComponent);
