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
  description: 'FOSDEM stats'
});

parser.add_argument('-s', '--speaker');
parser.add_argument('-r', '--reports', {help: 't: totals, d: devrooms, y: yearly, s: speakers, i:individual speaker (from -s). Defaults to all' });

const parsedArgs = parser.parse_args();
const reportList = parsedArgs.reports || "tdysi"
const speakerReport = parsedArgs.speaker || 'Steven Goodwin'

let totals = processors.createResultsSet();

let data = [];
for (let year = 2001; year <= 2026; ++year) {
  let filename = `data/${year}`;
  let fileData = fs.readFileSync(filename).toString();
  data[year] = parsers.processData(`${year}`, fileData);

  // Combine with running totals
  totals = processors.mergeResultsSet(totals, data[year]);
}

// Accumulative results
reportList.includes('t') && reports.allTotals(totals);
reportList.includes('d') && reports.devroomsOverTime(totals, data);
reportList.includes('y') && reports.yearlyBreakdown(totals, data);
reportList.includes('s') && reports.speakerTalksInYear(totals, data);

// e.g.
reportList.includes('i') && reports.speakerBio(totals, data, speakerReport);

