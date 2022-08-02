/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectToken } from '../../redux/app/app.selectors';
import moment from 'moment';
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  selectComment,
  selectCommentData,
  selectGetComment,
  selectLoading,
} from '../../redux/news/news.selectors';
import {
  setCommentValue,
  clearNewsCommentField,
  newsCommentPostData,
  commentGetData,
  deleteCommentData,
  deleteCommentSuccess,
  setEditCommentValue,
  editCommentPostData,
} from '../../redux/news/news.actions';
import Toast from 'react-native-tiny-toast';
class NewsComment extends Component {
  async  componentDidMount() {
    await this.props.commentGetData(this.props.navigation.getParam('id'));
  }
  onCommentValueSelected = (key, value) => {
    this.props.setCommentValue({
      key,
      value,
    });
  };
  onCommentPost = () => {
    if (this.props.token === '') {
      Toast.show('Please Login First!!');
    } else {
      const comment = this.props.comment;
      this.props.newsCommentPostData({
        id: this.props.navigation.getParam('id'),
        comment,
      });
    }
    this.props.commentGetData(this.props.navigation.getParam('id'));
  };
  deleteComment = (id) => {
    this.props.deleteCommentData(id);
    this.props.deleteCommentSuccess(this.props.navigation.getParam('id'));
  };
  onEditCommentValueSelected = (key, value, index) => {
    this.props.setEditCommentValue({
      key,
      value,
      index,
    });
  };

  onEditCommentPost = index => {
    const comment = this.props.selectGetComment.comment[index];
    this.props.editCommentPostData({
      id: this.props.navigation.getParam('id'),
      comment,
    });
    Keyboard.dismiss();
  };
  render() {
    const { comment, selectGetComment, loading } = this.props;
    return (
      <View
        style={{
          backgroundColor: '#F3FBFF',
          height: Dimensions.get('window').height,
        }}
      >
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 20,
          }}
        >
          <View>
            <TextInput
              style={{
                width: '100%',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 10,
                marginTop: 5,
                marginBottom: 5,
                textAlignVertical: 'top',
                height: 120,
                backgroundColor: 'white'
              }}
              value={comment.title}
              placeholder="Type Comment"
              onChangeText={text => this.onCommentValueSelected('title', text)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{
                width: '100%',
                height: 50,
                backgroundColor: '#0291DD',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#0291DD',
                borderWidth: 1,
                borderRadius: 4,
              }}
              onPress={this.onCommentPost}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                Post Comment
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {loading && loading ? (
              <Text style={{ fontSize: 14, color: '#404040' }}>
                fetching comments... Please Wait!
              </Text>
            ) : Object.keys(selectGetComment.comment).length > 0 ? null : (
              <Text> No Comments Found</Text>
            )}
          </View>
          {selectGetComment &&
            selectGetComment.comment &&
            Object.keys(selectGetComment.comment).length > 0
            ? selectGetComment.comment.map((each, index) => (
              <View
                key={each._id}
                style={{ justifyContent: 'flex-start', flexDirection: 'row' }}
              >
                <View style={{ marginTop: 20 }}>
                  <Icon size={80} name="user" color={'#E7E7EC'} />
                </View>
                <View style={{ marginLeft: 16, marginTop: 20 }}>
                  <Text
                    style={{
                      color: '#4A4A4A',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}
                  >
                    {each && each.added_by ? each.added_by.name : null}
                  </Text>
                  <Text style={{ color: '#000', fontSize: 10 }}>
                    {each && each.added_at
                      ? moment(each.added_at).format('ll')
                      : null}
                  </Text>
                  {/* <Text style={{ color: '#000', fontSize: 14, fontStyle: 'italic' }}>{each && each.title ? each.title : null}</Text> */}
                  <TextInput
                    style={{
                      height: 40,
                      width: '100%',
                      borderWidth: 1,
                      borderColor: '#979797',
                      borderRadius: 5,
                      padding: 10,
                      marginTop: 10,
                    }}
                    value={each.title}
                    onChangeText={(text) =>
                      this.onEditCommentValueSelected('title', text, index)
                    }
                  />
                </View>
                <View style={{ marginTop: 40, left: 150 }}>
                  {/* <Text>{each._id}</Text> */}
                  <TouchableOpacity
                    onPress={() => this.deleteComment(each._id)}
                  >
                    <Icon size={30} name="trash" color={'red'} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.onEditCommentPost(index)}>
                    <Icon size={30} name="pencil" color={'#202B8B'} />
                  </TouchableOpacity>
                </View>
              </View>
            ))
            : null}
        </View>
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  token: selectToken,
  comment: selectComment,
  selectCommentData,
  selectGetComment,
  loading: selectLoading,
});
const mapDispatchToProps = {
  setCommentValue,
  clearNewsCommentField,
  newsCommentPostData,
  commentGetData,
  deleteCommentData,
  deleteCommentSuccess,
  setEditCommentValue,
  editCommentPostData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsComment);
