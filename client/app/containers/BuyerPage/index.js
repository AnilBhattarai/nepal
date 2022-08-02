import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import StaticContentDiv from '../../components/StaticContentDiv';
import CategoryElement from '../../components/CategoryElement';

export default class DetailPage extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <Helmet>
          <title>Buyer Guide</title>
        </Helmet>
        <StaticContentDiv contentKey="buyer-guide-top" />
        <React.Fragment>
          <div className="container mx-auto py-4 overflow-hidden layout-1 notitle mt-4">
            <CategoryElement cat_id="5d0a07f3f305de105c4fc674" size={24} />
          </div>
        </React.Fragment>
      </>
    );
  }
}
