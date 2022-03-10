import React from 'react';

type NumericInputProps = JSX.IntrinsicElements['input'];

export const NumericInput = (props: NumericInputProps) => {
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => setValue(props.value), [props.value]);

  return (
    <input
      {...props}
      type="number"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange?.call(null, e);
      }}
    />
  );
};
