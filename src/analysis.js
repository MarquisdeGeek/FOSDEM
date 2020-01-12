/* jshint node: true */
'use strict';

module.exports = function() {

  function talkCount(yearly_dataset) {
    return yearly_dataset.talks.length;
  }


  function durationInMinutes(yearly_dataset) {
    return yearly_dataset.duration;
  }


  function speakerCount(yearly_dataset) {
    return Object.keys(yearly_dataset.peopleTalks).length;
  }


  function devroomNameList(yearly_dataset) {
    return `${Object.keys(yearly_dataset.devrooms).map((d)=>`'${d}'`).join(',')}`;
  }

  function devroomNameListDecorated(yearly_dataset) {
    let output = '';
    let concat = '';
    for (let room in yearly_dataset.devrooms) {
      output += `${concat}${room} (${yearly_dataset.devrooms[room]})`;
      concat = ', ';
    }
    return output;
  }

  function devroomCount(yearly_dataset) {
    return Object.keys(yearly_dataset.devrooms).length;
  }

  function devroomTalks(yearly_dataset, room) {
    return yearly_dataset.devrooms[room] || 0;
  }

  function devroomTalksTotal(yearly_dataset) {
    let total = 0;
    for (let room in yearly_dataset.devrooms) {
      total += yearly_dataset.devrooms[room];
    }
    return total;
  }

  function lightningtalkCount(yearly_dataset) {
    return yearly_dataset.talks.filter((t) => t.type === 'lightningtalk').length;
  }

  return {
    talkCount,
    durationInMinutes,
    speakerCount,
    devroomNameList,
    devroomNameListDecorated,
    devroomCount,
    devroomTalks,
    devroomTalksTotal,
    lightningtalkCount
  };
};