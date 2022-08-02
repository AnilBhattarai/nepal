import React from 'react';
// import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import StaticContentDiv from '../../components/StaticContentDiv';
import CategoryElement from '../../components/CategoryElement';

const EventsPage = () => (
  <>
    <Helmet>
      <title>Events</title>
    </Helmet>
    <StaticContentDiv contentKey="events-top" />
    <div className="bg-white fullbleed">
      <div className="container mx-auto notitle">
        <CategoryElement cat_id="5e5dbcdc1ad4396957755b58" size={24} />
      </div>
    </div>
  </>
);

export default EventsPage;
