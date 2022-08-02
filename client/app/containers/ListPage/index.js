import React from 'react';
import PropTypes from 'prop-types';
import ListProperty from '../ListView/Loadable';
import Search from './../../components/Search/index.js';

const redirectToDetail = () => {
  props.push('/detail');
};

export default class ListPage extends React.Component {
  render() {
    return (
      <div className="container mx-auto mt-10">
        <div className="md:flex">
          <div className="hidden md:block md:w-1/4">
            <Search />
          </div>
          <div className="flex-1 md:pl-10">
            <ListProperty />
          </div>
        </div>
      </div>
    );
  }
}
