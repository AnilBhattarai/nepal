/* eslint-disable react/react-in-jsx-scope */
import React, { Component } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { homeSlider } from '../../redux/property/property.actions';
import { selectSlider } from '../../redux/property/property.selectors';
import { IMAGE_URL } from '../../api';
import tempImg3 from '../../../assets/home.png';

const { width: screenWidth } = Dimensions.get('window');

class MyCarousel extends Component {
  componentDidMount() {
    this.props.homeSlider();
  }

  _renderItem({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={
            item && item.image && item.image.path.length > 0
              ? {
                uri: `${IMAGE_URL}${item.image.path}`,
              }
              : tempImg3
          }
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.5}
          {...parallaxProps}
        />
      </View>
    );
  }

  render() {
    const { selectSlider } = this.props;
    return (
      <>
        <Carousel
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          data={selectSlider.images || []}
          renderItem={this._renderItem}
          hasParallaxImages={true}
          autoplay
          loop
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth,
    height: screenWidth / 1.72,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    // width: screenWidth,
  },
  image: {
    aspectRatio: 1122 / 617,
    resizeMode: 'contain',
  },
});
const mapStateToProps = createStructuredSelector({
  selectSlider,
});

const mapDispatchToProps = {
  homeSlider,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCarousel);
