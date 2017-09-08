// filter.js
'use strict';

(function () {

  var filterContainer = document.querySelector('.tokyo__filters');
  var filterHousing = filterContainer.querySelector('#housing_type');
  var filterPrice = filterContainer.querySelector('#housing_price');
  var filterRoomNumber = filterContainer.querySelector('#housing_room-number');
  var filterGuestsNumber = filterContainer.querySelector('#housing_guests-number');
  var filterSet = filterContainer.querySelector('.tokyo__filter-set');
  var featuresIn = filterSet.querySelectorAll('.feature input');

  var featuresSets = [];

  // Массив функций-фильтров. Каждая функция-фильтр принимает на вход
  // объект данных, а на выходе отдает значение 'true/false'
  var filterList = [
    // Фильтр типа размещения
    function housingFilter(data) {
      if (filterHousing.value === data.offer.type || filterHousing.value === 'any') {
        return true;
      } else {
        return false;
      }
    },
    // Ценовой фильтр
    function priceFilter(data) {
      switch (filterPrice.value) {
        case 'low':
          return data.offer.price < 10000;
        case 'middle':
          return data.offer.price >= 10000 && data.offer.price <= 50000;
        case 'high':
          return data.offer.price > 50000;
        default:
          return true;
      }
    },
    // Фильтр количества комнат
    function roomNumberFilter(data) {
      if (Number(filterRoomNumber.value) === data.offer.rooms || filterRoomNumber.value === 'any') {
        return true;
      } else {
        return false;
      }
    },
    // Фильтр количества гостей
    function guestsNumberFilter(data) {
      if (Number(filterGuestsNumber.value) === data.offer.guests || filterGuestsNumber.value === 'any') {
        return true;
      } else {
        return false;
      }
    },
    // Фильтр преимуществ размещения
    function filterFeaturesHouse(pin) {
      if (featuresSets.length === 0) {
        return true;
      }
      for (var i = 0; i < featuresSets.length; i++) {
        var featureFound = false;
        for (var j = 0; j < pin.offer.features.length; j++) {
          if (featuresSets[i] === pin.offer.features[j]) {
            featureFound = true;
            break;
          }
        }
        if (!featureFound) {
          return false;
        }
      }
      return true;
    }
  ];

  // Функция бежит в цикле по всем фильтрам, на входе - объект данных, на выходе - булевы значения
  var filterAllFields = function (data) {
    for (var i = 0; i < filterList.length; i++) {
      var filter = filterList[i];
      if (!filter(data)) {
        return false;
      }
    }
    return true;
  };

  window.filter = {
    // Функция получает на вход массив, на выходе выдает отфильтрованный массив
    do: function (offerList) {
      return offerList.filter(filterAllFields);
    },
    // Опубликуем в глобальную область видимости следующие переменные
    container: filterContainer,
    features: featuresIn,
    featuresSets: featuresSets
  };

})();
