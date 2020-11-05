const classNames = {
  wrapper: 'NativeDatepicker',
  input: 'NativeDatepicker__input',
};

const dateRegex = /\d{4}-\d{2}-\d{2}/;

class NativeDatepicker {
  constructor(options) {
    this.options = Object.assign(
      {
        win: typeof window !== 'undefined' ? window : undefined,
        existingElement: null,
        onChange: () => {},
      },
      options
    );

    this.addStylesheet();
    this.buildDom();
  }

  setValue(fullString) {
    const match = fullString.match(dateRegex);
    if (match) {
      this.fullValue = fullString;
      this.dateValue = match[0];
      this.dateInputElement.value = match[0];
    }
  }

  buildDom() {
    // DOM structure:
    //   <span class="datepicker-toggle">
    //     <!-- optional DOM nodes from user -->
    //     <input type="date" class="datepicker-input">
    //   </span>

    const element =
      this.options.existingElement ||
      this.options.win.document.createElement('span');
    element.classList.add(classNames.wrapper);
    this.element = element;

    if (!this.isSupported()) {
      // Not via CSS class because we don't want to mess with
      // CSS-set display values, to not mess up user styles
      element.style.display = 'none';
    }

    const dateInputElement = this.options.win.document.createElement('input');
    dateInputElement.type = 'date';
    dateInputElement.classList.add(classNames.input);
    element.appendChild(dateInputElement);
    this.dateInputElement = dateInputElement;

    dateInputElement.addEventListener('change', () => {
      let newValue = this.fullValue.replace(dateRegex, dateInputElement.value);
      // Regex didn't match, fallback to setting the entire value
      if (!newValue.includes(dateInputElement.value)) {
        newValue = dateInputElement.value;
      }
      dateInputElement.value = this.dateValue;
      this.options.onChange(newValue);
    });
  }

  addStylesheet() {
    if (!this.options.win.document.querySelector('style#nativeDatepicker')) {
      const style = this.options.win.document.createElement('style');
      style.id = 'nativeDatepicker';
      style.textContent = `
        .${classNames.wrapper} {
          display: inline-block;
          position: relative;
        }
        .${classNames.input} {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          box-sizing: border-box;
        }
        .${classNames.input}::-webkit-calendar-picker-indicator {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          cursor: pointer;
        }
      `;
      this.options.win.document.head.appendChild(style);
    }
  }

  isSupported() {
    const input = this.options.win.document.createElement('input');
    input.type = 'date';
    input.value = 'invalid date value';
    return input.value !== 'invalid date value';
  }
}

module.exports = NativeDatepicker;
