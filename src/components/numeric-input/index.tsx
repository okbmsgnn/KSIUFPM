import React from 'react';

type NumericInputProps = JSX.IntrinsicElements['input'];

export const NumericInput = (props: NumericInputProps) => {
  return <input {...props} type="number" />;
};
