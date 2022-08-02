/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export class DrawerMenu extends Component {
  navlink(nav, text) {
    return (
      <TouchableOpacity
        style={{
          height: 50,
          borderBottomColor: '#d3d3d3',
          borderBottomWidth: 1,
          borderStyle: 'dashed',
          marginHorizontal: 10,
        }}
        onPress={() => this.props.navigation.navigate(nav)}
      >
        <Text style={styles.link}>{text}</Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topLinks}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}
          >
            <Image
              style={{ width: '100%', height: '100%', marginTop: 40 }}
              source={require('../../../../assets/logo.png')}
            />
          </View>
          <Text style={{ color: 'white', paddingTop: 50, paddingLeft: 40 }}>
            Menu Drawer
          </Text>
        </View>
        <View style={styles.bottomLinks}>
          {this.navlink('HomeScreen', 'Home')}
          {this.navlink('TestScreen', 'Test')}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topLinks: {
    height: 160,
    backgroundColor: 'black',
    position: 'relative',
  },
  bottomLinks: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    marginTop: 160,
    width: '100%',
  },
  link: {
    flex: 1,
    fontSize: 20,
    padding: 6,
    paddingLeft: 14,
    margin: 5,
    textAlign: 'left',
  },
});
export default DrawerMenu;
