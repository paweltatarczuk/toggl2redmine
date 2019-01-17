'use strict';

let sinon = require('sinon');

let toggl = new (require('../lib/toggl'))('secret');

/**
 * Tests for 'Toggl' class
 */
describe('Toggl', function() {
  /**
   * Test for 'Toggl#fetchTimeEntries' method
   *   - without grouping
   *   - without workspace filtering
   */
  describe('#fetchTimeEntries(false, null, callback)', function() {
    it('should return entries without \'tempo\' tag', function() {
      let timeEntries = [
        {id: 1, tags: ['sample-tag']},
        {id: 2, tags: ['tempo']},
        {id: 3, tags: ['sample-tag', 'tempo']},
      ];

      // Create toggl client stub
      let getTimeEntries = sinon.stub(toggl.client, 'getTimeEntries');
      getTimeEntries.yields(null, timeEntries);

      // Prepare callback
      let callback = sinon.spy();

      // Run method under test
      toggl.fetchTimeEntries(null, null, false, null, callback);

      getTimeEntries.restore();
      sinon.assert.calledWith(callback, null, timeEntries.slice(0, 1));
    });
  });

  /**
   * Test for 'Toggl#fetchTimeEntries' method
   *   - without grouping
   *   - with workspace filtering
   */
  describe('#fetchTimeEntries(false, 1234, callback)', function() {
    it('should return entries without \'tempo\' tag', function() {
      let timeEntries = [
        {id: 1, wid: 1234, tags: ['sample-tag']},
        {id: 2, wid: '1234', tags: ['tempo']},
        {id: 3, wid: 4321, tags: ['sample-tag', 'tempo']},
      ];

      // Create toggl client stub
      let getTimeEntries = sinon.stub(toggl.client, 'getTimeEntries');
      getTimeEntries.yields(null, timeEntries);

      // Prepare callback
      let callback = sinon.spy();

      // Run method under test
      toggl.fetchTimeEntries(null, null, false, 1234, callback);

      getTimeEntries.restore();
      sinon.assert.calledWith(callback, null, timeEntries.slice(0, 1));
    });
  });

  /**
   * Test for 'Toggl#fetchTimeEntries' method
   *   - with grouping
   *   - without workspace filtering
   */
  describe('#fetchTimeEntries(true, null, callback)', function() {
    it('should return entries without \'tempo\' tag', function() {
      let timeEntries = [
        {id: 1, duration: 1000, tags: ['sample-tag']},
        {id: 2, duration: 2000, tags: ['tempo']},
        {id: 3, duration: 500, tags: ['sample-tag', 'tempo']},
        {id: 4, duration: 1200, tags: ['sample-tag']},
        {id: 5, duration: 3600},
        {id: 6, duration: 2500, tags: ['other-tag', 'sample-tag']},
        {id: 7, duration: 200},
        {id: 8, duration: 1900, tags: ['sample-tag', 'other-tag']},
      ];

      // Create toggl client stub
      let getTimeEntries = sinon.stub(toggl.client, 'getTimeEntries');
      getTimeEntries.yields(null, timeEntries);

      // Prepare callback
      let callback = sinon.spy();

      // Run method under test
      toggl.fetchTimeEntries(null, null, true, null, callback);

      // Expected timeEntries
      let expectedTimeEntries = [
        {id: 1, duration: 2200, tags: ['sample-tag'], ids: [1, 4]},
        {id: 5, duration: 3800, ids: [5, 7]},
        {id: 6, duration: 4400, tags: ['other-tag', 'sample-tag'], ids: [6, 8]},
      ];

      getTimeEntries.restore();
      sinon.assert.calledWith(callback, null, expectedTimeEntries);
    });
  });

  /**
   * Test for 'Toggl#addTempoTagToTimeEntry' method
   */
  describe('#addTempoTagToTimeEntry(timeEntry, callback)', function() {
    it('should add \'tempo\' tag to given time entry', function() {
      let data = {
        id: 4,
      };

      // Create toggl client stub
      let addTimeEntriesTags = sinon.stub(toggl.client, 'addTimeEntriesTags');
      addTimeEntriesTags.withArgs([4], ['tempo']).yields(null);

      // Prepare callback
      let callback = sinon.spy();

      // Run method under test
      toggl.addTempoTagToTimeEntry(data, callback);

      addTimeEntriesTags.restore();
      sinon.assert.calledWith(callback, null);
    });
  });
});
