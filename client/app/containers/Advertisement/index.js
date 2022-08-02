import React from 'react';
import { Link } from 'react-router-dom';
import StaticContentDiv from '../../components/StaticContentDiv';
import { Element } from 'react-scroll';
import NavBar from './components/navbar';

export default class DetailPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <StaticContentDiv contentKey="why-advertise" />
        <NavBar />
        <div className="container mx-auto customTable">
          <Element name="agent">
            <StaticContentDiv contentKey="agent-package" />
          </Element>
          <Element name="developer">
            <StaticContentDiv contentKey="developer-package" />
          </Element>
          <Element name="seller">
            <StaticContentDiv contentKey="seller-package" />
          </Element>
          <Element name="banner">
            <StaticContentDiv contentKey="banner-ad" />
          </Element>
        </div>
      </React.Fragment>
    );
  }
}
