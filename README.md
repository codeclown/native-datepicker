# native-datepicker

> Styleable datepicker utilizing the native `<input type="date">`

[![native-datepicker on npm](https://img.shields.io/badge/npm-native--datepicker-blue)](https://www.npmjs.com/package/native-datepicker)
[![codeclown/native-datepicker on GitHub](https://img.shields.io/badge/github-codeclown%2Fnative--datepicker-lightgrey)](https://github.com/codeclown/native-datepicker)

Features:

- Light-weight, no dependencies
- Includes optional React-component
- Supports datetime strings (only replaces date-portion upon change)
- Simple styling, with BEM classes

## Browser support

Supported:

- Chrome
- Firefox
- Edge
- Safari iOS

Not supported (datepicker is hidden):

- Safari MacOS
- IE

## Usage

### Vanilla JS

```js
const NativeDatepicker = require('native-datepicker');
const picker = new NativeDatepicker({
  onChange: (newValue) => {
    console.log(newValue);
  },
});
someElement.appendChild(picker.element);
```

See [API](#api).

### React

```jsx
const NativeDatepicker = require('native-datepicker/src/react');
const SomeComponent = () => {
  const [date, setDate] = useState('2020-11-01');
  return (
    <NativeDatepicker value={date} onChange={(newValue) => setDate(newValue)} />
  );
};
```

See [React API](#react-api).

## API

### `class NativeDatepicker`

#### `constructor(options)`

`options` is an object with the following properties:

##### `options.onChange`

type: `function` default: `(value) => {}`

Callback function which is called when the user selects a new date.

Receives the new value as string (e.g. `"2020-11-01"` or `"2020-11-01 13:15:00"`; just the date-portion of the original value is replaced).

##### `options.existingElement`

type: `DOMElement` default: `null`

If set, existing element will be used instead of creating a new `span` element.

##### `options.win`

type: `Window` default: `window`

For the rare use case (e.g. using inside a child iframe) when setting `window` is necessary.

#### `setValue(dateString)`

Set the value of the datepicker.

`dateString` should be a string containing a date in `YYYY-MM-DD` format. For example, all of these are valid:

- `"2020-11-01"`
- `"2020-11-01 13:15:00"`
- `"2020-11-01T13:15:00"`

Upon changes, NativeDatepicker will replace the date-portion of the string and return the result.

#### `element`

Contains a reference to the datepicker element.

## React API

### `NativeDatepicker` component

Props:

```jsx
<NativeDatepicker
  value={date}
  onChange={(newValue) => {}}
  className="customClassName"
>
  {optionalChildren}
</NativeDatepicker>
```

#### `props.value`

type: `string` default: `""`

Initial value. Examples:

- `value="2020-11-01"`
- `value="2020-11-01 13:15:00"`
- `value="2020-11-01T13:15:00"`

#### `props.onChange`

type: `function` default: `(value) => {}`

Callback function which is called when the user selects a new date.

Receives the new value as string (e.g. `"2020-11-01"` or `"2020-11-01 13:15:00"`; just the date-portion of the original value is replaced).

#### `props.className`

type: `string` default: `""`

Custom className for the created element.

Example with `className="CustomClass"`:

```html
<span class="NativeDatepicker CustomClass">
  <input class="NativeDatepicker__input" type="date" />
</span>
```

#### `optionalChildren`

If `children` are given, they are inserted into the resulting DOM. This can be used for any styling needs.

Example:

```html
<span class="NativeDatepicker">
  <!-- Children will be inserted here -->
  <input class="NativeDatepicker__input" type="date" />
</span>
```

## Styling / DOM structure

The following DOM is created for each datepicker:

```html
<span class="NativeDatepicker">
  <input class="NativeDatepicker__input" type="date" />
</span>
```

The recommended way to style the datepicker is to apply styles (e.g. width/height and a background-image) to the topmost element. Example:

```css
.NativeDatepicker {
  width: 16px;
  height: 16px;
  background: transparent url(...) no-repeat center center;
}
```

Note: under normal circumstances you should not add any styles to `.NativeDatepicker__input`!

## Development

Source files reside in `src/`. They should be remain valid ES5 code (they are not precompiled in any way).

## License

[ISC](./LICENSE)
