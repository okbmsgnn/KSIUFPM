import React from 'react';

type SelectOptionProps = JSX.IntrinsicElements['select'];

export const SelectOption = (props: SelectOptionProps) => {
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => setValue(props.value), [props.value]);

  return (
    <select
      {...props}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        props.onChange?.call(null, e);
      }}
    ></select>
  );
};
