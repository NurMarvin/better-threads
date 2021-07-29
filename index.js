/*
 * Copyright (c) 2021 NurMarvin (Marvin Witt)
 * Licensed under the Open Software License version 3.0
 */

const { Plugin } = require('powercord/entities');
const {
  getModule,
  i18n: { Messages },
} = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const i18n = require('./i18n');
const Settings = require('./Settings');

module.exports = class BetterThreads extends Plugin {
  async startPlugin() {
    await powercord.api.i18n.loadAllStrings(i18n);

    powercord.api.settings.registerSettings(this.entityID, {
      category: this.entityID,
      label: 'Better Threads',
      render: Settings,
    });

    const threadMdl = await getModule(['joinThread']);

    inject(
      'bthreads-default-notifications-joinThread',
      threadMdl,
      'joinThread',
      (args, res) => {
        const mode = this.settings.get('defaultNotificationSetting', 1 << 1);
        const channel = args[0];

        res.then((_) => threadMdl.setNotificationSetting(channel, mode));

        return args;
      }
    );

    inject(
      'bthreads-default-notifications-createThread',
      threadMdl,
      'createThread',
      (_, res) => {
        const mode = this.settings.get('defaultNotificationSetting', 1 << 1);

        res.then((channel) => {
          threadMdl.setNotificationSetting(channel, mode);
        });

        return res;
      }
    );
  }

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings(this.entityID);
    uninject('bthreads-default-notifications-joinThread');
    uninject('bthreads-default-notifications-createThread');
  }
};
