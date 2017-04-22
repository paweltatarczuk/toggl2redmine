'use strict';

let RedmineClient = require('node-redmine');

/**
 * Redmine class
 *
 * @class Redmine
 */
class Redmine {
  /**
   * Constructor
   *
   * @param {String} uri
   * @param {String} token
   */
  constructor(uri, token) {
    this.uri = uri;
    this.client = new RedmineClient(uri, {
      apiKey: token,
    });
  }

  /**
   * Create time entry
   *
   * @param {Object} timeEntry
   * @param {Callable} callback
   */
  createTimeEntry(timeEntry, callback) {
    this.client.create_time_entry(timeEntry, callback);
  }
}

module.exports = Redmine;
