/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { selectMyPropertyData, selectDataLoading } from '../../redux/property/property.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { myPropertyData } from '../../redux/property/property.actions';
import tempImg3 from '../../../assets/home.png';
import { IMAGE_URL } from '../../api';
import MyLoader from './propertyskeleton';

export class MYProperty extends Component {
  // state = {
  //   project: [],
  // };
  async componentDidMount() {

    try {
      await this.props.myPropertyData();

    } catch (error) {
      console.log(error);
    }

    // console.log(item.data.data.properties);

    //eslint-disable-next-line react/no-did-mount-set-state
    // this.setState({
    //   project: item.data.data,
    // });
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
    //console.log(item._id)
    return (
      <View
        style={{
          // flex: 1,
          flexDirection: 'column',
          marginTop: 12,
          marginRight: 8,
          marginLeft: 8,
          borderRadius: 2,
          alignItems: 'center',
          position: 'relative',
          marginBottom: 8,
          width: 300,
        }}
      >
        {Object.keys(item).length > 0 ?
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              this.props.navigate('ProjectDetails', {
                slug: item.slug_url,
                id: item._id,
                goback: 'goback',
              })
            }
          >
            <View style={{
              height: 185,
              width: 300,
            }}>
              <Image
                style={{
                  height: undefined,
                  width: undefined,
                  flex: 1,
                  borderRadius: 6
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
                    fontFamily: 'sfprotextSemibold',
                  }}
                >
                  {item && item.price && item.price.value
                    ? this.formatAmount(item.price.value)
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
    // const { loading } = this.props;
    //console.log(this.props.projectdata, 'hajsdajsdgajg')
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.props.projectdata}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          snapToAlignment={'start'}
          snapToInterval={316} // Adjust to your content width
          decelerationRate={0.5}
        />

      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  projectdata: selectMyPropertyData,
  loading: selectDataLoading,
});
const mapDispatchToProps = {
  myPropertyData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MYProperty);
