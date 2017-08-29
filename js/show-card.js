// show-card.js
'use strict';

(function () {
  window.showCard = function (numeral) {
    window.card.create(window.data[numeral]);
    window.card.dialogContainer.style.display = 'block';
  };
})();
