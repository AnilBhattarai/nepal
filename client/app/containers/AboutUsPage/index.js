/*
 * AboutUs
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import StaticContentDiv from '../../components/StaticContentDiv';

export default class AboutUsPage extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>About Us</title>
        </Helmet>

        <StaticContentDiv contentKey="aboutus" />

      </React.Fragment >
    );
  }
}

