const { createElement: h, useRef, useEffect, useState } = require('react');
const NativeDatepickerClass = require('./index');

const NativeDatepicker = ({
  value = '',
  onChange = () => {},
  className = '',
  children,
}) => {
  const spanRef = useRef(null);
  const [datepicker, setDatepicker] = useState();
  useEffect(() => {
    if (spanRef.current) {
      const picker = new NativeDatepickerClass({
        existingElement: spanRef.current,
        initialValue: value,
        onChange,
      });
      setDatepicker(picker);
    }
  }, [spanRef.current]);
  useEffect(() => {
    if (datepicker) {
      datepicker.setValue(value);
    }
  }, [datepicker, value]);
  return h(
    'span',
    {
      ref: spanRef,
      className,
    },
    children
  );
};

module.exports = NativeDatepicker;
