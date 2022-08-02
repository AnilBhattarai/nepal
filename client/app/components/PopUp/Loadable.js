/**
 *
 * Asynchronously loads the component for PopUp
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import Loading from 'components/Loading';

export default loadable(() => import('./index'), { fallback: <Loading /> });
