/*
 * PopUp Messages
 *
 * This contains all the text for the PopUp container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PopUp';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the PopUp container!',
  },
});
