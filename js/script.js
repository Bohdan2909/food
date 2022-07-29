import tabs from './modules/tabs';
import modal from './modules/modal';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import cards from './modules/cards';
import timer from './modules/timer';
import modalOpen from './modules/modal';



window.addEventListener('DOMContentLoaded', () => {
  const modalTimerId = setTimeout(() => modalOpen('.modal', modalTimerId), 500000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('[data-modal]', '.modal', modalTimerId);
  calc();
  forms('form', modalTimerId);
  slider({
    container: '.offer__slider',
    slide: '.offer__slide',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
  cards();
  timer('.timer', '2022-09-29');
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

