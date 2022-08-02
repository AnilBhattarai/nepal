/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { selectProjectData, selectProjectDataLoading } from '../../redux/property/property.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { projectPropertyData } from '../../redux/property/property.actions';
import tempImg3 from '../../../assets/home.png';
import { IMAGE_URL } from '../../api';
import MyLoader from '../component/propertyskeleton';

export class ProjectProperty extends Component {
  async componentDidMount() {
    await this.props.projectPropertyData();
  }
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
          overflow: 'hidden'
        }}
      >
        {Object.keys(item).length > 0 ?
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              this.props.navigate('ProjectDetails', {
                slug: item.slug_url,
                id: item._id,
              })
            }
          >
            <Image
              style={{
                height: 150,
                width: 200,
              }}
              source={
                item && item.media.images.length > 0
                  ? {
                    uri: `${IMAGE_URL}${item.media.images[0].id.path.replace(
                      'public/',
                      'public/400-300/',
                    )}`,
                  }
                  : tempImg3
              }
            />

            <View>
              <View style={{ width: '100%' }}>
                <Text
                  style={{
                    fontSize: 16,
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
                    fontSize: 11,
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
            </View>
          </TouchableOpacity>
          : null}
      </View>
    );
  };
  render() {
    const { loading, projectdata } = this.props;
    // console.log(projectdata)
    return (
      <View>
        {Object.keys(projectdata).length > 0 && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={projectdata.data}
            renderItem={this.renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={{ paddingHorizontal: 12 }}
          />
        )}
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  projectdata: selectProjectData,
  loading: selectProjectDataLoading,
});
const mapDispatchToProps = {
  projectPropertyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectProperty);
