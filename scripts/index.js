'use strict';
/* global store, markApp api, */

console.log('index.js is connected');

$(document).ready(function() {
  markApp.addBookmark();
  api.getBookmarks((retrievedMarks) => {
    retrievedMarks.forEach(store.addMark);
    markApp.loadPage();
  });
   
  markApp.loadPage();

});








// I work as expected in the console
// store.allMarks.forEach ( function (element) {
//   console.log(element.title);
// });


// function generateHTML(object) {
//   return object.title;  
// }
// const result = store.allMarks.map ( (mark) => generateHTML(mark));

// console.log(result);