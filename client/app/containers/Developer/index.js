import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
// import ListView from './components/listview.js';
import DevelopersPage from '../DevelopersPage/Loadable';
import Search from './../../components/Search/index.js';
import free from '../../assets/img/free.png';

const redirectToDetail = () => {
  props.push('/detail');
};

export default class Developer extends React.Component {
  render() {
    return <DevelopersPage />;
  }
}
