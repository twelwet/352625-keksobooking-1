// map.js
'use strict';

(function () {
  // Константы
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Объявим callback-функцию которая отрисует пины
  // при успешной загрузке данных
  var onLoad = function (data) {
    window.pin.paste(data);
    window.data = data;
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

  // Найдем перетаскиваемый элемент '.pin__main'
  var pinHandle = document.querySelector('.pin__main');

// Объявим функцию заполнения строки адреса координатами
  var fillAddress = function () {
    var pinHandleCoords = {
      x: (pinHandle.offsetLeft + pinHandle.offsetWidth / 2),
      y: (pinHandle.offsetTop + pinHandle.offsetHeight)
    };
    window.form.address.value = 'x: ' + pinHandleCoords.x + ', y: ' + pinHandleCoords.y;
  };

  fillAddress();

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      fillAddress();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
      pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
