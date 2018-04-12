'use strict';
/* global shoppingList, store, api, Item */

$(document).ready(function() {
  bookmarksList.bindEventListeners();
  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => store.addItem(bookmark));
    bookmarks.render();
  });
  bookmarksList.render();

});


