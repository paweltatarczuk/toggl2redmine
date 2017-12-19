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
   * @param {Object} options
   *
   * options:
   *   toggl:
   *     apiKey: toggl api key
   *   redmine:
   *     url: url to redmine
   *     apiKey: redmine apk key
   *   date: date
   *   group: group entries flag
   *   wid: filter entries by workspace id
   */
  constructor(options) {
    this.options = options;

    this.toggl = new Toggl(
      this.options.toggl.apiKey
    );
    this.redmine = new Redmine(
      this.options.redmine.url,
      this.options.redmine.apiKey
    );
  }

  /**
   * Run time entries migration from toggl to redmine
   */
  run() {
    let self = this;

    // Prepare start and end date
    let startDate = new Date(Date.parse(this.options.date));
    let endDate = new Date(Date.parse(this.options.date));
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    // Fetch toggl time entries
    this.toggl.fetchTimeEntries(
      startDate,
      endDate,
      this.options.group,
      this.options.wid,
      function(error, entries) {
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
      }
    );
  };
}

module.exports = App;
