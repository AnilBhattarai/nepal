import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from '../';
import TestScreen from '../../test';

import DrawerMenu from './DrawerMenu';
const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
  drawerWidth: WIDTH * 0.8,
  contentComponent: ({ navigation }) => {
    return <DrawerMenu navigation={navigation} />;
  },
};

const DrawerNavigator = createDrawerNavigator(
  {
    HomeScreen,
    TestScreen,
  },
  DrawerConfig,
);

export default createAppContainer(DrawerNavigator);
