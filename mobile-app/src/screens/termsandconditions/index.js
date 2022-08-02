/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

class index extends Component {
  _handleBack = () => {
    this.props.navigation.navigate('Userprofile');
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          source={{
            uri: `https://nepalhomes.com/term-and-condition/mobile`,
          }}
          originWhitelist={['*']}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
}

export default index;
