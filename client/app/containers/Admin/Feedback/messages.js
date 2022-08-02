/*
 * Feedback Messages
 *
 * This contains all the text for the Feedback container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Feedback';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Feedback container!',
  },
});
