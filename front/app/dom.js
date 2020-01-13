(function(doc, win) {
	'use strict';

	function DOM(elements) {
    if (!(this instanceof DOM))
      return new DOM(elements);
    this.element = doc.querySelectorAll(elements);
  }

  DOM.prototype.on = function on(eventType, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.addEventListener(eventType, callback, false); 
    });
  };

  DOM.prototype.off = function off(eventType, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.removeEventListener(eventType, callback, false);
    });
  };

  DOM.prototype.get = function get(index) {
    if (!index)
      return this.element[0];
    return this.element[index];
  };

  DOM.prototype.forEach = function() {
    return Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.map = function() {
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.filter = function() {
    return Array.prototype.filter.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function() {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.every = function() {
    return Array.prototype.every.apply(this.element, arguments);
  };

  DOM.prototype.some = function() {
    return Array.prototype.some.apply(this.element, arguments);
  };

  DOM.isArray = function isArray(param) {
     return Object.prototype.toString.call(param) === '[object Array]';
  }

  DOM.isObject = function isObject(param) {
    return Object.prototype.toString.call(param) === '[object Object]';
  };

  DOM.isFunction = function isFunction(param) {
    return Object.prototype.toString.call(param) === '[object Function]';
  };

  DOM.isNumber = function(param) {
    return Object.prototype.toString.call(param) === '[object NUmber]';
  };

  DOM.isString = function(param) {
    return Object.prototype.toString.call(param) === '[object String]';
  };

  DOM.isBoolean = function(param) {
    return Object.prototype.toString.call(param) === '[object Boolean]';
  };

  DOM.isNull = function(param) {
    return Object.prototype.toString.call(param) === '[object Null]'
    || Object.prototype.toString.call(param) === '[object Undefined]';
  };

  win.DOM = DOM;

}) (document, window);