// map.js
'use strict';

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

// Объявляем переменные получения рандомных координат X, Y
var randomX;
var randomY;

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
  var randomSize = getRandomValue(0, FEATURES.length);
  // Объявляем массив, в который будем записывать рандомные элементы из temporaryArray
  var randomFeatures = [];
  for (var i = 0; i < (randomSize); i++) {
    var x = getRandomValue(0, (temporaryArray.length - 1));
    randomFeatures[i] = temporaryArray[x];
    temporaryArray.splice(x, 1);
  }
  return randomFeatures;
};

// Создаем массив объявлений
var ads = [];

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

// Объявляем переменную, внутри которой будет находится DIV-контейнер будущих меток
var pinMapElement = document.querySelector('.tokyo__pin-map');

// Объявляем массив, внутри которого будет находится DIV c разметкой метки
var pin = [];

// Объявляем функцию, которая в цикле вставляет в DIV-контейнер все метки
var insertAllPins = function () {
  // Объявляем переменную, внутри которой будет находится DOM-объект
  var fragment = document.createDocumentFragment();
  for (i = 0; i < ADS_QUANTITY; i++) {
    pin[i] = document.createElement('div');
    pin[i].className = 'pin';
    pin[i].style.left = (ads[i].location.x) + 'px';
    pin[i].style.top = (ads[i].location.y) + 'px';
    pin[i].innerHTML = '<img src=\'' + ads[i].author.avatar + '\' class=\'rounded\' width=\'40\' height=\'40\'>';
    fragment.appendChild(pin[i]);
  }
  pinMapElement.appendChild(fragment);
};

insertAllPins();

// Объявляем переменную, внутри которой находится TEMPLATE объявления
var lodgeTemplate = document.getElementById('lodge-template').content;

// Объявляем переменную, в которую клонируем шаблон объявления
var lodgeElement = lodgeTemplate.cloneNode(true);

// Объявляем функцию создания тегов SPAN по количеству особенностей размещения
var createSpans = function () {
  var featureSpan = [];
  for (i = 0; i < ads[0].offer.features.length; i++) {
    featureSpan[i] = document.createElement('span');
    featureSpan[i].className = 'feature__image feature__image--' + ads[0].offer.features[i];
    lodgeElement.querySelector('.lodge__features').appendChild(featureSpan[i]);
  }
};

// Задаем функцию заполнения шаблона данными из 1-го элемента массива объявлений
var fillLodgeElement = function () {
  lodgeElement.querySelector('.lodge__title').textContent = ads[0].offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = ads[0].offer.address;
  lodgeElement.querySelector('.lodge__price').textContent = ads[0].offer.price + 'Р/ночь';
  switch (ads[0].offer.type) {
    case 'flat':
      lodgeElement.querySelector('.lodge__type').textContent = 'Квартира';
      break;
    case 'bungalo':
      lodgeElement.querySelector('.lodge__type').textContent = 'Бунгало';
      break;
    case 'house':
      lodgeElement.querySelector('.lodge__type').textContent = 'Дом';
      break;
  }
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ads[0].offer.guests + ' гостей в ' + ads[0].offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ads[0].offer.checkin + ', выезд до ' + ads[0].offer.checkout;
  createSpans();
  lodgeElement.querySelector('.lodge__description').textContent = ads[0].offer.description;
};

fillLodgeElement();

// Задаем функцию вставки новых данных на страницу
var pasteNewData = function () {
  document.querySelector('.dialog__title img').src = ads[0].author.avatar;
  document.querySelector('.dialog').replaceChild(lodgeElement, document.querySelector('.dialog__panel'));
};

pasteNewData();
