/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import SkeletonContent from 'react-native-skeleton-content';

class skeleton extends Component {
  render() {
    return (
      <SkeletonContent
        containerStyle={{
          height: 200,
          width: 300,
          flex: 1,
          backgroundColor: '#fff',
          flexDirection: 'column',
          marginRight: 12,
          marginTop: 12,
          borderRadius: 2,
          borderColor: '#fff',
          borderWidth: 1,
          alignItems: 'center',
          position: 'relative',
          marginBottom: 20,
        }}
        animationDirection="horizontalRight"
        highlightColor="#f0f0f0"
        layout={[
          // long line
          {
            width: 300,
            height: 180,
            marginBottom: 5,
            backgroundColor: '#f0f0f0',
          },
          // short line
          // { width: 200, height: 15, marginBottom: 5 },
        ]}
        isLoading={true}
      />
    );
  }
}

export default skeleton;
