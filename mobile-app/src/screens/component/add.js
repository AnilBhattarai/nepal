/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { selectToken } from '../../redux/app/app.selectors';
import { selectCurrentUser } from '../../redux/auth/auth.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Toast from 'react-native-tiny-toast';
export class AddButton extends Component {
  onAdd = () => {
    if (this.props.token === '') {
      Toast.show('Please Login First!!');
    } else if (this.props.user.email_verified === false) {
      Toast.show('Please Verify Your Account');
    } else {
      this.props.navigate('AddProperty', { goback: this.props.goback });
    }
  };
  render() {
    const { user } = this.props;
    //  console.log(user.email_verified, 'hello');
    return (
      <TouchableWithoutFeedback onPress={this.onAdd}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableWithoutFeedback onPress={this.onAdd}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: 60 / 2,
                backgroundColor: '#48A2F8',
                bottom: 20,
              }}
            >
              <Icon name="ios-add" size={36} color="#fff" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectCurrentUser,
});
const mapDispatchToProps = null;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddButton);
