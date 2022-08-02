/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { selectPropertyByAgency, selectDataLoading } from '../../redux/property/property.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { propertyByAgencyData } from '../../redux/property/property.actions';
import tempImg3 from '../../../assets/home.png';
import { IMAGE_URL } from '../../api';
import MyLoader from './propertyskeleton';
import Icon from 'react-native-vector-icons/Ionicons';
export class AgencyProperty extends Component {
  componentDidMount() {
    console.log(this.props.id, 'id aayo hyyy')
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
  flatListEnd = () => {
    return (
      <View
        style={{
          padding: 32,
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}
      >
        {Object.keys(this.props.data).length > 0 ? (
          <TouchableOpacity
            style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginHorizontal: 5 }}
            onPress={() => this.props.navigate('AgencyAllProperty', {
              id: this.props.id,
            })}
          >
            <Text style={{ fontWeight: 'bold' }}
            >
              View All
          </Text>
            <View style={{
              marginLeft: 16,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              width: 44, height: 44, borderRadius: 22,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.20,
              shadowRadius: 1.41,
              elevation: 2,
            }}><Icon size={24} name="ios-arrow-forward" /></View>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  renderItem = ({ item }) => {
    const onHandleProject = () => {
      if (item.is_project === true) {
        this.props.navigate('ProjectDetails', {
          slug: item.slug_url,
          id: item._id,
          goback: 'goback',
        });
      } else {
        this.props.navigate('TypeDetails', {
          slug: item.slug_url,
          id: item._id,
          goback: 'goback',
        });
      }
    };
    return (
      <View
        style={{
          flexDirection: 'column',
          marginTop: 12,
          marginRight: 8,
          marginLeft: 8,
          borderRadius: 6,
          position: 'relative',
          marginBottom: 8,
          width: 250,
          backgroundColor: '#fff',
          elevation: 4,
          overflow: 'hidden'
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={onHandleProject}
        >
          <View style={{
            height: 150,
            width: 250,
          }}>
            <Image
              style={{
                height: undefined,
                width: undefined,
                flex: 1,
              }}
              source={
                item && item.media && item.media.images.length > 0
                  ? {
                    uri: `${IMAGE_URL}${item.media.images[0].id.path.replace(
                      'public/',
                      'public/400-300/',
                    )}`,
                  }
                  : tempImg3
              }
            />
          </View>
          <View>
            <View style={{ width: '100%' }}>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 5,
                  marginLeft: 10,
                  fontFamily: 'sfprodisplayRegular'
                }}
              >
                {item && item.basic && item.basic.title
                  ? item.basic.title
                  : null}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 4,
                  marginLeft: 10,
                  fontFamily: 'sfprotextSemibold'
                }}
              >
                {item && item.price && item.price.value
                  ? this.formatAmount(item.price.value)
                  : null}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#999',
                  marginLeft: 10,
                  marginBottom: 8,
                  fontFamily: 'sfprotextRegular'
                }}>
                {item.price.label.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const { data } = this.props;
    // console.log(data, 'hello')
    return (
      <View style={{ flex: 1 }}>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{ justifyContent: 'space-around', flexDirection: 'row' }}
          >
            {loading && <MyLoader />}
            {loading && <MyLoader />}
            {loading && <MyLoader />}
            {loading && <MyLoader />}
            {loading && <MyLoader />}
          </View>
        </ScrollView> */}
        {/* {this.props.projectdata.length &&  */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          ListFooterComponent={this.flatListEnd}
          snapToAlignment={'start'}
          snapToInterval={316} // Adjust to your content width
          decelerationRate={0.5}
        />

      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  data: selectPropertyByAgency,
  //loading: selectDataLoading,
});
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(AgencyProperty);
