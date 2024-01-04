/* jshint node: true */
'use strict';

module.exports = function(log) {
  const moment = require('moment');
  const analysis = require('./analysis')();

  function all(title, results) {
    log.write(title);
    log.write(''.padEnd(title.length, '='));

    talks(results);
    people(results);
    devrooms(results);
    multipleSpeakers(results);

    log.write('');
  }

  function csv(results, yearly) {
    log.write(``);
    const lineYears = 0;
    const lineTalks = 1;
    const lineDuration = 2;
    const lineSpeakers = 3;
    const lineDevRooms = 4;
    const lineDevRoomTalks = 5;
    const lineLightning = 6;
    let lines = [];

    lines[lineYears] = ['Year'];
    lines[lineTalks] = ['Talks'];
    lines[lineDuration] = ['Duration (mins)'];
    lines[lineSpeakers] = ['Speakers'];
    lines[lineDevRooms] = ['DevRooms'];
    lines[lineDevRoomTalks] = ['DevRoom talks'];
    lines[lineLightning] = ['Lightning talks'];

    yearly.forEach((yr) => {
      lines[lineYears].push(yr.year);
      lines[lineTalks].push(analysis.talkCount(yr));
      lines[lineDuration].push(analysis.durationInMinutes(yr));
      lines[lineSpeakers].push(analysis.speakerCount(yr));
      lines[lineDevRooms].push(analysis.devroomCount(yr));
      lines[lineDevRoomTalks].push(analysis.devroomTalksTotal(yr));
      lines[lineLightning].push(analysis.lightningtalkCount(yr));
    });

    lines.forEach((line) => {
      log.write(line.map((t) => `'${t}'`).join(', '));
    })
  }

  function talks(results) {
    const talks = analysis.talkCount(results);
    const minutes = analysis.durationInMinutes(results);
    log.write(`Talks: ${talks}`);

    const duration = moment.duration(minutes, 'minutes');

    log.write(`Of duration: ${minutes} mins  (${duration.months()} months ${duration.weeks()} weeks ${duration.days()} days ${duration.hours()} hours and ${duration.minutes()} minutes)`);
    log.write(`   At 8 hours day, 5 days week = ${minutes/(60*8*5)} weeks`);
    log.write('');
  }


  function people(results) {
    log.write(`People listed: ${analysis.speakerCount(results)}`);
    log.write('');
  }

  function devrooms(results) {
    log.write(`devrooms: ${analysis.devroomCount(results)}  (${analysis.devroomTalksTotal(results)})`);

    // Order from most to least. It doesn't matter in most cases, but for acculumative results
    // it's amusing, so let's use a few CPU cycles to compute it.
    const devroomtalks = Object.keys(results.devrooms).map(r => {
      return {
        room: r,
        count: results.devrooms[r]
      }
    })
    const sorted = devroomtalks.sort((a, b) => b.count - a.count);
    const output = Array.prototype.map.call(sorted, (r) => {
      return `${r.room} (${r.count})`;
    });

    log.write(`   ${output.map((d)=>`'${d}'`).join(', ')}`);
    log.write('');
  }

  function devroomsOverTime(results, yearly) {
    let roomlist = [];
    for (let room in results.devrooms) {
      let line = room.padEnd(64);
      let total = 0;

      yearly.forEach((yr) => {
        if (yr.devrooms && yr.devrooms[room]) {
          line += '*';
          ++total;
        } else {
          line += '.';
        }
      });

      line += `  ${total}`;

      roomlist.push({
        room: room,
        count: total,
        graphic: line
      });
    }

    roomlist.sort((a, b) => (b.count - a.count));

    roomlist.forEach((devroom) => {
      log.write(devroom.graphic);
    });

    log.write('');
  }

  function speakerBio(results, yearly, speaker) {
    log.write(`Bio for ${speaker}`);

    let totalYears = 0;
    let totalTalks = 0;
    let devRoomList = {};
    yearly.forEach((yr) => {
      if (yr.peopleTalks[speaker]) {
        log.write(`${yr.year} : (${yr.peopleTalks[speaker].length}) : ${yr.peopleTalks[speaker].map((t)=>`'${t.title}'`).join(', ')}`);
        // Acculumate different dev rooms
        yr.peopleTalks[speaker].forEach((tlk) => {
          devRoomList[tlk.devroom] = true;
        });
        //
        totalTalks += yr.peopleTalks[speaker].length;
        ++totalYears;
      }
    });

    let totalDevRooms = Object.keys(devRoomList).length;

    log.write(``);
    log.write(`FOSDEM Scorecard:`);
    log.write(`  Spoken at: ${totalYears}`);
    log.write(`  Talks given: ${totalTalks}`);
    log.write(`  Devrooms: ${totalDevRooms}`);

  }

  function speakerTalksInYear(results, yearly) {
    log.write(``);
    log.write(`Prolific speakers in a given year:`);

    let total = 0;
    let yearlyMax = {};
    yearly.forEach((yr) => {
      let speakers = analysis.speakerList(yr);
      speakers.forEach((speaker) => {
         let presentationsThisYear = analysis.speakerTalksInYear(yr, speaker);
         if (presentationsThisYear.total > 2) {
           yearlyMax[presentationsThisYear.total] = yearlyMax[presentationsThisYear.total] || [];
           yearlyMax[presentationsThisYear.total].push({ who: speaker, when: yr.year });
         }
      });
    });

    Object.keys(yearlyMax).sort().reverse().forEach((highest) => {
      log.write(`${highest} talks:`);
      yearlyMax[highest].forEach((spkr) => {
        log.write(`  ${spkr.who} (${spkr.when})`);
      });
    });
  }

  function multipleSpeakers(results) {
    let peopleChart = [];
    for (let speaker in results.peopleTalks) {
      let count = results.peopleTalks[speaker].length;

      peopleChart[count] = (peopleChart[count] || {
        count: count,
        people: {}
      });
      peopleChart[count].people[speaker] = {
        name: speaker,
        talks: results.peopleTalks[speaker]
      };
    }

    for (let count in peopleChart) {
      let speakersWithCountTalks = peopleChart[count].people;
      if (count > 1) {
        log.write(`${count} talk(s) : ${Object.keys(speakersWithCountTalks).length} people`);
        log.write(`   ${Object.keys(speakersWithCountTalks).join(', ')} `);
      }
    }

  }

  return {
    all,
    csv,
    devroomsOverTime,
    speakerBio,
    speakerTalksInYear
  }
};
