import React from 'react';
import Select from 'react-select';
import { FieldFeedbackLabel } from './FieldFeedbackLabel';

// const getFieldCSSClasses = (touched, errors) => {
//   const classes = ['form-control', 'form-control-solid'];
//   if (touched && errors) {
//     classes.push('is-invalid-select');
//   }

//   if (touched && !errors) {
//     classes.push('is-valid-select');
//   }

//   return classes.join(' ');
// };

export function SelectSearch({
  field,
  form: { touched, errors, setFieldValue },
  label,
  withFeedbackLabel = true,
  customFeedbackLabel = null,
  options,
}) {
  return (
    <>
      {label && <label>{label}</label>}
      <Select
        // className={getFieldCSSClasses(touched, error)}
        options={options}
        name={field.name}
        value={
          options ? options.find((option) => option.value === field.value) : ''
        }
        onChange={(option) => setFieldValue(field.name, option.value)}
        onBlur={field.onBlur}
      />

      {withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={label}
          customFeedbackLabel={customFeedbackLabel}
        />
      )}
    </>
  );
}
