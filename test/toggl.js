'use strict';

let sinon = require('sinon');

let toggl = new (require('../lib/toggl'))('secret');

/**
 * Tests for 'Toggl' class
 */
describe('Toggl', function() {
  /**
   * Test for 'Toggl#fetchTimeEntries' method
   */
  describe('#fetchTimeEntries(callback)', function() {
    it('should return entries without \'redmine\' tag', function() {
      let timeEntries = [
        {id: 1, tags: ['sample-tag']},
        {id: 2, tags: ['redmine']},
        {id: 3, tags: ['sample-tag', 'redmine']},
      ];

      // Create toggl client stub
      let getTimeEntries = sinon.stub(toggl.client, 'getTimeEntries');
      getTimeEntries.yields(null, timeEntries);

      // Prepare callback
      let callback = sinon.spy();

      // Run method under test
      toggl.fetchTimeEntries(callback);

      getTimeEntries.restore();
      sinon.assert.calledWith(callback, null, timeEntries.slice(0, 1));
    });
  });
  /**
   * Test for 'Toggl#addRedmineTagToTimeEntry' method
   */
  describe('#addRedmineTagToTimeEntry(timeEntry, callback)', function() {
    it('should add \'redmine\' tag to given time entry', function() {
      let data = {
        id: 4,
      };

      // Create toggl client stub
      let addTimeEntriesTags = sinon.stub(toggl.client, 'addTimeEntriesTags');
      addTimeEntriesTags.withArgs([4], ['redmine']).yields(null);

      // Prepare callback
      let callback = sinon.spy();

      // Run method under test
      toggl.addRedmineTagToTimeEntry(data, callback);

      addTimeEntriesTags.restore();
      sinon.assert.calledWith(callback, null);
    });
  });
});
