'use strict';
const generateMarkHTML = function (mark) {

  return `
    <li><em>"$(mark.name)"</em> | "$(mark.rating)"
    <div class="hidden">
    <p> "$(mark.desc)"
    </p>
    <button><a href="$(mark.url)">Visit Site</a></button>
    <button>Delete</button>
    </div>
    </li>
  `


}