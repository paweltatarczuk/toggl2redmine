'use strict';

let request = require('request');

/**
 * Tempo class
 *
 * @class Tempo
 */
class Tempo {
  /**
   * Constructor
   *
   * @param {String} uri
   * @param {String} username
   * @param {String} password
   */
  constructor(uri, username, password) {
    this.uri = uri;
    this.username = username;
    this.password = password;
    this.request = request;
  }

  /**
   * Create time entry
   *
   * @param {Object} timeEntry
   * @param {Callable} callback
   */
  createTimeEntry(timeEntry, callback) {
    let options = {
      url: this.uri + '/rest/tempo-timesheets/3/worklogs',
      method: 'POST',
      json: timeEntry,
      auth: {
        user: this.username,
        pass: this.password,
      },
    };

    this.request.post(options, function(error, response, body) {
      if (error) {
        return callback(error);
      }

      if (response.statusCode != 200) {
        console.log(body);
        return callback(JSON.parse(body));
      }

      callback();
    });
  }

  /**
   * Converts toggl time entry to redmine time entry
   *
   * @param {Object} data
   * @param {Callable} callback
   */
  taskEntryFromToggl(data, callback) {
    let description = data.description || '';
    let descriptionMatch = description.match(
      /([A-Z]+-\d+)\s(.*(?=\s:\s)\s:\s)?(.*)/
    );

    if (!descriptionMatch) {
      callback('Time entry description is invalid');
      return;
    }

    let newData = {
      issue: {
        key: descriptionMatch[1],
      },
      author: {
        name: this.username,
      },
      dateStarted: data.start.match(/^[^T]+/)[0],
      timeSpentSeconds: data.duration,
      comment: descriptionMatch[2] ? descriptionMatch[3] : (
        'Working on ' + descriptionMatch[1]
      ),
    };

    callback(null, newData);
  }
}

module.exports = Tempo;
