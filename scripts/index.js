'use strict';
/* global store, markapp api, */

console.log('index.js is connected');

$(document).ready(function() {
  api.getBookmarks(retrievedMarks => retrievedMarks.forEach(store.addMark));

  //load all the marks
console.log(store.allMarks.forEach(markapp.generateMarkHTML));
});