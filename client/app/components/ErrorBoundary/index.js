/**
 *
 * ErrorBoundry
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: '' };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    const { hasError, error, info } = this.state;
    const { customErrorView } = this.props;
    if (hasError) {
      if (customErrorView) return customErrorView(error, info);
      return (
        <div className="p-1 m-1 text-red-600">
          <h1>Something went wrong!</h1>
          {/* <pre>{JSON.stringify(this.state, 1, 2)}</pre> */}
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  customErrorView: PropTypes.func,
};

export default ErrorBoundary;
