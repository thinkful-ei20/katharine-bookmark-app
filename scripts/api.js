'use strict';
/* global store, api, */
console.log('api.js is connected');

const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/katharine';

  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createBookmark = function(title, url, rating, desc, callback) {
    let newItem = {
      title,
      url,
      rating,
      desc,
    };

    newItem = JSON.stringify(newItem);
  
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'post',
      contentType: 'application/JSON',
      data: newItem,
      success: callback,
    });
  };

  const deleteBookmark = function (id, callback) {

    $.ajax ({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
    });

  };


  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };

}());