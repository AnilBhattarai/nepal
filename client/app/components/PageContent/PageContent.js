import React, { Component } from 'react';
import PropTypes from 'prop-types';

const PageContent = props => {
  const { loading, children } = props;
  return (
    <div
      className={`bg-white rounded pt-2 pb-5 px-5 pagecontent ${
        loading ? 'opacity-50' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default PageContent;
