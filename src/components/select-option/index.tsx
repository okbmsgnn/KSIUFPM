import React from 'react';

type SelectOptionProps = JSX.IntrinsicElements['select'];

export const SelectOption = (props: SelectOptionProps) => {
  return <select {...props}></select>;
};
