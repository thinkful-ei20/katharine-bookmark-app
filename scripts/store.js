'use strict';
/* global store, api, */

console.log('store.js is connected');

const store = {
  filteredBy: 0, 
  allMarks: [
    
  ],
  addMark: function (markServerData) {
    const newMark = {
      id: markServerData.id,
      title: markServerData.title,
      url: markServerData.url, 
      rating: markServerData.rating,
      desc: markServerData.desc,
      expanded: false,
    };
    return store.allMarks.push(newMark);
  }
}; 



