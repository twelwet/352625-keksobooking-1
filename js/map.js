// map.js
'use strict';

(function () {
  // Константы
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var totalData = [];

  // Объявим функцию фильтрации данных и вставки
  // соответствующих пинов на карту
  var filterAndPaste = function () {
    window.data = window.filter.do(totalData);
    window.pin.paste(window.data);
  };

  // Объявим callback-функцию которая отрисует пины
  // при успешной загрузке данных
  var onLoad = function (data) {
    totalData = data;
    filterAndPaste();
  };

  // Объявим callback-функцию, которая сообщит об ошибке
  // при неуспешной попытке загрузить данные с сервера
  var onError = function (message) {
    var node = document.createElement('div');
    node.style.backgroundColor = 'red';
    node.style.margin = 'auto';
    node.style.textAlign = 'center';
    node.style.position = 'relative';
    node.style.fontSize = '18px';
    node.style.color = 'white';
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Вызовем саму функцию загрузки данных
  window.backend.load(onLoad, onError);

  // Скрываем карточку объявления по умолчанию при загрузке страницы
  window.card.close();

  var pinMap = document.querySelector('.tokyo__pin-map');

  // Описываем алгоритм 'click' по пину
  pinMap.onclick = function (evt) {
    var targetElement = evt.target;
    if (!targetElement.classList.contains('pin')) {
      targetElement = targetElement.closest('.pin');
    }
    if (targetElement.classList.contains('pin__main')) {
      return;
    }
    window.pin.activate(targetElement);
    window.showCard(targetElement.dataset.index);
  };

  // Описываем алгоритм 'keydown' ENTER по пину
  pinMap.onkeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var targetElement = evt.target;
      window.pin.activate(targetElement);
      window.showCard(targetElement.dataset.index);
    }
  };

  // Задаем механизм закрытия диалогового окна и деактивации
  // подсвеченного пина при клике на крестик
  var cardCloseButton = document.querySelector('.dialog__close');
  cardCloseButton.addEventListener('click', function () {
    window.card.close();
    window.pin.deactivate();
  });

  // Задаем механизм закрытия диалогового окна и деактивации
  // подсвеченного пина при нажатии на ESC
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.close();
      window.pin.deactivate();
    }
  });

  // Задаем механизм перетаскивания метки объявления
  window.pin.handle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      window.form.fillAddress();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.pin.handle.style.top = (window.pin.handle.offsetTop - shift.y) + 'px';
      window.pin.handle.style.left = (window.pin.handle.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Задаем механизм фильтрации вариантов размещения
  window.filter.container.addEventListener('change', function () {
    window.card.close();
    window.pin.remove();
    filterAndPaste();
  });

})();
