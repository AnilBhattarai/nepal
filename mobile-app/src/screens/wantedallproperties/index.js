/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView, RefreshControl } from 'react-native';
import {
  selectWantedPropertiesAll,
  selectWantedDataLoading,
} from '../../redux/property/property.selectors';
import { wantedPropertyDataAll } from '../../redux/property/property.actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

export class index extends Component {
  state = {
    refreshing: false,
  };
  onRefresh = async () => {
    await this.props.wantedPropertyDataAll();
  };
  async componentDidMount() {
    try {
      await this.props.wantedPropertyDataAll();
    } catch (error) {
      console.log(error);
    }
  }
  renderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          flexDirection: 'column',
          marginHorizontal: 16,
          borderRadius: 4,
          borderColor: '#fff',
          elevation: 4,
          borderWidth: 1,
          position: 'relative',
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', marginTop: 5 }}>
          <View style={{ width: '100%' }}>
            <Text
              style={{
                fontWeight: 'normal',
                fontSize: 14,
                color: '#000',
                marginLeft: 10,
              }}
            >
              {item && item.message ? item.message : null}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: '#000',
                marginTop: 20,
                marginLeft: 10,
              }}
            >
              {item && item.name ? item.name : null}
            </Text>
            <Text
              style={{
                fontWeight: 'normal',
                fontSize: 11,
                marginLeft: 10,
                marginBottom: 10,
              }}
            >
              {item && item.email ? item.email : null}
            </Text>
          </View>
          {/* <View
              style={{
                width: '20%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 20,
              }}
            >
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: 20,
                  borderRightWidth: 0,
                  borderBottomWidth: 25,
                  borderStyle: 'solid',
                  backgroundColor: 'transparent',
                  borderLeftColor: '#fff',
                  borderRightColor: '#fff',
                  borderBottomColor: '#202B8B',
                  bottom: 0,
                  marginTop: 5,
                }}
              />
              <View
                style={{
                  height: 30,
                  width: 50,
                  borderTopLeftRadius: 8,
                  backgroundColor: '#202B8B',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: 0,
                  borderBottomRightRadius: 5,
                }}
              >
                <Text style={{ color: '#fff' }}>20 Cr</Text>
              </View>
            </View> */}
          {/* </View>
        </TouchableOpacity> */}
        </View>
      </View>
    );
  };
  render() {
    const { wantedData } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#F3FBFF' }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 16, }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={wantedData.data}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  wantedData: selectWantedPropertiesAll,
  loading: selectWantedDataLoading,
});
const mapDispatchToProps = {
  wantedPropertyDataAll,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(index);
