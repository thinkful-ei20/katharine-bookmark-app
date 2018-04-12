'use strict';
/* global store, api, */

console.log('store.js is connected');

const store = {
  filteredBy: 0, 
  allMarks: [
    { id: 1,
      name: 'google',
      url: 'http://wwww.google.com',
      rating: 5,
      desc: 'a place to search for stuff',
      expanded: false,
    },

    { id: 2,
      name: 'WEATHER',
      url: 'http://wwww.WEATHER.com',
      rating: 1,
      desc: 'a place to LEARN ABOUT weather',
      expanded: true,
    }
  ],
  addMark: function (markServerData) {
    const newMark = {
      id: markServerData.id,
      title: markServerData.title,
      url: markServerData.url, 
      rating: markServerData.rating,
      desc: markServerData.desc,
      expanded: false,
    }
    return store.allMarks.push(newMark);
  }
}; 



