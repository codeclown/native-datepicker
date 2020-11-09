/* global define */
(function nativeDatepickerFactory1(factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    window['NativeDatepicker'] = factory();
  }
})(function nativeDatepickerFactory2() {
  var classNames = {
    wrapper: 'NativeDatepicker',
    input: 'NativeDatepicker__input',
  };

  var dateRegex = /\d{4}-\d{2}-\d{2}/;

  function NativeDatepicker(options) {
    this.options = Object.assign(
      {
        win: typeof window !== 'undefined' ? window : undefined,
        existingElement: null,
        onChange: function defaultOnChange() {},
        initialValue: '',
      },
      options
    );

    this.addStylesheet();
    this.buildDom();
    this.setValue(this.options.initialValue);
  }

  NativeDatepicker.prototype.setValue = function setValue(fullString) {
    var match = fullString.match(dateRegex);
    if (match) {
      this.fullValue = fullString;
      this.dateValue = match[0];
      this.dateInputElement.value = match[0];
    }
  };

  NativeDatepicker.prototype.buildDom = function buildDom() {
    // DOM structure:
    //   <span class="NativeDatepicker">
    //     <input type="date" class="NativeDatepicker__input">
    //   </span>

    var element =
      this.options.existingElement ||
      this.options.win.document.createElement('span');
    element.classList.add(classNames.wrapper);
    this.element = element;

    if (!this.isSupported()) {
      // Not via CSS class because we don't want to mess with
      // CSS-set display values, to not mess up user styles
      element.style.display = 'none';
    }

    var dateInputElement = this.options.win.document.createElement('input');
    dateInputElement.type = 'date';
    dateInputElement.classList.add(classNames.input);
    element.appendChild(dateInputElement);
    this.dateInputElement = dateInputElement;

    var self = this;
    dateInputElement.addEventListener(
      'change',
      function onNativeDatepickerChange() {
        var newValue = self.fullValue.replace(
          dateRegex,
          dateInputElement.value
        );
        // Regex didn't match, fallback to setting the entire value
        if (!newValue.includes(dateInputElement.value)) {
          newValue = dateInputElement.value;
        }
        dateInputElement.value = self.dateValue;
        self.options.onChange(newValue);
      }
    );
  };

  NativeDatepicker.prototype.addStylesheet = function addStylesheet() {
    var styleId = 'NativeDatepickerStyles';
    if (!this.options.win.document.querySelector('style#' + styleId)) {
      var style = this.options.win.document.createElement('style');
      style.id = styleId;
      style.textContent =
        '.' +
        classNames.wrapper +
        ' {' +
        '  display: inline-block;' +
        '  position: relative;' +
        '}' +
        '.' +
        classNames.input +
        ' {' +
        '  position: absolute;' +
        '  left: 0;' +
        '  top: 0;' +
        '  width: 100%;' +
        '  height: 100%;' +
        '  opacity: 0;' +
        '  cursor: pointer;' +
        '  box-sizing: border-box;' +
        '}' +
        '.' +
        classNames.input +
        '::-webkit-calendar-picker-indicator {' +
        '  position: absolute;' +
        '  left: 0;' +
        '  top: 0;' +
        '  width: 100%;' +
        '  height: 100%;' +
        '  margin: 0;' +
        '  padding: 0;' +
        '  cursor: pointer;' +
        '}';
      this.options.win.document.head.appendChild(style);
    }
  };

  NativeDatepicker.prototype.isSupported = function isSupported() {
    var input = this.options.win.document.createElement('input');
    input.type = 'date';
    input.value = 'invalid date value';
    return input.value !== 'invalid date value';
  };

  return NativeDatepicker;
});
