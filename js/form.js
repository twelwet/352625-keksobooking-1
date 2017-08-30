// form.js
'use strict';

(function () {

  // Объявим переменные полей объявления и кнопки
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var address = form.querySelector('#address');

  // Объявим функцию сброса формы в умолчание
  var setDefaultForm = function () {
    form.reset();
    // Параметры заголовка объявления
    title.required = true;
    title.minLength = 30;
    title.maxLength = 100;
    // Параметры цены объявления
    price.required = true;
    price.type = 'number';
    price.min = 0;
    price.max = 1000000;
    price.value = 1000;
    // Параметры адреса объявления
    address.required = true;
    address.disabled = true;
  };

  setDefaultForm();

  var syncValues = function (element, value) {
    element.value = value;
  };

  window.synchronizeFields(timein, timeout, [12, 13, 14], [12, 13, 14], syncValues);
  window.synchronizeFields(timeout, timein, [12, 13, 14], [12, 13, 14], syncValues);
  window.synchronizeFields(type, price, ['flat', 'bungalo', 'house', 'palace'], [1000, 0, 5000, 10000], syncValues);

  // Задаем механизм типа размещения от цены
  price.addEventListener('input', function () {
    if (price.value >= 0 && price.value < 999) {
      type.value = 'bungalo';
    }
    if (price.value >= 1000 && price.value < 4999) {
      type.value = 'flat';
    }
    if (price.value >= 5000 && price.value < 10000) {
      type.value = 'house';
    }
    if (price.value >= 10000) {
      type.value = 'palace';
    }
  });


  // Задаем механизм зависимости кол-ва мест от кол-ва комнат
  roomNumber.addEventListener('change', function () {
    // Если выбрано: '2 комнаты' или '3 комнаты' или '100 комнат', то 'для 3 гостей'
    if (roomNumber.value === '2' || roomNumber.value === '3' || roomNumber.value === '100') {
      capacity.value = '3';
    }
    // Если выбрано: '1 комната', то 'не для гостей'
    if (roomNumber.value === '1') {
      capacity.options[3].selected = true;
    }
  });

  // Задаем механизм зависимости кол-ва комнат от кол-ва мест
  capacity.addEventListener('change', function () {
    // Если выбрано: 'для 1 гостя', то '1 комната';
    // если 'для 2 гостей', то '2 комнаты';
    // если 'для 3 гостей', то '3 комнаты'
    roomNumber.value = capacity.value;
    // Если выбрано: 'не для гостей', то '1 комната'
    if (capacity.options[3].selected === true) {
      roomNumber.value = '1';
    }
  });

  // Объявим функцию валидации текстового поля
  var validateTitle = function (textField, textMin, textMax) {
    if (textField.value.length < textMin || textField.value.length > textMax) {
      textField.style.borderColor = 'red';
      return false;
    }
    textField.style.borderColor = '';
    return true;
  };

  // Объявим функцию валидации числового поля
  var validateNumber = function (numberField, numberMin, numberMax) {
    if (Number(numberField.value) <= Number(numberMin) || Number(numberField.value) > Number(numberMax)) {
      numberField.style.borderColor = 'red';
      return false;
    }
    numberField.style.borderColor = '';
    return true;
  };

  // Объявим функцию валидации поля адреса
  var validateAddress = function (addressField) {
    switch (addressField.value) {
      case '':
        addressField.style.borderColor = 'red';
        return false;
      default:
        addressField.style.borderColor = '';
        return true;
    }
  };

  // Объявим функцию валидации формы
  var validateForm = function () {
    var titleValid = validateTitle(title, title.minLength, title.maxLength);
    var numberValid = validateNumber(price, price.min, price.max);
    var addressValid = validateAddress(address);
    return titleValid && numberValid && addressValid;
  };

  // Проверим правильность заполнения полей формы title.value и price.value
  form.addEventListener('submit', function (evt) {
    // Проводим валидацию
    if (validateForm()) {
      window.backend.save(new FormData(form), function (response) {
        setDefaultForm();
      });
      // Отменяем действие по умолчанию
      evt.preventDefault();
    }
  });

  window.form = {
    address: address
  };
})();
