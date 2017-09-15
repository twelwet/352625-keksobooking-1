// pin.js
'use strict';

(function () {
  window.pin = {
    paste: function (element) {
      // Объявляем переменную, внутри которой будет находится DIV-контейнер будущих меток
      var pinMapElement = document.querySelector('.tokyo__pin-map');

      // Объявляем переменную, внутри которой будет находиться DIV c разметкой метки
      var pin;
      // Объявляем переменную, внутри которой будет находиться DOM-объект с пинами
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < element.length; i++) {
        pin = document.createElement('div');
        pin.className = 'pin';
        // Метка пина 'div.pin' имеет размеры 56px х 75px. Для того, чтобы
        // метка указывала своим острым концом на координаты размещения,
        // необходимо сместиться на 23px вправо и на 75px вниз.
        pin.style.left = (element[i].location.x + 23) + 'px';
        pin.style.top = (element[i].location.y + 75) + 'px';
        pin.innerHTML = '<img src=\'' + element[i].author.avatar + '\' class=\'rounded\' width=\'40\' height=\'40\'>';
        pin.tabIndex = 0;
        pin.dataset.index = i;
        fragment.appendChild(pin);
      }
      pinMapElement.appendChild(fragment);
    },
    deactivate: function () {
      var activePin = document.querySelector('.pin--active');
      if (activePin !== null) {
        activePin.classList.remove('pin--active');
      }
    },
    activate: function (elem) {
      window.pin.deactivate();
      elem.classList.add('pin--active');
    },
    remove: function () {
      var pins = document.querySelectorAll('div.pin:not(.pin__main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    },
    handle: document.querySelector('.pin__main')
  };
})();
