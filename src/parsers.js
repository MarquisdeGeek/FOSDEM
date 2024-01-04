/* jshint node: true */
'use strict';

module.exports = function() {
  const processors = require('./processors')();

  function processData(year, rawData) {
    let results = processors.createResultsSet();

    results.year = year;

    if (['2001', '2002', '2003', '2004', '2005', '2006'].indexOf(year) !== -1) {
      basicList(results, rawData);
    } else if (['2007', '2008', '2009', '2010', '2011'].indexOf(year) !== -1) {
      basicJSON(results, rawData);
    } else { // all future versions I expect to use pentabarf
      pentabarf(results, rawData);
    }

    return results;
  }

  function processDevRoomCounts(results, j) {
    // Check for devrooms with a count of the talks, but no mention
    // of the specific title
    if (j.devrooms) {
      for (let room in j.devrooms) {
        let count = j.devrooms[room];
        for (let i = 0; i < count; ++i) {
          let talkname = `${room} talk #${i}`;
          let speaker = '';
          processors.addTalk(results, {
            title: talkname,
            speaker: speaker,
            devroom: room
          });
          processors.addDevRoomTalk(results, room);
        }
      }
    }
  }

  function basicList(results, jsonData) {
    let j = JSON.parse(jsonData);

    j.main.forEach(function(the_talk) {
      processors.addTalk(results, {
        title: the_talk.title,
        speaker: the_talk.speaker,
        devroom: "unknown" // the data doesn't exist, since there were no devrooms at this stage
      });
    })

    processDevRoomCounts(results, j);
  }


  function basicJSON(results, jsonData) {
    let j = JSON.parse(jsonData);

    j.main.forEach(function(event) {
      processors.addTalk(results, {
        title: event.title,
        speaker: event.speaker,
        devroom: event.track
      });
    });
    //
    j.lightning = j.lightning || []; // not all years had lightning talks
    for (let i = 0; i < j.lightning.length; i += 4) {
      // Order is: title, speaker, room, day/time
      processors.addTalk(results, {
        title: j.lightning[i + 0],
        speaker: j.lightning[i + 1],
        type: 'lightningtalk',
        devroom: "Lightning Talks"
      });
    }

    // The problem is this:
    // We know how many people spoke in the devrooms, but not
    // who they are.
    processDevRoomCounts(results, j);

    // Collate any speakers listed from dev rooms
    // However, if they appeared the main or lightning rooms they'd also be in this list.
    // So we don't add anyone in the main list who has already been added for this year.
    if (j.speakersLastFirst) {
      j.speakersLastFirst.forEach(function(speaker) {
        let comma = speaker.match(/^\s*(.*?),\s*(.*)\s*$/);
        let fixed_name = comma[2] + ' ' + comma[1];
        //
        if (results.peopleTalks[fixed_name] === undefined) {
          processors.addSpeakerWithoutKnownTalk(results, fixed_name)
        }
      })
    }

    if (j.speakers) {
      j.speakers.forEach(function(speaker) {
        if (results.peopleTalks[speaker] === undefined) {
          processors.addSpeakerWithoutKnownTalk(results, speaker)
        }
      })
    }
  }


  function pentabarf(results, xmlData) {
    let xmlparser = require('fast-xml-parser');
    let j = xmlparser.parse(xmlData);

    j.schedule.day.forEach((day) => {
      day.room.forEach((room) => {
        if (room && room.event && typeof room.event.forEach === 'function') {
          room.event.forEach((event) => {
            if (event.type === 'devroom' || event.type === '') { // the latter case is for 2012
              processors.addDevRoomTalk(results, event.track);
            }
            processors.addTalk(results, {
              title: `${event.title}${event.subtitle ? ' - ' + event.subtitle : ''}`,
              speaker: event.persons.person,
              type: event.type,
              devroom: event.track,
              duration: event.duration
            });
          });
        }
      })
    });
  }

  return {
    processData,
    //
    basicList,
    basicJSON,
    pentabarf
  }
};