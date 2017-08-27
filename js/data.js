// data.js
'use strict';

(function () {
  // Задаем константы
  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = [
    'flat',
    'house',
    'bungalo'
  ];
  var CHECK_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var MIN_ROOMS_QUANTITY = 1;
  var MAX_ROOMS_QUANTITY = 5;
  var MIN_GUESTS_QUANTITY = 1;
  var MAX_GUESTS_QUANTITY = 10;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 100;
  var MAX_Y = 500;
  var ADS_QUANTITY = 8;

  // Создаем массив объявлений
  var ads = [];

  // Объявляем переменные получения рандомных координат X, Y
  var randomX;
  var randomY;

  // Объявляем функцию получения случайного числа в заданном диапазоне
  var getRandomValue = function (min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
  };

  // Объявляем функцию получения случайного значения из массива
  var getRandomArrayValue = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Объявляем функцию получения пути к аватару автора объявления
  var getAuthorAvatar = function (numeral) {
    if (numeral < 10) {
      return 'img/avatars/user0' + numeral + '.png';
    } else {
      return 'img/avatars/user' + numeral + '.png';
    }
  };

  // Объявляем функцию получения случайной строки заголовка объявления
  var getOfferTitle = function () {
    return getRandomArrayValue(TITLES);
  };

  // Объявляем функцию получения строки адреса объявления
  var getOfferAddress = function () {
    randomX = getRandomValue(MIN_X, MAX_X);
    randomY = getRandomValue(MIN_Y, MAX_Y);
    return (randomX + ', ' + randomY);
  };

  // Объявляем функцию получения случайной цены в заданном диапазоне
  var getOfferPrice = function () {
    return getRandomValue(MIN_PRICE, MAX_PRICE);
  };

  // Объвляем функцию получения случайного значения из константы 'TYPES'
  var getOfferType = function () {
    return getRandomArrayValue(TYPES);
  };

  // Объявляем функцию получения случайного количества комнат в заданном диапазоне
  var getOfferRooms = function () {
    return getRandomValue(MIN_ROOMS_QUANTITY, MAX_ROOMS_QUANTITY);
  };

  // Объявляем функцию получения количества гостей, которое можно разместить
  var getOfferGuests = function () {
    return getRandomValue(MIN_GUESTS_QUANTITY, MAX_GUESTS_QUANTITY);
  };

  // Объявляем функцию получения времени заезда
  var getCheckinTime = function () {
    return getRandomArrayValue(CHECK_TIMES);
  };

  // Объявляем функцию получения времени выезда
  var getCheckoutTime = function () {
    return getRandomArrayValue(CHECK_TIMES);
  };

  // Объявляем функцию формирования массива из константы 'FEATURES'
  // рандомного размера с рандомным наполнением
  var getOfferFeatures = function () {
    // Объявляем временный массив, рандомные элементы которого будут стираться в цикле
    var temporaryArray = FEATURES.slice();
    var randomSize = getRandomValue(0, temporaryArray.length);
    // Объявляем массив, в который будем записывать рандомные элементы из temporaryArray
    var randomFeatures = [];
    for (var i = 0; i < (randomSize); i++) {
      var x = getRandomValue(0, (temporaryArray.length - 1));
      randomFeatures[i] = temporaryArray[x];
      temporaryArray.splice(x, 1);
    }
    return randomFeatures;
  };

  // Заполняем массив в цикле
  for (var i = 0; i < ADS_QUANTITY; i++) {
    ads[i] = {
      author: {
        avatar: getAuthorAvatar(i + 1)
      },
      offer: {
        title: getOfferTitle(),
        address: getOfferAddress(),
        price: getOfferPrice(),
        type: getOfferType(),
        rooms: getOfferRooms(),
        guests: getOfferGuests(),
        checkin: getCheckinTime(),
        checkout: getCheckoutTime(),
        features: getOfferFeatures(),
        description: '',
        photos: []
      },
      location: {
        x: randomX,
        y: randomY
      }
    };
  }
  // Поместим массив с данными в глобальную область видимости
  window.data = ads;
})();
