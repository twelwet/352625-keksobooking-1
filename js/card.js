// card.js
'use strict';

(function () {
  // Объявляем переменную-контейнер карточки объявления
  var dialogContainer = document.querySelector('.dialog');

  window.card = {
    create: function (element) {
      // Объявляем функцию создания тегов SPAN по количеству особенностей размещения
      var pasteFeatures = function (subElement) {
        // Объявим переменную, внутрь которой будет находится SPAN преимуществ
        var featureSpan;
        // Объявим переменную, внутри которой будет находиться DOM-элемент со спанами преимуществ
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < subElement.length; i++) {
          featureSpan = document.createElement('span');
          featureSpan.className = 'feature__image feature__image--' + subElement[i];
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
      lodgeElement.querySelector('.lodge__title').textContent = element.offer.title;
      // Заполним адрес объявления
      lodgeElement.querySelector('.lodge__address').textContent = element.offer.address;
      // Заполним стоимость объявления
      lodgeElement.querySelector('.lodge__price').textContent = element.offer.price + 'Р/ночь';
      switch (element.offer.type) {
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
      lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + element.offer.guests + ' гостей в ' + element.offer.rooms + ' комнатах';
      // Заполним данные о времени заезда и выезда
      lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
      // Вставим заготовленный DOM-фрагмент со спанами преимуществ
      lodgeElement.querySelector('.lodge__features').appendChild(pasteFeatures(element.offer.features));
      // Заполним данные 'Description' объявления
      lodgeElement.querySelector('.lodge__description').textContent = element.offer.description;
      // Вставим аватар арендодателя
      document.querySelector('.dialog__title img').src = element.author.avatar;
      // Заменим существующую разметку на сформированный шаблон объявления
      document.querySelector('.dialog').replaceChild(lodgeElement, document.querySelector('.dialog__panel'));
    },
    open: function (numeral) {
      window.card.create(window.data[numeral]);
      dialogContainer.style.display = 'block';
    },
    close: function () {
      dialogContainer.style.display = 'none';
    }
  };
})();
