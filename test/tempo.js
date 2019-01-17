'use strict';

let sinon = require('sinon');

let tempo = new (require('../lib/tempo'))('http://example.com', 'test', 'secret');

/**
 * Tests for 'Tempo' class
 */
describe('Tempo', function() {
  /**
   * Test for 'Tempo#createTimeEntry' method
   */
  describe('#createTimeEntry(timeEntry, callback)', function() {
    it('should create new time entry', function() {
      let data = {
        foo: 'bar',
      };

      // Create request stub
      let request = sinon.stub(tempo.request, 'post');

      // Prepare callback
      let callback = sinon.spy();

      // Run method under test
      tempo.createTimeEntry(data, callback);

      request.restore();
      sinon.assert.calledWith(request, {
        url: 'http://example.com/rest/tempo-timesheets/3/worklogs',
        method: 'POST',
        auth: {
          user: 'test',
          pass: 'secret',
        },
        json: data,
      });
    });
  });
  /**
   * Test for 'Toggl#taskEntryFromToggl' method
   */
  describe('#taskEntryFromToggl(data)', function() {
    it(`should convert toggl time entry data into \
        toggl task entry data`, function() {
      let data = {
        'id': 582566690,
        'wid': 1552930,
        'pid': 19463126,
        'billable': false,
        'start': '2017-04-21T12:19:22+00:00',
        'stop': '2017-04-21T13:05:14+00:00',
        'duration': 2752,
        'description': 'ABC-123 Kompletne dane testowe',
        'duronly': false,
        'at': '2017-04-21T13:05:15+00:00',
        'uid': 2344416,
      };

      let expected = {
        'issue': {
          'key': 'ABC-123',
        },
        'author': {
          'name': 'test',
        },
        'dateStarted': '2017-04-21',
        'timeSpentSeconds': 2752,
        'comment': 'Working on ABC-123',
      };

      // Prepare callback
      let callback = sinon.spy();

      // Run method under test
      tempo.taskEntryFromToggl(data, callback);

      sinon.assert.calledWith(callback, null, expected);
    });
    it(`should convert toggl time entry data into \
        toggl task entry data with comments`, function() {
      let data = {
        'id': 582566690,
        'wid': 1552930,
        'pid': 19463126,
        'billable': false,
        'start': '2017-04-21T12:19:22+00:00',
        'stop': '2017-04-21T13:05:14+00:00',
        'duration': 2752,
        'description': 'ABC-123 Kompletne dane testowe : Test',
        'duronly': false,
        'at': '2017-04-21T13:05:15+00:00',
        'uid': 2344416,
      };

      let expected = {
        'issue': {
          'key': 'ABC-123',
        },
        'author': {
          'name': 'test',
        },
        'dateStarted': '2017-04-21',
        'timeSpentSeconds': 2752,
        'comment': 'Test',
      };

      // Prepare callback
      let callback = sinon.spy();

      // Run method under test
      tempo.taskEntryFromToggl(data, callback);

      sinon.assert.calledWith(callback, null, expected);
    });
  });
});
