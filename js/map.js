// map.js
'use strict';

// Объявим функцию генерации данных
var generateData = function () {
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
  // Возвратим массив с данными
  return ads;
};

// Присвоим в переменную результат выполнения функции
var data = generateData();

// Объявляем функцию, которая в цикле вставляет в DIV-контейнер все метки
var insertAllPins = function (array) {
  // Объявляем переменную, внутри которой будет находится DIV-контейнер будущих меток
  var pinMapElement = document.querySelector('.tokyo__pin-map');

  // Объявляем переменную, внутри которой будет находиться DIV c разметкой метки
  var pin;
  // Объявляем переменную, внутри которой будет находиться DOM-объект с пинами
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    pin = document.createElement('div');
    pin.className = 'pin';
    // Метка пина 'div.pin' имеет размеры 56px х 75px. Для того, чтобы
    // метка указывала своим острым концом на координаты размещения,
    // необходимо сместиться на 23px вправо и на 75px вниз.
    pin.style.left = (array[i].location.x + 23) + 'px';
    pin.style.top = (array[i].location.y + 75) + 'px';
    pin.innerHTML = '<img src=\'' + array[i].author.avatar + '\' class=\'rounded\' width=\'40\' height=\'40\'>';
    pin.tabIndex = 0;
    fragment.appendChild(pin);
  }
  pinMapElement.appendChild(fragment);
};

insertAllPins(data);

// Задаем функцию заполнения шаблона данными из 1-го элемента массива объявлений
var fillDialog = function (array) {
  // Объявляем функцию создания тегов SPAN по количеству особенностей размещения
  var createSpans = function (x) {
    // Объявим переменную, внутрь которой будет находится SPAN преимуществ
    var featureSpan;
    // Объявим переменную, внутри которой будет находиться DOM-элемент со спанами преимуществ
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < x.length; i++) {
      featureSpan = document.createElement('span');
      featureSpan.className = 'feature__image feature__image--' + array[i];
      fragment.appendChild(featureSpan);
    }
    // Возвратим этот DOM-элемент
    return (fragment);
  };
  // Объявляем переменную, внутри которой находится TEMPLATE объявления
  var lodgeTemplate = document.getElementById('lodge-template').content;
  // Объявляем переменную, в которую клонируем шаблон объявления
  var lodgeElement = lodgeTemplate.cloneNode(true);
  // Заполним заголовок объявления
  lodgeElement.querySelector('.lodge__title').textContent = array.offer.title;
  // Заполним адрес объявления
  lodgeElement.querySelector('.lodge__address').textContent = array.offer.address;
  // Заполним стоимость объявления
  lodgeElement.querySelector('.lodge__price').textContent = array.offer.price + 'Р/ночь';
  switch (array.offer.type) {
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
  // Заполним данные о гостях и комнатах
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + array.offer.guests + ' гостей в ' + array.offer.rooms + ' комнатах';
  // Заполним данные о времени заезда и выезда
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + array.offer.checkin + ', выезд до ' + array.offer.checkout;
  // Вставим заготовленный DOM-фрагмент со спанами преимуществ
  lodgeElement.querySelector('.lodge__features').appendChild(createSpans(array.offer.features));
  // Заполним данные 'Description' объявления
  lodgeElement.querySelector('.lodge__description').textContent = array.offer.description;
  // Вставим аватар арендодателя
  document.querySelector('.dialog__title img').src = array.author.avatar;
  // Заменим существующую разметку на сформированный шаблон объявления
  document.querySelector('.dialog').replaceChild(lodgeElement, document.querySelector('.dialog__panel'));
};

// fillDialog(data[0]);

// Записываем в переменную все объекты с классом '.pin'
var pins = document.querySelectorAll('.pin');
// [Вопрос] В массив 'pins' первым элементом сохранился '.pin__main',
// Этот элемент для данной задачи не нужен, как его удалить из массива 'pins'?
// Код 'pins = pins.splice(0, 1);' почему то не работает.
// Поэтому пришлось ниже циклы обхода 'pins' с 'i = 1' начинать.
// Наверное метод 'querySelectorAll' возвращает коллекцию, а не массив,
// поэтому 'splice' и не работает?

// Объявляем переменную-контейнер диалогового окна объявления
var dialogContainer = document.querySelector('.dialog');

// Задаем фнукцию деактивации всех активных пинов
var deactivateAllPins = function () {
  for (var i = 1; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
  }
};

// Задаем функцию, которая по клику подсвечивает пин
var updateActivePin = function (x) {
  deactivateAllPins();
  pins[x].classList.add('pin--active');
};

// Задаем функцию открытия диалогового окна объявления
var openDialogPanel = function (x) {
  fillDialog(data[x - 1]);
  dialogContainer.style.display = 'block';
};

// Описываем алгоритм 'click' по пину
var onPinClick = function (elem, x) {
  elem.addEventListener('click', function () {
    updateActivePin(x);
    openDialogPanel(x);
  });
};

// Описываем алгоритм 'keydown' ENTER по сфокусированному пину
var onPinEnter = function (elem, x) {
  elem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      updateActivePin(x);
      openDialogPanel(x);
    }
  });
};

// Выполняем функции клика и нажатия на ENTER для всех пинов
for (var i = 1; i < pins.length; i++) {
  onPinClick(pins[i], i);
  onPinEnter(pins[i], i);
}

// Задаем механизм закрытия диалогового окна и деактивации
// подсвеченного пина при клике на крестик
var dialogCloseButton = document.querySelector('.dialog__close');
dialogCloseButton.addEventListener('click', function () {
  dialogContainer.style.display = 'none';
  deactivateAllPins();
});

// Задаем механизм закрытия диалогового окна и деактивации
// подсвеченного пина при нажатии на ESC
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    dialogContainer.style.display = 'none';
    deactivateAllPins();
  }
});
