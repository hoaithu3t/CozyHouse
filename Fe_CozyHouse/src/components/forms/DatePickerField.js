import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import { FieldFeedbackLabel } from './FieldFeedbackLabel';
import moment from 'moment';

const getFieldCSSClasses = (touched, errors) => {
  const classes = [];
  if (touched && errors) {
    classes.push('is-invalid');
  }

  if (touched && !errors) {
    classes.push('is-valid');
  }

  return classes.join(' ');
};

export function DatePickerField({ ...props }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [field] = useField(props);
  const classes = getFieldCSSClasses(touched[field.name], errors[field.name]);
  return (
    <>
      {props.label && <label>{props.label}</label>}
      <div className={classes}>
        <DatePicker
          className={`form-control ${classes}`}
          {...field}
          {...props}
          selected={
            (field.value && moment(field.value, 'DD/MM/yyyy').toDate()) || null
          }
          onChange={(val) => {
            setFieldValue(field.name, val);
            if (props.isSubmit === true) props.handleSubmit();
          }}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      {props.withFeedbackLabel && (
        <FieldFeedbackLabel
          error={errors[field.name]}
          touched={touched[field.name]}
          label={props.label}
          customFeedbackLabel={props.customFeedbackLabel}
        />
      )}
    </>
  );
}
