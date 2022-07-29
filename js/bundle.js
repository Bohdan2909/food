/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  //Calculator   

  const result = document.querySelector('.calculating__result span');

  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = 'Введіть дані';
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  calcTotal();

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        e.target.classList.add(activeClass);

        calcTotal();
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = 'none';
      }
      switch (input.getAttribute('id')) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
  //Використовуємо класи для карточок

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 40;
      this.classes = classes;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
              <img src=${this.src} alt=${this.alt}>
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.descr}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
      `;
      this.parent.append(element);
    }
  }


  //1) Варіант через сервер з класами
  // getResource('http://localhost:3000/menu')
  // .then(data => {
  //   data.forEach(({img,altimg,title,descr,price}) => {
  //     new MenuCard (img,altimg,title,descr,price, '.menu .container').render();
  //   });
  // });
  //2) Варіант через бібліотеку axios
  axios.get('http://localhost:3000/menu')
    .then(data => {
      data.data.forEach(({
        img,
        altimg,
        title,
        descr,
        price
      }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });
  //3) Варіант через сервер 2 без класів
  // getResource('http://localhost:3000/menu')
  // .then(data => createCard(data));

  //    function createCard(data) {
  //       data.forEach(({img,altimg,title,descr,price}) => {

  //   const element = document.createElement('div');
  //   const transfer = 40;
  //   const toUah = price * transfer;
  //   element.classList.add('menu__item');
  //   element.innerHTML = `
  //             <img src=${img} alt=${altimg}>
  //               <h3 class="menu__item-subtitle">${title}</h3>
  //               <div class="menu__item-descr">${descr}</div>
  //               <div class="menu__item-divider"></div>
  //               <div class="menu__item-price">
  //                   <div class="menu__item-cost">Цена:</div>
  //                   <div class="menu__item-total"><span>${toUah}</span> грн/день</div>
  //               </div>
  //   `;
  //   document.querySelector('.menu .container').append(element);

  // });
  //    }

  //4) Варіант вручну з класами
  // new MenuCard(
  //   "img/tabs/vegy.jpg",
  //   "vegy",
  //   'Меню "Фитнес"',
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   9,
  //   ".menu .container"
  // ).render();

  // new MenuCard(
  //   "img/tabs/post.jpg",
  //   "post",
  //   'Меню "Постное"',
  //   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  //   14,
  //   ".menu .container",
  //   "menu__item"
  // ).render();

  // new MenuCard(
  //   "img/tabs/elite.jpg",
  //   "elite",
  //   'Меню “Премиум”',
  //   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  //   21,
  //   ".menu .container",
  //   "menu__item"
  // ).render();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  // Forms
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'icons/spinner.svg',
    succes: 'Succes',
    failure: 'Error'
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
      form.insertAdjacentElement('afterend', statusMessage);

      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');

      // request.setRequestHeader('Content-type', 'aplication/json');
      const formData = new FormData(form);
      // const object = {};
      // formData.forEach(function(value,key){
      //   object[key] = value;
      // });
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.succes);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
      // request.send(json); 
      // request.addEventListener('load', () => {
      //   if (request.status === 200){
      //     console.log(request.response);
      //     showThanksModal(message.succes);
      //     statusMessage.remove();
      //     form.reset();


      //   }else {
      //     showThanksModal(message.failure);
      //   }
      // });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal');
    }, 4000);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalClose": () => (/* binding */ modalClose),
/* harmony export */   "modalOpen": () => (/* binding */ modalOpen)
/* harmony export */ });
function modalOpen(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector)
  // modal.style.display = 'block';
  modal.classList.add('show');
  modal.classList.remove('hide');
  // document.body.style.overflow = 'hidden';
  if (modalTimerId) {
   clearInterval(modalTimerId);
  }
}

function modalClose(modalSelector) {
  const modal = document.querySelector(modalSelector)
  // modal.style.display = 'none';
  modal.classList.add('hide');
  modal.classList.remove('show');
  // document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  //Modal
  //First Part
  const modal = document.querySelector(modalSelector),
    modalTrigger = document.querySelectorAll(triggerSelector),
    btnClose = document.querySelector('[data-close]');



  modalTrigger.forEach(btns => btns.addEventListener('click', () => modalOpen(modalSelector, modalTimerId)));


  btnClose.addEventListener('click', () => modalClose(modalSelector));

  modal.addEventListener('click', (event) => {
    // event.preventDefault();
    if (event.target === modal) {
      modalClose(modalSelector);
    }
  });
  document.addEventListener('keydown', (event) => {
    // event.preventDefault();
    if (event.code === 'Escape' && modal.classList.contains('show')) {
      modalClose(modalSelector);
    }
  });
  //Second Part

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      modalOpen(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
    // if(document.documentElement.scrollTop === 150){
    //   modalOpen();
    //    window.removeEventListener('scroll', showModalByScroll);
    // }
  }
  window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  // Slider hard version

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    prev = document.querySelector(prevArrow),
    next = document.querySelector(nextArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => {
    slide.style.width = width;
  })
  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }
  slider.style.position = 'relative';
  const indicators = document.createElement('ol');
  const dots = [];
  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
      `;
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function deleNotDigits(str) {
    return +str.replace(/\D/g, '')
  }
  next.addEventListener('click', () => {
    if (offset == deleNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '.5');

    dots[slideIndex - 1].style.opacity = 1;
  });


  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach(dot => dot.style.opacity = '.5');

    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.replace(/\D/g, '') * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach(dot => dot.style.opacity = '.5');

      dots[slideIndex - 1].style.opacity = 1;

    })
  })
  //Slider easy 1

  //   showSlides(slideIndex);

  //   if (slides.length < 10) {
  //       total.textContent = `0${slides.length}`;
  //   } else {
  //       total.textContent = slides.length;
  //   }

  //   function showSlides(n) {
  //       if (n > slides.length) {
  //           slideIndex = 1;
  //       }
  //       if (n < 1) {
  //           slideIndex = slides.length;
  //       }

  //       slides.forEach((item) => item.style.display = 'none');

  //       slides[slideIndex - 1].style.display = 'block'; // Как ваша самостоятельная работа - переписать на использование классов show/hide

  //       if (slides.length < 10) {
  //           current.textContent =  `0${slideIndex}`;
  //       } else {
  //           current.textContent =  slideIndex;
  //       }
  //   }

  //   function plusSlides (n) {
  //       showSlides(slideIndex += n);
  //   }

  //   prev.addEventListener('click', function(){
  //       plusSlides(-1);
  //   });

  //   next.addEventListener('click', function(){
  //       plusSlides(1);
  //   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabItemSelector, tabContentSelector, parentTabItemSelector, activeClass) {
  // Tabs
  const tabContent = document.querySelectorAll(tabContentSelector);
  const tabItem = document.querySelectorAll(tabItemSelector);
  const parentTabItem = document.querySelector(parentTabItemSelector);

  function hideTab() {
    tabContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabItem.forEach(item => {
      item.classList.remove(activeClass);
    });

  }

  function showTab(i = 0) {
    tabContent[i].classList.remove('hide');
    tabContent[i].classList.add('show', 'fade');
    tabItem[i].classList.add(activeClass);

  }
  parentTabItem.addEventListener('click', (event) => {
    const target = event.target;
    if (target && target.classList.contains(tabItemSelector.slice(1))) {
      tabItem.forEach((item, i) => {
        if (item === target) {
          hideTab();
          showTab(i);
        }

      });
    }
  });

  hideTab();
  showTab();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadLine) {
  // Timer

  // const deadLine = '2022-09-29';

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t <= 0) {
      days = 0;
      minutes = 0;
      hours = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60 * 1) % 24));
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timerInterval = setInterval((updateClock), 1000);
    updateClock();

    function updateClock() {
      const time = getTimeRemaining(endtime);
      days.innerHTML = setZero(time.days);
      hours.innerHTML = setZero(time.hours);
      minutes.innerHTML = setZero(time.minutes);
      seconds.innerHTML = setZero(time.seconds);
      if (time.total <= 0) {
        clearInterval(timerInterval);
      }
    }
  }

  function setZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  setClock(id, deadLine);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
 const postData = async (url, data) => {
   const resul = await fetch(url, {
     method: "POST",
     body: data,
     headers: {
       'Content-type': 'aplication/json'
     }
   });
   return await resul.json();
 };
   const getResource = async (url) => {
     const resul = await fetch(url);
     if (!resul.ok) {
       throw new Error(`Could not fetch ${url}, status: ${res.status}`)
     }
     return await resul.json();
   };

 
 


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");











window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', modalTimerId), 500000);

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-09-29');
});





// RegExp


// const ans = 'Annn34';
// const pas = 'dfdfddf...'
// const reg = /\d/ig;
// const str = '23-34-56-78'
// const str1 = 'My name is R2D2'
// // Flags
// // i - якщо хочемо шось знайти не залежно від регистру
// // g - коли хочемо знайти відразу декілька входжень
// // m - коли є багато строк
// // \d - шукаємо числа
// // \w - шукаємо букви
// // \s - шукаємо пробіли
// // \D - шукаємо нечисла
// // \W - шукаємо небукви
// // \S - шукаємо непробіли
// // console.log(ans.search(reg));
// // console.log(ans.match(reg));// ['n', 'n' , 'n']
// // console.log(pas.replace(/./g, '#'))//#######
// // console.log(pas.replace(/\./g, '#'))//dfdfdf###
// // console.log(str.replace(/-/g, ':'))//23:34:56:78

// // console.log(reg.test(ans))//true
// // console.log(reg.test(ans))//true
// // console.log(ans.match(reg)) ['3','4']
// console.log(str1.match(/\w\d\w\d/i))//[ 'R2D2', index: 11, input: 'My name is R2D2', groups: undefined ]

// const persone = {
//   name: 'bohdan',
//   age: 32,

//   get userAge () {
//     return  this.age;

//   },
//   set userAge (num){
//     this.age = num;
//   }
// }
// console.log(persone.userAge = 45);

// function User (name, age) {
//   this.name = name;
//   this.age = age;
//   this.say = function() {
//     console.log(`Name of user: ${this.name} and old is ${userAge}`);
//   };
//   let userAge = age;
//   this.getAge = function (){
//     return userAge;
//   };
//   this.setAge = function (age) {
//     if(typeof age === 'number' && age > 0 && age < 110){
//       userAge = age;
//     }else {
//       console.log('Error')
//     }
//   }
// }


// const ivan = new User('ivan', 54);
// console.log(ivan.name);
// console.log(ivan.getAge());

// ivan.setAge(30);
// ivan.setAge(60);
// console.log(ivan.getAge());
// ivan.setAge(300);
// ivan.say();

// class User {
//   constructor (name,age) {
//   this.name = name;
//   this._age = age;
// }
// say() {
//   console.log(`Name of user: ${this.name} and old is ${this._age}`);
// }
// get age() {
//   return this._age;
// }
// set age(age) {
//   if(typeof age === 'number' && age > 0 && age < 110){
//     this._age = age;
//   }else {
//     console.log('Error')
//   }
// }
// }
// const petro = new User('petro', 54);
// console.log(petro.age);
// petro.age = 99;
// console.log(petro.age);
// petro.say()
// let y = 1;
// let x = y = 2;
// console.log(x);

// let c = 4;

// function addX(x) {
//   return function (n) {
//     return n + x
//   }
// }

// const addThree = addX(3);

// let d = addThree(c);
// let res = addThree(c);

// console.log(res)
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('foo');
//   }, 1000);
//   setTimeout(() => {
//     reject('bar');
//   }, 900);
// });

// promise.then((value) => {
//   console.log(value);
// }).catch((e) => console.log(e))


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map