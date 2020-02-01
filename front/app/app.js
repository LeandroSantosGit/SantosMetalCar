(function($, doc) {
  'use strict';

  var app = (function appController() {
    var $tableCar = $('[data-js="table-car"]').get();

    return {
      init: function() {
        this.companyInfo();
        this.initEventes();
        this.searchCars();
      },

      initEventes: function initEventes() {
        $('[data-js="form-register"]').on('submit', this.handleSubmit);
      },

      handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'http://localhost:3000/car');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        ajax.send(app.createPost());
        ajax.addEventListener('readystatechange', app.handleCarPost, false);
      },

      handleCarPost: function handleCarPost() {
        if (app.isReady.call(this)) {
          console.log('Status POST:', this.responseText);
          app.searchCars();
        }
      },

      createPost: function createPost() {
        var stringCar = `image=${this.getInputValue('image')}
                &brand=${this.getInputValue('brand')}
                &model=${this.getInputValue('model')}
                &year=${this.getInputValue('year')}
                &plate=${this.getInputValue('plate')}
                &color=${this.getInputValue('color')}
                &mileage=${this.getInputValue('mileage')}`;
            this.clearForm();
            return stringCar;
      },

      searchCars: function searchCars() {
        $tableCar.innerHTML = '';
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'http://localhost:3000/car');
        ajax.send();
        ajax.addEventListener('readystatechange', app.handleCarGet, false);
      },

      handleCarGet: function handleCarGet() {
        if (app.isReady.call(this)) {
          var parseCar = JSON.parse(this.responseText);
          parseCar.forEach(function(car) {
            $tableCar.appendChild(app.createNewCar(car));
          });
        }
      },

      createNewCar: function createNewCar(car) {
        var $fragment = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $tdImage = doc.createElement('td');
        var $tdBrand = doc.createElement('td');
        var $tdModel = doc.createElement('td');
        var $tdYear = doc.createElement('td');
        var $tdPlate = doc.createElement('td');
        var $tdColor = doc.createElement('td');
        var $tdMileage = doc.createElement('td');
        var $tdIconRemove = doc.createElement('td');
        
        $tdImage.appendChild(this.createImage(car.image));
        $tdBrand.textContent = car.brand;
        $tdModel.textContent = car.model;
        $tdYear.textContent = car.year;
        $tdPlate.textContent = car.plate;
        $tdColor.textContent = car.color;
        $tdMileage.textContent = car.mileage;
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

      createImage: function createImage(url) {
        var $image = doc.createElement('img');
        $image.src = url;
        return $image;
      },

      getInputValue: function getInputValue(value) {
        return $(`[data-js="${value}"]`).get().value;
      },

      clearForm: function clearForm() {
        $('input').forEach(function(item) {
          item.value='';
        });
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
