/* jshint node: true */
'use strict';

const assert = require('assert');
const fs = require('fs')

const reports = require('../src/reports')({
  write: console.log
});
const parsers = require('../src/parsers')();

describe('Parser: basic list', function() {
  const year = '2001';
  const fileData = fs.readFileSync(`data/${year}`).toString();
  const data = parsers.processData(year, fileData);

  it('should return 31 talks for the first year', function(done) {

    assert.equal(data.talks.length, 31);
    done();
  });

  it('should merge first year into itself', function(done) {
    const processors = require('../src/processors')();
    let totals = processors.createResultsSet();

    totals = processors.mergeResultsSet(totals, data);

    assert.equal(totals.talks.length, 31);
    done();
  });

});