(function($, doc) {
  'use strict';

  var app = (function appController() {
    var $tableCar = $('[data-js="table-car"]').get();

    return {
      init: function() {
        this.companyInfo();
        this.initEventes();
      },

      initEventes: function initEventes() {
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        $tableCar.appendChild(app.createNewCar());
        app.clearForm();
      },

      clearForm: function clearForm() {
        $('[data-js="image"]').get().value = '';
        $('[data-js="brand"]').get().value = '';
        $('[data-js="model"]').get().value = '';
        $('[data-js="year"]').get().value = '';
        $('[data-js="plate"]').get().value = '';
        $('[data-js="color"]').get().value = '';
        $('[data-js="mileage"]').get().value = '';
      },

      createNewCar: function createNewCar() {
        var $fragment = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $tdImage = doc.createElement('td');
        var $tdBrand = doc.createElement('td');
        var $tdModel = doc.createElement('td');
        var $tdYear = doc.createElement('td');
        var $tdPlate = doc.createElement('td');
        var $tdColor = doc.createElement('td');
        var $tdMileage = doc.createElement('td');
        var $image = doc.createElement('img');
        var $tdIconRemove = doc.createElement('td');
        

        $image.setAttribute('src', $('[data-js="image"]').get().value);
        $tdImage.appendChild($image);

        $tdBrand.textContent = $('[data-js="brand"]').get().value;
        $tdModel.textContent = $('[data-js="model"]').get().value;
        $tdYear.textContent = $('[data-js="year"]').get().value;
        $tdPlate.textContent = $('[data-js="plate"]').get().value;
        $tdColor.textContent = $('[data-js="color"]').get().value;
        $tdMileage.textContent = $('[data-js="mileage"]').get().value;
        $tdIconRemove.appendChild(this.createRemoveCar());

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdModel);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdMileage);
        $tr.appendChild($tdIconRemove);

        return $fragment.appendChild($tr);
      },

      createRemoveCar: function createRemoveCar() {
        var $buttonRemove = doc.createElement('button');
        var $iconRemove = doc.createElement('i');
        $buttonRemove.setAttribute('class', 'removeCar');
        $iconRemove.setAttribute('class', 'fas fa-trash-alt icon-remove');
        $buttonRemove.appendChild($iconRemove);
        $buttonRemove.addEventListener('click', this.handleRemove, false);
        return $buttonRemove;
      },

      handleRemove: function handleRemove(e) {
        var $trRemoveCar = this.parentNode.parentNode;
        $tableCar.removeChild($trRemoveCar);
      },

      companyInfo: function companyInfo() {
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'data/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo() {
        if (!app.isReady.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $companyName = $('[data-js="company-name"]').get();
        var $companySocialReason = $('[data-js="company-social-reason"]').get();
        var $companyPhone = $('[data-js="company-phone"]').get();
        var $companyCell = $('[data-js="company-cell"]').get();
        var $companyEmail = $('[data-js="company-email"]').get();
        var $companyStreet = $('[data-js="company-street"]').get();
        var $companyNeighborhood = $('[data-js="company-neighborhood"]').get();
        var $companyNumber = $('[data-js="company-number"]').get();
        var $companyState = $('[data-js="company-state"]').get();
        var $companyCity = $('[data-js="company-city"]').get();
        var $companyCep = $('[data-js="company-cep"]').get();

        $companyName.textContent = data.name;
        $companySocialReason.textContent = data.socialReason;
        $companyPhone.textContent = data.phone;
        $companyCell.textContent = data.cell;
        $companyEmail.textContent = data.email;
        $companyStreet.textContent = data.street;
        $companyNeighborhood.textContent = data.neighborhood;
        $companyNumber.textContent = data.number;
        $companyState.textContent = data.state;
        $companyCity.textContent = data.city;
        $companyCep.textContent = data.cep;
      },

      isReady: function isReady() {
        return this.readyState === 4 && this.status === 200;
      },
    };
  }) ();

  app.init();

})(window.DOM, document);
