'use strict';

let Toggl = require('./toggl');
let Redmine = require('./redmine');

/**
 * App class
 *
 * @class App
 */
class App {
  /**
   * Constructor
   *
   * @param {String} togglApiKey
   * @param {String} redmineUrl
   * @param {String} redmineApiKey
   * @param {String} date
   */
  constructor(togglApiKey, redmineUrl, redmineApiKey, date) {
    this.toggl = new Toggl(togglApiKey);
    this.redmine = new Redmine(redmineUrl, redmineApiKey);
    this.date = date;
  }

  /**
   * Run time entries migration from toggl to redmine
   */
  run() {
    let self = this;

    // Prepare start and end date
    let startDate = new Date(Date.parse(this.date));
    let endDate = new Date(Date.parse(this.date));
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    // Fetch toggl time entries
    this.toggl.fetchTimeEntries(startDate, endDate, function(error, entries) {
      if (error) {
        process.stderr.write(error);
        return;
      }

      // Convert toggl time entries to redmine time spents
      entries.forEach(function(togglTimeEntry) {
        self.redmine.taskEntryFromToggl(togglTimeEntry,
          function(error, redmineTimeEntry) {
          if (error) {
            process.stderr.write(error);
            return;
          }

          // Push time spent to redmine
          self.redmine.createTimeEntry(redmineTimeEntry, function(error) {
            if (error) {
              process.stderr.write(error);
              return;
            }

            // Add 'redmine' tag to toggl time entry
            self.toggl.addRedmineTagToTimeEntry(togglTimeEntry,
              function(error) {
              if (error) {
                process.stderr.write(error);
                return;
              }
            });
          });
        });
      });
    });
  };
}

module.exports = App;
