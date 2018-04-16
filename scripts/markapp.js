'use strict';
/* global store api */

console.log('markapp is connected');

const markApp = (function () {

  const loadPage = function () {
    console.log('loading runs');
    // let marks = store.allMarks;
    let marks = store.allMarks.filter( (marks) => marks.rating >= store.filteredBy);
    
    let rawHTML = generateMarkHTML(marks);
    let htmlToAppend = rawHTML.join('');
    $('.js-bookmark-list').html(htmlToAppend);
 
  };
 
  const generateMarkHTML = function (marks) {
    let HTMLArray = [];
    let falseMarks = marks.map( function (mark) {
      if (mark.expanded === false) {
        HTMLArray.push(
          `
          <li class="js-bookmark" id=${mark.id}>
         <span class="sitename">${mark.title}</span> 
         <span class="rating">${mark.rating}</span> 
         <span role="button" tabindex="0" class="js-expander expander">
           <i class="fas fa-chevron-down fa-2x" title="expand collapsed description"></i>
         </span>
         </li>
          `
        ) ; }});
    let trueMarks = marks.map( function (mark) {
      if (mark.expanded === true) {
        HTMLArray.push(
          ` <li class="js-bookmark" id=${mark.id}>
      <span class="sitename">${mark.title}</span> 
      <span class="rating">${mark.rating}</span> 
      <span role="button" tabindex="0" class="js-expander expander">
        <i class="fas fa-chevron-down fa-2x" title="expand collapsed description"></i>
      </span>
  <div class="js-expanded">
  <p> ${mark.desc}
  </p>
  <button><a href="${mark.url}">Visit Site</a></button>
  <button class="js-deletebutton">Delete</button>
  </div>
  </li>` 
        );}});
    console.log(HTMLArray);
    return HTMLArray;    
  
  };

  const bindEventListeners = function () {
    addBookmark();
    deleteBookmark();
    expandMark();
    filterByMin();
    expandMarka11y();
    deleteMarka11y();
    openAddBookmark();
  };


  const filterByMin = function () {
    $('.filterbox').submit(function (event) {
      event.preventDefault();
      store.filteredBy = $( 'select option:selected' ).val();
      loadPage();
    });

  };
  function expandMark(){
    $('.js-bookmark-list').on('click', '.js-expander', function (event) {
      let id = getID(event);
      let chosenMark = store.allMarks.find((marks) => marks.id === id);

      chosenMark.expanded = !chosenMark.expanded;
      console.log(chosenMark.expanded);
      loadPage();

    });
  }
  function expandMarka11y(){
    $('.js-bookmark-list').on('keydown', '.js-expander', function (event) {
      console.log('I listen!');
      var code = event.which;
      // 13 = Return, 32 = Space
      if ((code === 13) || (code === 32)) {
        let id = getID(event);
        let chosenMark = store.allMarks.find((marks) => marks.id === id);
        chosenMark.expanded = !chosenMark.expanded;
        loadPage();
      }
    });}
 
  function getID(event) {
    return $(event.currentTarget).closest('li').attr('id');
  }

  function openAddBookmark () {
    $('.js-formholder').on('click', '.js-addbutton', function (event) {
      event.preventDefault();
      console.log('pandorica opens');
      $('.js-formholder').html(bookmarkForm);
    });
  }

  const bookmarkForm = `
<form class="js-addbookmark-form css-addbookmark" role="form">
<fieldset>
    <div class="col3">
        <label for="bookmark-entry">Bookmark Name</label><br>
        <input id= "bookmark-entry" type="text" name="bookmark-entry" class="js-bookmark-entry" placeholder="Google.com" ><br>      
    </div>
    <div class="col16">
        <label for="markrating">Bookmark Rating</label><br>
        <input id="markrating" type="number" name="markrating" class="js-markrating" placeholder="1 - 5" required>
    </div>
    <div class="col3">
        <label for="url-entry">Bookmark URL</label><br>
        <input id="url-entry" type="url" name="url-entry" class="js-url-entry" placeholder="http://www.Google.com" required><br>       
    </div>
   
         <label for="markdescription">Bookmark Description</label>
        <textarea id="markdescripton" name="markdescription" class="js-mark-description">a really good place to search</textarea>  
</fieldset>
<div class="center"> <button class="center" type="submit" id="#add">Add item</button><button class='js-cancel'>Cancel</button></div>
</form>
`;

  // function closeAddBookmark () {
  //   $('.js-cancel').on('click', function (event) {
  //     event.preventDefault();
  //     console.log('pandorica closes?');
  //   });
  // }

  function addBookmark () {
    $('.js-formholder').on('submit', '.js-addbookmark-form', function (event) {
      event.preventDefault();
      console.log('add button listens');
      let addedTitle = $('.js-bookmark-entry').val();
      let addedURL = $('.js-url-entry').val();
      let addedRating =  $('.js-markrating').val();
      let addedDesc = $('.js-mark-description').val();

      api.createBookmark(addedTitle, addedURL, addedRating, addedDesc, function (response)
      {
        store.addMark(response);
        loadPage();
      }); 
      $('.js-bookmark-entry').val('');
      $('.js-url-entry').val('');
      $('.js-markrating').val('');
      $('.js-mark-description').val('A place to search');
    }); 
  }

  function deleteMarka11y(){
    $('.js-bookmark-list').on('keydown', '.js-deletebutton', function (event) {
      event.preventDefault();
      var code = event.which;
      let id = getID(event);
      console.log(id);
      // 13 = Return, 32 = Space
      if ((code === 13) || (code === 32)) {
        console.log('event.current');
        api.deleteBookmark(id, function (response) {
          store.deleteMark(id);
          loadPage();
        
        });
      }
    });}

  function deleteBookmark () {
    $('.js-bookmark-list').on('click', '.js-deletebutton', function (event) {
      event.preventDefault();
      let id = getID(event);
      api.deleteBookmark(id, function (response) {
        store.deleteMark(id);
        loadPage();
      });
    });
  }


  return {
    loadPage: loadPage,
    bindEventListeners: bindEventListeners,
  };
}());