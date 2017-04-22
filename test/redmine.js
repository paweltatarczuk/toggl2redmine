'use strict';

let sinon = require('sinon');

let redmine = new (require('../lib/redmine'))('http://example.com', 'secret');

/**
 * Tests for 'Redmine' class
 */
describe('Redmine', function() {
  /**
   * Test for 'Redmine#createTimeEntry' method
   */
  describe('#createTimeEntry(timeEntry, callback)', function() {
    it('should create new time entry', function() {
      let data = {

      };

      // Create redmine client stub
      let createTimeEntry = sinon.stub(redmine.client, 'create_time_entry');
      createTimeEntry.yields(null, data);

      // Prepare callback
      let callback = sinon.spy();

      // Run method under test
      redmine.createTimeEntry(data, callback);

      createTimeEntry.restore();
      sinon.assert.calledWith(callback, null, data);
    });
  });
});
