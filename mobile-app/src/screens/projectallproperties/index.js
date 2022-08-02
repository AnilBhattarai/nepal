/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { selectProjectDataAll, selectProjectDataLoading } from '../../redux/property/property.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { projectPropertyDataAll } from '../../redux/property/property.actions';
import tempImg3 from '../../../assets/home.png';
import { IMAGE_URL } from '../../api';
import MyLoader from '../component/propertyskeleton';

export class ProjectAllProperty extends Component {
  state = {
    refreshing: false,
  }
  async componentDidMount() {
    await this.props.projectPropertyDataAll();

  }
  onRefresh = async () => {
    await this.props.projectPropertyDataAll();
  };
  formatToNepaliStyle(amt) {
    if (!amt) {
      return '0';
    }
    const amtStr = `${amt}`;
    const indexOfPeriod = amtStr.indexOf('.');
    let sliceIndex = indexOfPeriod - 1;
    if (indexOfPeriod === -1) {
      sliceIndex = amtStr.length - 1;
    }
    const part1 = amtStr.slice(0, sliceIndex);
    const part2 = amtStr.slice(sliceIndex);
    const withCommas = part1.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return `${withCommas}${part2}`;
  }
  formatAmount = value => {
    return `Rs. ${this.formatToNepaliStyle(value)}`;
  };
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          marginHorizontal: 16,
          borderRadius: 5,
          elevation: 4,
          marginVertical: 8,
        }}
        activeOpacity={1}
        onPress={() =>
          this.props.navigation.navigate('ProjectDetails', {
            slug: item.slug_url,
            id: item._id,
          })
        }
      >
        <Image
          style={{
            height: 150,
            width: '100%', borderRadius: 5,
          }}
          source={
            item && item.media.images.length > 0
              ? {
                uri: `${IMAGE_URL}${item.media.images[0].id.path}`,
              }
              : tempImg3
          }
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              color: '#000',
              marginTop: 5,
              marginLeft: 10,
            }}
            numberOfLines={1}
          >
            {item && item.basic.title
              ? item.basic.title
              : null}
          </Text>
          <Text
            style={{
              fontWeight: 'normal',
              fontSize: 12,
              color: '#8A8A8F',
              marginTop: 5,
              marginBottom: 5,
              marginLeft: 10,
            }}
          >
            {item && item.address.area_id.name
              ? item.address.area_id.name
              : null}
            {', '}
            {item && item.address.city_id.name
              ? item.address.city_id.name
              : null}
          </Text>
        </View>

      </TouchableOpacity>
    );
  };
  render() {
    const { projectdata } = this.props;
    return (
      <View>
        <ScrollView
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
            data={projectdata.data}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  projectdata: selectProjectDataAll,
  loading: selectProjectDataLoading,
});
const mapDispatchToProps = {
  projectPropertyDataAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAllProperty);
