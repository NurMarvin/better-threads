/*
 * Copyright (c) 2021 NurMarvin (Marvin Witt)
 * Licensed under the Open Software License version 3.0
 */

const {
  React,
  i18n: { Messages },
} = require('powercord/webpack');
const { RadioGroup } = require('powercord/components/settings');

function Settings({ getSetting, updateSetting, toggleSetting }) {
  return (
    <>
      <RadioGroup
        onChange={(e) => updateSetting('defaultNotificationSetting', e.value)}
        value={getSetting('defaultNotificationSetting', 1 << 1)}
        options={[
          {
            name: Messages.FORM_LABEL_ALL_MESSAGES,
            value: 1 << 1,
          },
          {
            name: Messages.FORM_LABEL_ONLY_MENTIONS.format(),
            value: 1 << 2,
          },
          {
            name: Messages.FORM_LABEL_NOTHING,
            value: 1 << 3,
          },
        ]}
      >
        {Messages.BETTER_THREADS_DEFAULT_NOTIFICATION_SETTINGS}
      </RadioGroup>
    </>
  );
}

module.exports = React.memo(Settings);
