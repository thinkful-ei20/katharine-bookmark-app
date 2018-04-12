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
    <li><em>"${mark.title}</em> | "${mark.rating}"
    <div class="hidden">
    <p> "${mark.desc}"
    </p>
    <button><a href="${mark.url}">Visit Site</a></button>
    <button>Delete</button>
    </div>
    </li>`
    ;
  };


  function addBookmark () {
    $('.js-addbookmark-form').submit(function (event) {
      event.preventDefault();
      console.log('add button listens');
      let addedTitle = $('.js-bookmark-entry').val();
      let addedURL = $('.js-url-entry').val();
      let addedDesc = $('.js-mark-description').val();



    }); 

    const bindEventListeners = function () {
      addBookmark();
    };
  }

  return {
    loadPage: loadPage,
    addBookmark: addBookmark,
  };
}());