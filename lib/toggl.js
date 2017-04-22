'use strict';

let TogglClient = require('toggl-api');

/**
 * Toggl class
 *
 * @class Toggl
 */
class Toggl {
  /**
   * Constructor
   *
   * @param {String} token - API token key to authenticate with
   */
  constructor(token) {
    this.client = new TogglClient({
      apiToken: token,
    });
  }

  /**
   * Fetches time entries without tag 'redmine'
   *
   * @param {Callable} callback
   */
  fetchTimeEntries(callback) {
    this.client.getTimeEntries(null, null, function(error, timeEntries) {
      if (error) {
        return callback(error);
      }

      // Filter out entries with 'redmine' tag
      callback(error, timeEntries.filter(function(timeEntry) {
        return timeEntry['tags'].indexOf('redmine') === -1;
      }));
    });
  };

  /**
   * Adds 'redmine' tag to given time entry
   *
   * @param {Object} timeEntry
   * @param {Callable} callback
   */
  addRedmineTagToTimeEntry(timeEntry, callback) {
    this.client.addTimeEntriesTags([timeEntry.id], ['redmine'], callback);
  };
}

module.exports = Toggl;
