// map.js
'use strict';

(function () {
  // Константы
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Вставляем пины на карту
  window.pin.paste(window.data);

  // Скрываем карточку объявления по умолчанию при загрузке страницы
  window.card.close();

  var pinMap = document.querySelector('.tokyo__pin-map');

  // Описываем алгоритм 'click' по пину
  pinMap.onclick = function (evt) {
    var targetElement = evt.target;
    if (targetElement.tagName === 'IMG') {
      targetElement = targetElement.closest('.pin');
    }
    window.pin.activate(targetElement);
    window.card.open(targetElement.dataset.index);
  };

  // Описываем алгоритм 'keydown' ENTER по пину
  pinMap.onkeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var targetElement = evt.target;
      window.pin.activate(targetElement);
      window.card.open(targetElement.dataset.index);
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
})();
