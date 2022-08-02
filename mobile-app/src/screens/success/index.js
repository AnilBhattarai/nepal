/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, SafeAreaView, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { myPropertyData } from '../../redux/property/property.actions';
import { } from '../../redux/auth/auth.selectors';
// import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
export class index extends Component {
  async componentDidMount() {
    await this.props.myPropertyData();
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ marginTop: 100 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{
                height: 150,
                width: 150,
                // resizeMode: 'contain'
              }}
              source={require('../../../assets/tick.png')}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 14 }}>
              We Will Review Your Property Details.
          </Text>
            <Text style={{ fontSize: 14 }}>
              You'll get notified when it gets Verified.
          </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#202B8B',
                borderColor: '#202B8B',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 40,
                width: 200,
                padding: 10,
              }}
              onPress={() => this.props.navigation.navigate('Userprofile')}
            >
              <Text style={{ fontSize: 15, color: '#fff' }}>THANK YOU</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AddProperty')}
              style={{ height: Dimensions.get('window').width, padding: 10, marginTop: 20 }}
            >
              <Text style={{ fontSize: 15, color: 'grey', fontWeight: 'bold' }}>Add Another Property</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = {
  myPropertyData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
