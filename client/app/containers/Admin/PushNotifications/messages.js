/*
 * PushNotifications Messages
 *
 * This contains all the text for the PushNotifications container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.PushNotifications';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the PushNotifications container!',
  },
});
