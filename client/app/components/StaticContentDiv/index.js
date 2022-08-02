/**
 *
 * Asynchronously loads the component for Breadcrumb
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import loader from '../../assets/img/loader.gif';


export default loadable(() => import('./StaticContentDiv'), {
  // fallback: <div className="flex-1 flex md:hidden justify-center items-center h-64"><img src={loader} /></div>,
  fallback: <div />,
});
