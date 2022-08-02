/**
 *
 * Asynchronously loads the component for StaticMenu
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
