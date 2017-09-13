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

  // Функция возвращает boolean-массив преимуществ для дальнейшего
  // поэлементоного сравнения с boolean-массивом отмеченных инпутов
  var convertFeaturesFormat = function (data) {
    var newFormatOfFeatures = [];
    for (var i = 0; i < featuresIn.length; i++) {
      for (var j = 0; j < data.offer.features.length; j++) {
        if (featuresIn[i].value === data.offer.features[j]) {
          newFormatOfFeatures[i] = true;
          break;
        } else {
          newFormatOfFeatures[i] = false;
        }
      }
    }
    return newFormatOfFeatures;
  };

  var isEveryFalse = function (element) {
    return element === false;
  };

  // Массив функций-фильтров. Каждая функция-фильтр принимает на вход
  // объект данных, а на выходе отдает значение 'true/false'
  var filterList = [
    // Фильтр типа размещения
    function housingFilter(data) {
      return (filterHousing.value === data.offer.type || filterHousing.value === 'any') ? true : false;
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
      return (Number(filterRoomNumber.value) === data.offer.rooms || filterRoomNumber.value === 'any') ? true : false;
    },
    // Фильтр количества гостей
    function guestsNumberFilter(data) {
      return (Number(filterGuestsNumber.value) === data.offer.guests || filterGuestsNumber.value === 'any') ? true : false;
    },
    // Фильтр преимуществ размещения
    function filterFeaturesHouse(data) {
      switch (featuresSets.every(isEveryFalse)) {
        case true:
          return true;
        default:
          var booleanFeatures = convertFeaturesFormat(data);
          var trueFoundCounter = featuresSets.filter(function (element) {
            return element === true;
          }).length;
          var featureFoundCounter = 0;
          for (var i = 0; i < featuresSets.length; i++) {
            if (featuresSets[i] === true && booleanFeatures[i] === true) {
              featureFoundCounter += 1;
            }
          }
          return (trueFoundCounter === featureFoundCounter) ? true : false;
      }
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
    // Функция наполняет массив featuresSets значениями:
    // true - если input.checked
    // false - если !input.checked
    updateFeaturesSets: function () {
      for (var i = 0; i < featuresIn.length; i++) {
        switch (featuresIn[i].checked) {
          case true:
            featuresSets[i] = true;
            break;
          default:
            featuresSets[i] = false;
            break;
        }
      }
    },
    // Опубликуем в глобальную область видимости следующие переменные
    container: filterContainer,
    featuresSets: featuresSets
  };

})();
