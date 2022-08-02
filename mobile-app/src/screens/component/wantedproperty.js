/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { selectWantedProperties, selectWantedDataLoading } from '../../redux/property/property.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { wantedPropertyData } from '../../redux/property/property.actions';

export class WantedProperty extends Component {
  async componentDidMount() {
    await this.props.wantedPropertyData();
  }
  renderItem = ({ item }) => {
    //console.log(item, "hello")
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          flexDirection: 'column',
          marginRight: 4,
          marginLeft: 4,
          borderRadius: 2,
          elevation: 4,
          alignItems: 'center',
          position: 'relative',
          marginBottom: 8,
          width: 200,
          height: 150,
          overflow: 'hidden'
        }}
      >

        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>

          <Text numberOfLines={5}
            style={{
              fontWeight: 'normal',
              fontSize: 14,
              color: '#666',
              paddingVertical: 16,
              paddingHorizontal: 10,
            }}
          >
            {item && item.message
              ? item.message
              : null}
          </Text>
          <View style={{ width: '100%' }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 14,
                color: '#000',
                marginTop: 20,
                marginLeft: 10,
              }}
            >
              {item && item.name
                ? item.name
                : null}
            </Text>
            <Text
              style={{
                fontWeight: 'normal',
                fontSize: 11,
                marginLeft: 10,
                marginBottom: 10
              }}
            >
              {item && item.email
                ? item.email
                : null}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    const { wanteddata } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={wanteddata.data}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={{ paddingHorizontal: 12 }}
        />
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  wanteddata: selectWantedProperties,
  loading: selectWantedDataLoading,
});
const mapDispatchToProps = {
  wantedPropertyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(WantedProperty);
