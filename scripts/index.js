'use strict';
/* global store, markApp api, */

console.log('index.js is connected');

$(document).ready(function() {
  markApp.bindEventListeners();
  api.getBookmarks((retrievedMarks) => {
    retrievedMarks.forEach(store.addMark);
    markApp.loadPage();
  });
   
  markApp.loadPage();

});

