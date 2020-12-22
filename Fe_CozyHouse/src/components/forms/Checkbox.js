import React from 'react';
import { useField } from 'formik';

export function Checkbox({ ...props }) {
  const [field] = useField(props);
  return (
    <>
      <input type="checkbox" style={{ display: 'none' }} />
      <label className="checkbox checkbox-lg checkbox-single">
        <input type="checkbox" {...field} checked={field.value} />
        <span className="mr-2" />
        {props.children}
      </label>
    </>
  );
}
