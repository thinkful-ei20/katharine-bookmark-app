'use strict';
/* global store api */

console.log('markapp is connected');

const markApp = (function () {

  const loadPage = function () {
    let marks = store.allMarks;
    let rawHTML = store.allMarks.map( (marks) => generateMarkHTML(marks));
    let htmlToAppend = rawHTML.join();
    $('.js-bookmark-list').html(htmlToAppend);
 
  };
 
  const generateMarkHTML = function (mark) {

    return `
    <li id=${mark.id}><em>"${mark.title}</em> | "${mark.rating}"
    <div class="hidden">
    <p> "${mark.desc}"
    </p>
    <button><a href="${mark.url}">Visit Site</a></button>
    <button class="js-deletebutton">Delete</button>
    </div>
    </li>`
    ;
  };

  const bindEventListeners = function () {
    addBookmark();
    deleteBookmark();
  };

  function addBookmark () {
    $('.js-addbookmark-form').submit(function (event) {
      event.preventDefault();
      console.log('add button listens');
      let addedTitle = $('.js-bookmark-entry').val();
      let addedURL = $('.js-url-entry').val();
      let addedRating = null;
      let addedDesc = $('.js-mark-description').val();

      api.createBookmark(addedTitle, addedURL, addedRating, addedDesc, function (response)
      
      {
        store.addMark(response);
        loadPage();
      }); 
    }); 
  }

  function deleteBookmark () {
    $('div').on('click', '.js-deletebutton', function (event) {
      event.preventDefault();
      console.log('delete button listens');
      let id = $(event.currentTarget).closest('li').attr('id');
      api.deleteBookmark(id, function (response) {
        store.deleteMark(id);
        loadPage();
      }
      );
    }
   
    );
  }


  return {
    loadPage: loadPage,
    bindEventListeners: bindEventListeners,
  };
}());