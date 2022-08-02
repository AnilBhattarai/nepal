/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { setIsFirstLoad } from '../../redux/app/app.actions';
import { connect } from 'react-redux';
//import LoginSignUp from '../component/loginSignup';

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

const slides = [
  {
    key: 'somethun',
    image: require('../../../assets/1.png'),
    imageStyle: styles.image,
  },
  {
    key: 'somethun-dos',
    image: require('../../../assets/2.png'),
    imageStyle: styles.image,
  },
  {
    key: 'somethun1',
    image: require('../../../assets/3.png'),
    imageStyle: styles.image,
  },
];

class index extends React.Component {
  handleSignup = () => {
    this.props.navigation.navigate('Signup');
    // this.props.setIsFirstLoad(false);
  };
  handleLogin = () => {
    this.props.navigation.navigate('Login');
    // this.props.setIsFirstLoad(false);
  };
  handleContinue = () => this.props.setIsFirstLoad(false);
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <TouchableOpacity activeOpacity={1} onPress={this.handleContinue}>
          <Ionicons
            name="md-checkmark"
            color="rgba(255, 255, 255, .9)"
            size={24}
            style={{ backgroundColor: 'transparent' }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  _renderItem = (props) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#F5F9FF',
        }}
      >
        <Image
          resizeMode="contain"
          source={props.item.image}
          style={props.item.imageStyle}
        />
      </View>
    );
  };
  render() {
    return (
      <>
        <AppIntroSlider
          styles={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          }}
          activeDotStyle={{ backgroundColor: '#0291DD' }}
          slides={slides}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          renderItem={this._renderItem}
        />
        {/* <LoginSignUp
          // navigate={this.props.navigation.navigate}
          // walkThrough={true}
        // handlecontinue={this.props.setIsFirstLoad(false)}
        /> */}
        {/* <View
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
            onPress={this.handleSignup}
          >
            <Text
              style={{ color: '#0291DD', fontSize: 16, fontWeight: 'bold' }}
            >
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
            onPress={this.handleLogin}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View> */}
      </>
    );
  }
}
export default connect(null, { setIsFirstLoad })(index);
