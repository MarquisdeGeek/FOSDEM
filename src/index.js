/* jshint node: true */
'use strict';

const fs = require('fs')
const { ArgumentParser } = require('argparse');

const reports = require('./reports')({
  write: console.log,
  h1:     (title) => {console.log(`# ${title}`);},
  h2:     (title) => {console.log(`## ${title}`);},
  ul:     (line)  => {console.log(`- ${line}`); },
  monoStart:()    => {console.log('```'); },
  monoEnd:()      => {console.log('```'); },
  mono:   (line)  => {console.log(`\`${line}\``); },
  stats:  (title, value) => {console.log(`**${title}** : ${value}\n`); },
  crlf:   ()      => { console.log(''); }
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
}

// Accumulative results
reports.allTotals(totals);
reports.devroomsOverTime(totals, data);
reports.yearlyBreakdown(totals, data);
reports.speakerTalksInYear(totals, data);

// e.g.
reports.speakerBio(totals, data, parsedArgs.speaker || 'Steven Goodwin');

