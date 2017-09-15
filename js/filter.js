// filter.js
'use strict';

(function () {
  var assignedParams;
  var filterContainer = document.querySelector('.tokyo__filters');

  // Функция получения фильтрующих параметров
  // в формате '[{key1: value1}, {key2: value2},..]'
  var getFilterParams = function (nodeList) {
    var nodesArray = [].slice.call(nodeList);
    var getParams = function (node) {
      return {
        name: node.checked ? node.value : node.parentNode.name,
        value: node.checked || node.value
      };
    };
    return nodesArray.map(getParams);
  };

  // Функция получения фильтруемых параметров
  // в формате '[{key1: value1}, {key2: value2},..]'
  var filterAppartment = function (data) {
    var getFeature = function (features) {
      for (var i = 0; i < data.offer.features.length; i++) {
        features[data.offer.features[i]] = true;
      }
      return features;
    };
    var appartmentFeatures = data.offer.features.reduce(getFeature, {});
    var housingPrice;
    if (data.offer.price < 10000) {
      housingPrice = 'low';
    } else if (data.offer.price > 50000) {
      housingPrice = 'high';
    } else {
      housingPrice = 'middle';
    }
    var appartmentParams = {
      'housing_type': data.offer.type,
      'housing_price': housingPrice,
      'housing_room-number': String(data.offer.rooms),
      'housing_guests-number': String(data.offer.guests)
    };
    assignedParams = Object.assign({}, appartmentParams, appartmentFeatures);
    var nodes = document.querySelectorAll('.tokyo__filters option:checked:not([value="any"]), .tokyo__filters input:checked');
    return getFilterParams(nodes).every(function (param) {
      return assignedParams[param.name] === param.value;
    });
  };

  window.filter = {
    // Функция получает на вход массив, на выходе выдает отфильтрованный массив
    do: function (data) {
      return data.filter(filterAppartment);
    },
    container: filterContainer
  };

})();
