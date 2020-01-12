/* jshint node: true */
'use strict';

module.exports = function() {
  const moment = require('moment');
  const devroomnames = require('./devrooms')();

  function createResultsSet() {
    return {
      talks: [], // full talk information
      duration: 0, // in minutes
      people: [], // Simple list of speakers
      devrooms: {}, // count of talks given in that room
      peopleTalks: {} // the speaker, followed by their talks
    };
  }

  function addTalk(results, information) {
    let thistalk = {
      title: information.title || '',
      speaker: information.speaker,
      type: unifyTalkType(information.type) || 'main'
    };

    let speakerList = addSpeakers(results, thistalk);
    let duration = moment(information.duration || '00:00', 'hh:mm');
    thistalk.duration = duration.hours() * 60 + duration.minutes();

    results.talks.push(thistalk);
    results.duration += thistalk.duration;
  }

  function addSpeakers(results, thistalk) {
    let speakerList = processSpeakerList(thistalk.speaker);
    results.people = results.people.concat(speakerList);

    speakerList.forEach((p) => {
      results.peopleTalks[p] = results.peopleTalks[p] || [];
      results.peopleTalks[p].push(thistalk);
    });

    return speakerList;
  }

  function addDevRoomTalk(results, devroom) {
    devroom = devroomnames.unify(devroom);
    results.devrooms[devroom] = (results.devrooms[devroom] || 0) + 1;

    return results.devrooms[devroom];
  }

  function addSpeakerWithoutKnownTalk(results, speaker) {
    let speakerList = addSpeakers(results, {speaker: speaker, title: 'Unrecorded title'});
    return speakerList;
  }


  function processSpeakerList(speaker) { // return array of speaker(s)
    if (!speaker) {
      return [];
    }
    let person = speaker.toString();
    person = person.split(/\s*,\s*/);
    return person;
  }


  function unifyTalkType(type) {
    const mapping = { // in the format 'from': 'to'
      "lightning": "lightningtalk"
    };
    return mapping[type] || type;
  }

  function mergeResultsSet(totals, data) {
    let combined = createResultsSet();

    combined.talks = totals.talks.concat(data.talks);
    combined.duration = totals.duration + data.duration;
    combined.people = totals.people.concat(data.people);

    combined.devrooms = {
      ...totals.devrooms
    };
    for (let d in data.devrooms) {
      combined.devrooms[d] = totals.devrooms[d] || 0;
      combined.devrooms[d] += data.devrooms[d];
    }

    combined.peopleTalks = {
      ...totals.peopleTalks
    };
    for (let p in data.peopleTalks) {
      combined.peopleTalks[p] = totals.peopleTalks[p] || [];
      combined.peopleTalks[p] = combined.peopleTalks[p].concat(data.peopleTalks[p]);
    }
    return combined;
  }


  return {
    createResultsSet,
    addTalk,
    addDevRoomTalk,
    addSpeakerWithoutKnownTalk,
    mergeResultsSet
  }
};
