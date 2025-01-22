/* jshint node: true */
'use strict';

module.exports = function(log) {
  const moment = require('moment');
  const analysis = require('./analysis')();

  function all(title, results) {
    log.h1(title);

    talks(results);
    people(results);
    devrooms(results);
    multipleSpeakers(results);

    log.crlf();
  }

  function csv(results, yearly) {
    const lineTalks = 1;
    const lineDuration = 2;
    const lineSpeakers = 3;
    const lineDevRooms = 4;
    const lineDevRoomTalks = 5;
    const lineLightning = 6;
    let lines = [];

    lines[lineTalks] = ['Talks'];
    lines[lineDuration] = ['Duration (mins)'];
    lines[lineSpeakers] = ['Speakers'];
    lines[lineDevRooms] = ['DevRooms'];
    lines[lineDevRoomTalks] = ['DevRoom talks'];
    lines[lineLightning] = ['Lightning talks'];

    yearly.forEach((yr) => {
      lines[lineTalks].push(analysis.talkCount(yr));
      lines[lineDuration].push(analysis.durationInMinutes(yr));
      lines[lineSpeakers].push(analysis.speakerCount(yr));
      lines[lineDevRooms].push(analysis.devroomCount(yr));
      lines[lineDevRoomTalks].push(analysis.devroomTalksTotal(yr));
      lines[lineLightning].push(analysis.lightningtalkCount(yr));
    });

    // Write header
    log.h1("Yearly breakdown of talks")
    let header = '| Year |';
    let separator = '| ---- |';
    yearly.forEach((yr) => {
      header += ` ${yr.year} |`;
      separator += ` ---- |`;
    });
    log.write(header);
    log.write(separator);

    // Write table
    lines.forEach((line) => {
      log.write(`| ${line.map((t) => `${t}`).join(' | ')} |`);
    })
    log.crlf();
  }

  function talks(results) {
    const talks = analysis.talkCount(results);
    const minutes = analysis.durationInMinutes(results);
    log.stats(`Talks`, talks);

    const duration = moment.duration(minutes, 'minutes');

    log.write(`Of duration: ${minutes} mins  (${duration.months()} months ${duration.weeks()} weeks ${duration.days()} days ${duration.hours()} hours and ${duration.minutes()} minutes)`);
    log.write(`   At 8 hours day, 5 days week = ${minutes/(60*8*5)} weeks`);
    log.crlf();
  }


  function people(results) {
    log.stats(`People listed`, analysis.speakerCount(results));
  }

  function devrooms(results) {
    log.stats(`devrooms`, `${analysis.devroomCount(results)}  (total ${analysis.devroomTalksTotal(results)})`);

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
    log.crlf();
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

    log.monoStart();
    roomlist.forEach((devroom) => {
      log.write(devroom.graphic);
    });
    log.monoEnd();

    log.crlf();
  }

  function speakerBio(results, yearly, speaker) {
    log.h1(`Bio for ${speaker}`);

    let totalYears = 0;
    let totalTalks = 0;
    let devRoomList = {};
    yearly.forEach((yr) => {
      if (yr.peopleTalks[speaker]) {
        log.ul(`${yr.year} : (${yr.peopleTalks[speaker].length}) : ${yr.peopleTalks[speaker].map((t)=>`'${t.title}' (${t.devroom})`).join(', ')}`);
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

    log.crlf();
    log.h2(`FOSDEM Scorecard`);
    log.stats(`Spoken at`, totalYears);
    log.stats(`Talks given`, totalTalks);
    log.stats(`Devroom diversity`, totalDevRooms);

  }

  function speakerTalksInYear(results, yearly) {
    log.h1(`Prolific speakers in a single year`);

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
      log.h2(`${highest} talks`);
      yearlyMax[highest].forEach((spkr) => {
        log.ul(`  ${spkr.who} (${spkr.when})`);
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
        log.stats(`${count} talk(s)`, `${Object.keys(speakersWithCountTalks).length} people`);
        log.write(`   ${Object.keys(speakersWithCountTalks).join(', ')} `);
        log.crlf();
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
