/*
 * DeveloperMessages Messages
 *
 * This contains all the text for the DeveloperMessages container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DeveloperMessages';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the DeveloperMessages container!',
  },
});
