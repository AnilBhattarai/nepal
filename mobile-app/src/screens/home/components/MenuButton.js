/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';

export class MenuButton extends Component {
  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={1}onPress={() => this.props.navigation.toggleDrawer()}>
          <Image
            style={{ height: 30, width: 30, marginTop: 50 }}
            source={require('../../../../assets/menu.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default MenuButton;
