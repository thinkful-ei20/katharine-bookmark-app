'use strict';

const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/katharine';

  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/items`, callback);
  };

  const deleteBookmark = function (id, callback) {
    $.ajax ( {
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
    });
  };

  const updateBookmark = function (id, updateData, callback) {
    $.ajax ( {
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updateData),
      success: callback,
    });

  };

  const createBookmark = function(name, callback) {
    let newItem = {
      name,
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

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
  };

}());