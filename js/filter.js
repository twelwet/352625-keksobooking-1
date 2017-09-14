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

  var nodes = document.querySelectorAll('.tokyo__filters option:checked:not([value="any"]), .tokyo__filters input:checked');

  // Функция получения фильтруемых параметров
  // в формате '[{key1: value1}, {key2: value2},..]'
  var filterAppartment = function (data) {
    var getFeature = function (feats, feat) {
      // [ВОПРОС]
      // Здесь ESLint показывает ошибку 'Unexpected token', как ее исправить?
      return Object.assign({}, feats, {[feat]: true});
    };
    var appartmentFeatures = data.offer.features.reduce(getFeature, {});
    var appartmentParams = {
      'housing_type': data.offer.type,
      // [ВОПРОС]
      // Здесь ESLint-ошибка: 'Do not nest ternary expressions', как ее исправить?
      'housing_price': data.offer.price < 10000 ? 'low' : data.offer.price > 50000 ? 'hight' : 'middle',
      'housing_room-number': data.offer.rooms,
      'housing_guests-number': data.offer.guests
    };
    assignedParams = Object.assign({}, appartmentParams, appartmentFeatures);
    return getFilterParams(nodes).every(function (param) {
      // [ВОПРОС]
      // Здесь на выходе всегда выдается 'false', что не так?
      assignedParams[param.name] === param.value;
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
