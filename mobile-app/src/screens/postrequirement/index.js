/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
export class index extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://www.nepalhomes.com/listing-policy/mobile',
        }}
        originWhitelist={['*']}
        textZoom={100}
        containerStyle={{
          marginTop: 10,
          marginHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}
      />
    )
  }
}

export default index;
