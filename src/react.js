const { createElement: h, useRef, useEffect, useState } = require('react');
const BoringDatepickerClass = require('./BoringDatepicker');

const BoringDatepicker = ({
  value = '',
  onChange = () => {},
  className = '',
  children,
}) => {
  const spanRef = useRef(null);
  const [datepicker, setDatepicker] = useState();
  useEffect(() => {
    if (spanRef.current) {
      const picker = new BoringDatepickerClass({
        existingElement: spanRef.current,
        onChange,
      });
      picker.setValue(value);
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

module.exports = BoringDatepicker;
