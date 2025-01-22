/* jshint node: true */
'use strict';

const fs = require('fs')
const { ArgumentParser } = require('argparse');

const reports = require('./reports')({
  write: console.log
});
const parsers = require('./parsers')();
const processors = require('./processors')();


const parser = new ArgumentParser({
  description: 'Argparse example'
});
 
parser.add_argument('-s', '--speaker');
const parsedArgs = parser.parse_args();


let totals = processors.createResultsSet();

let data = [];
for (let year = 2001; year <= 2025; ++year) {
  let filename = `data/${year}`;
  let fileData = fs.readFileSync(filename).toString();
  data[year] = parsers.processData(`${year}`, fileData);

  // Combine with running totals
  totals = processors.mergeResultsSet(totals, data[year]);

  // Print it
  //reports.all(`For ${year}...`, data[year]);
}

// Accumulative results
reports.all("Total", totals);
reports.devroomsOverTime(totals, data);
reports.csv(totals, data);
reports.speakerTalksInYear(totals, data);

// e.g.
reports.speakerBio(totals, data, parsedArgs.speaker || 'Steven Goodwin');

