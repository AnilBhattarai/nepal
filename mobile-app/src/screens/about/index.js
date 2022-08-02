/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import loader from '../../../assets/loader.gif';

export class index extends Component {
  render() {
    return (
      <ImageBackground resizeMode="contain" source={loader} style={{ width: '100%', height: '100%' }}>
        <WebView
          source={{
            uri: 'https://www.nepalhomes.com/about-us/mobile',
          }}
          originWhitelist={['*']}
          textZoom={100}
          containerStyle={{
            marginTop: 10,
            marginHorizontal: 10,
          }}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    );
  }
}

export default index;
