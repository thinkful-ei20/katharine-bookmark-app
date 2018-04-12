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

    function handleError(message) {
      $('.error').toggleClass('hidden').append(message);
    } 

    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'post',
      contentType: 'application/JSON',
      data: newItem,
      success: callback,
      error: function (errorThrown) {
        handleError(errorThrown.responseJSON.message);
      }
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