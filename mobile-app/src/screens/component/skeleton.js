/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import SkeletonContent from 'react-native-skeleton-content';

class skeleton extends Component {
  render() {
    return (
      <SkeletonContent
        containerStyle={{
          height: 250,
          backgroundColor: '#fff',
          borderRadius: 4,
          marginTop: 20,
          borderRadius: 4,
          borderColor: '#fff',
          elevation: 4,
          borderWidth: 1,
          marginHorizontal: 16
        }}
        animationDirection="horizontalRight"
        highlightColor="#f0f0f0"
        layout={[
          { height: 150, marginBottom: 5, backgroundColor: '#f0f0f0' },
        ]}
        isLoading={true}
      />
    );
  }
}

export default skeleton;
