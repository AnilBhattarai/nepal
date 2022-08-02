/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { setIsFirstLoad } from '../../redux/app/app.actions';
import { connect } from 'react-redux';

class loginSignup extends Component {
  componentDidMount() {
    if (this.props.walkThrough) {
      this.props.setIsFirstLoad(false);
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: 700,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            padding: 5,
            borderColor: '#0291DD',
            borderRadius: 4,
            borderWidth: 1,
          }}
          onPress={() => this.props.navigate('Signup')}
        >
          <Text style={{ color: '#0291DD', fontSize: 16, fontWeight: 'bold' }}>
            SIGN UP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#0291DD',
            padding: 5,
            borderColor: '#0291DD',
            borderRadius: 4,
            borderWidth: 1,
            marginLeft: 20,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  { setIsFirstLoad },
)(loginSignup);
