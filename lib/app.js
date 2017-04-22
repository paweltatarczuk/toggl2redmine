'use strict';

toggl = require('./lib/toggl');
redmine = require('./lib/redmine');

/**
 * App class
 *
 * @class App
 */
class App {
  /**
   * Run time entries migration from toggl to redmine
   */
  run() {
    // Fetch toggl time entries
    toggl.fetchTimeEntries(function(error, entries) {
      if (error) {
        process.stderr.write(error);
        return;
      }

      // Convert toggl time entries to redmine time spents
      togglTimeEntries.forEach(function(togglTimeEntry) {
        let redmineTimeEntry = converter.togglToRedmine(togglTimeEntry);

        // Push time spent to redmine
        redmine.createTimeEntry(redmineTimeEntry, function(error) {
          if (error) {
            process.stderr.write(error);
            return;
          }

          // Add 'redmine' tag to toggl time entry
          toggl.addRedmineTagToTimeEntry(togglTimeEntry, function(error) {
            if (error) {
              process.stderr.write(error);
              return;
            }
          });
        });
      });
    });
  };
}

module.exports = App;
