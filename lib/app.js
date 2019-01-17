'use strict';

let Toggl = require('./toggl');
let Tempo = require('./tempo');

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
   *   jira:
   *     url: url to jira
   *     username: jira username
   *     password: jira password
   *   date: date
   *   group: group entries flag
   *   wid: filter entries by workspace id
   */
  constructor(options) {
    this.options = options;

    this.toggl = new Toggl(
      this.options.toggl.apiKey
    );
    this.tempo = new Tempo(
      this.options.jira.url,
      this.options.jira.username,
      this.options.jira.password
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

        // Convert toggl time entries to tempo worklog
        entries.forEach(function(togglTimeEntry) {
          self.tempo.taskEntryFromToggl(togglTimeEntry,
            function(error, tempoTimeEntry) {
            if (error) {
              process.stderr.write(error);
              return;
            }

            // Push time spent to tempo
            self.tempo.createTimeEntry(tempoTimeEntry, function(error) {
              if (error) {
                process.stderr.write(error);
                return;
              }

              // Add 'tempo' tag to toggl time entry
              self.toggl.addTempoTagToTimeEntry(togglTimeEntry,
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
