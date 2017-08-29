// synchronize-fields.js
'use strict';

(function () {
  window.synchronizeFields = function (elem1, elem2, array1, array2, func) {
    // Логика синхронизации времени заезда / отъезда
    for (var i = 0; i < elem1.length; i++) {
      elem1.options[i].value = array1[i];
    }
    elem1.addEventListener('change', function () {
      for (i = 0; i < elem1.length; i++) {
        if (elem1.options[i].selected === true) {
          var x = i;
        }
      }
      func(elem2, array2[x]);
    });
  };
})();
