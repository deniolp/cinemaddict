/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_make_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/make-filter */ "./src/make-filter.js");
/* harmony import */ var _src_make_card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/make-card */ "./src/make-card.js");



const FILTERS = [
  {
    name: `All`,
    hasAmount: false,
    isActive: true
  },
  {
    name: `Watchlist`
  },
  {
    name: `History`
  },
  {
    name: `Favorites`
  },
  {
    name: `Stats`,
    hasAmount: false,
    isAdditional: true
  }
];

const getRandomNumber = (first = 0, second = 15) => {
  const min = Math.floor(first);
  const max = Math.ceil(second);
  return Math.round(Math.random() * (max - min) + min);
};

const filtersContainer = document.querySelector(`.main-navigation`);
const cinemaCardsContainer = document.querySelector(`.films-list__container`);
const topRatedContainer = document.querySelector(`section.films-list--extra .films-list__container`);
const mostCommentedContainer = document.querySelector(`section.films-list--extra:last-of-type .films-list__container`);

FILTERS.forEach((item) => filtersContainer.appendChild(Object(_src_make_filter__WEBPACK_IMPORTED_MODULE_0__["default"])(item.name, item.hasAmount, getRandomNumber(), item.isActive, item.isAdditional)));

for (let i = 0; i < 7; i++) {
  cinemaCardsContainer.appendChild(Object(_src_make_card__WEBPACK_IMPORTED_MODULE_1__["default"])());
}

for (let i = 0; i < 2; i++) {
  topRatedContainer.appendChild(Object(_src_make_card__WEBPACK_IMPORTED_MODULE_1__["default"])(false));
}

for (let i = 0; i < 2; i++) {
  mostCommentedContainer.appendChild(Object(_src_make_card__WEBPACK_IMPORTED_MODULE_1__["default"])(false));
}

const filters = filtersContainer.querySelectorAll(`.main-navigation__item:not(.main-navigation__item--active):not(.main-navigation__item--additional)`);

filters.forEach((item) => item.addEventListener(`click`, () => {
  const tempAmount = item.textContent.match(/\d+/)[0];
  cinemaCardsContainer.innerHTML = ``;

  for (let i = 0; i < tempAmount; i++) {
    cinemaCardsContainer.appendChild(Object(_src_make_card__WEBPACK_IMPORTED_MODULE_1__["default"])());
  }
}));


/***/ }),

/***/ "./src/make-card.js":
/*!**************************!*\
  !*** ./src/make-card.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((isControls = true) => {
  const descriptionElement = `
  <p class="film-card__description">A priests Romania and confront a malevolent force in the form of a demonic nun.</p>
  `;
  const formElement = `
  <form class="film-card__controls">
  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
  <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
</form>
  `;

  const cardMarkdown = `
  <article class="film-card${isControls ? `` : ` film-card--no-controls`}">
    <h3 class="film-card__title">Incredibles 2</h3>
    <p class="film-card__rating">9.8</p>
    <p class="film-card__info">
      <span class="film-card__year">2018</span>
      <span class="film-card__duration">1h&nbsp;13m</span>
      <span class="film-card__genre">Comedy</span>
    </p>
    <img src="./images/posters/moonrise.jpg" alt="" class="film-card__poster">
    ${isControls ? descriptionElement : ``}
    <button class="film-card__comments">13 comments</button>

    ${isControls ? formElement : ``}
  </article>
  `;

  const cardTemplate = document.createElement(`template`);
  cardTemplate.innerHTML = cardMarkdown;
  return cardTemplate.content.cloneNode(true);
});


/***/ }),

/***/ "./src/make-filter.js":
/*!****************************!*\
  !*** ./src/make-filter.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((name, hasAmount = true, amount, isActive = false, isAdditional = false) => {
  const filterMarkdown = `
  <a href="#${name.toLowerCase()}" class="main-navigation__item main-navigation__item--${isActive ? `active` : ``}${isAdditional ? `additional` : ``}">${name} ${hasAmount ? `<span class="main-navigation__item-count">${amount}</span>` : ``}</a>
    </label>
`;
  const filterTemplate = document.createElement(`template`);
  filterTemplate.innerHTML = filterMarkdown;
  return filterTemplate.content.cloneNode(true);
});


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map