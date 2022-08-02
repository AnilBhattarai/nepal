/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { IMAGE_URL } from '../../api';
import { bankDetailsData, setLoadMore } from '../../redux/property/property.actions';
import {
  selectBankDetails,
  selectDataLoading,
  selectDataLoadMore,
} from '../../redux/property/property.selectors';

export class BankLoan extends Component {
  state = {
    refreshing: false,
  }
  componentDidMount() {
    this.props.bankDetailsData();
  }
  onRefresh = async () => {
    await this.props.bankDetailsData();
  };
  renderItem = ({ item }) => {
    return (
      <View
        key={item._id}
        style={{
          width: Dimensions.get('window').width / 2 - 16,
          marginBottom: 10,
          marginLeft: 10,
          backgroundColor: '#FFFFFF',
          borderRadius: 5,
          elevation: 4,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
        >
          <Image
            style={{
              height: 64,
              width: '100%',
              borderTopWidth: 0.5,
              borderColor: '#fff',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              resizeMode: 'contain',
              marginVertical: 8
            }}
            source={
              item.Logo &&
                item.Logo.path &&
                item.Logo.path.length > 0
                ? {
                  uri: `${IMAGE_URL}${item.Logo.path}`,
                }
                : null
            }
          />
          <View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 10,
                }}
                numberOfLines={1}
              >
                {item.Bank_Name}
              </Text>
              {/* <Text
                          style={{
                            fontWeight: 'normal',
                            fontSize: 11,
                            color: '#8A8A8F',
                            marginLeft: 10,
                          }}
                        >
                          Tenure: {each.Min_Tenure}-{each.Max_Tenure} Yrs
                          </Text> */}
              <Text
                style={{
                  fontWeight: 'normal',
                  fontSize: 14,
                  marginLeft: 10,
                }}
              >
                Interest: {item.Rate_Of_interest}%
                          </Text>
              <TouchableOpacity
                style={{
                  width: '100%',
                  padding: 12

                }}
                onPress={() => this.props.navigation.navigate('ApplyLoan', {
                  bank_name: item.Bank_Name,
                })}
              >
                <Text style={{ color: '#0291DD', fontWeight: 'bold', textAlign: 'center' }}>
                  Apply for Loan
                            </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  _handleLoadMore = page => {
    if (this.state.refreshing) {
      return null;
    } else {
      const { data } = this.props;
      const totalPages = Math.ceil(data.totaldata / data.size);
      if (page + 1 <= totalPages) {
        Promise.resolve(this.props.setLoadMore(true)).then(
          this.props.bankDetailsData(page + 1),
        );
        console.log(page + 1, 'page');
      }
    }
  };
  render() {
    const { data, loading, loadmore } = this.props;
    const { refreshing } = this.state;
    // console.log(data, 'hello');
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#F3FBFF' }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.data}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          onEndReached={() => this._handleLoadMore(data.page)}
          onEndReachedThreshold={0.1}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
          numColumns={2}
          ListFooterComponent={() =>
            loadmore ? (
              <View
                style={{
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ActivityIndicator
                  animating
                  size="small"
                  color="blue"
                />
              </View>
            ) : (
                // <View style={{ marginBottom: 20, }} />
                <React.Fragment />
              )
          }
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectDataLoading,
  data: selectBankDetails,
  loadmore: selectDataLoadMore,
});
const mapDispatchToProps = {
  bankDetailsData,
  setLoadMore,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankLoan);
