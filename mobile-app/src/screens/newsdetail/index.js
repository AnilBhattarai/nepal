/* eslint-disable no-alert */
/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Share,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectToken } from '../../redux/app/app.selectors';
import {
  selectNewsDetails,
  selectLoading,
  selectOthersComment,
} from '../../redux/news/news.selectors';
import {
  newsDetailsGetData,
  commentGetData,
  clearNewsDetails,
  otherCommentGetData,
} from '../../redux/news/news.actions';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-tiny-toast';
import HTML from 'react-native-render-html';
class NewsDetail extends Component {
  state = {
    news_id: '',
    type: null,
    isConnected: null,
  };
  async componentDidMount() {
    this.props.clearNewsDetails();
    await this.props.newsDetailsGetData(this.props.navigation.getParam('id'));
    if (this.props.token) {
      this.props.commentGetData(this.props.navigation.getParam('id'));
      this.props.otherCommentGetData(this.props.navigation.getParam('id'));
    }
    this.unsubscribe();
  }
  unsubscribe = () =>
    NetInfo.addEventListener((state) => {
      this.setState({ type: state.type });
      this.setState({ isConnected: state.isConnected });
    });
  onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://www.nepalhomes.com/news/${this.props.navigation.getParam(
          'slug',
        )}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  onCommentPress = () => {
    if (this.props.token === '') {
      Toast.show('Please Login First!!');
    } else {
      this.props.navigation.navigate('NewsComment', {
        id: this.props.navigation.getParam('id'),
      });
    }
  };
  onLinkPress(evt, href, htmlAttribs) {
    Linking.openURL(href);
  }
  render() {
    const { details, loading, selectOthersComment } = this.props;
    // console.log(otherscomment, 'hello')
    const htmlContent = `${details}`;
    return (
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 56,
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: 48,
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              const isFromHomePage = this.props.navigation.getParam('goback');
              if (isFromHomePage) {
                this.props.navigation.goBack();
              } else {
                this.props.navigation.navigate('NewsScreen');
              }
            }}
          >
            <Image
              style={{
                height: 22,
                width: 22,
              }}
              source={require('../../../assets/back.png')}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <TouchableOpacity
              style={{
                width: 48,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={this.onShare}
            >
              <Image
                style={{
                  height: 22,
                  width: 22,
                }}
                source={require('../../../assets/share.png')}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                width: 48,
                height: 56,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={this.onCommentPress}
            >
              <Image
                style={{
                  height: 18,
                  width: 18,
                }}
                source={require('../../../assets/comment.png')}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        {this.state.isConnected === false ? (
          <View
            style={{
              backgroundColor: '#F2CDD4',
              width: '100%',
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 30,
            }}
          >
            <Text style={{ color: '#FF3B30', fontSize: 14, top: 200 }}>
              No Internet Connection !
            </Text>
          </View>
        ) :  (
        <WebView
          source={{
            uri: `https://www.nepalhomes.com/news/mobile/${this.props.navigation.getParam(
              'id',
            )}`,
          }}
          originWhitelist={['*']}
          scrollEnabled
          containerStyle={{
            marginHorizontal: 10,
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scalesPageToFit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  token: selectToken,
  details: selectNewsDetails,
  loading: selectLoading,
  selectOthersComment,
});
const mapDispatchToProps = {
  newsDetailsGetData,
  commentGetData,
  clearNewsDetails,
  otherCommentGetData,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
