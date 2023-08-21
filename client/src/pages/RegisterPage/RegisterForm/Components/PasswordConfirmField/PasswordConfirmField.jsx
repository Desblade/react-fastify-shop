import React from 'react';
import { TextField } from '@mui/material';

const PasswordConfirmField = ({ formik }) => (
  <TextField
    placeholder="Confirm password"
    type="password"
    id="passwordConfirm"
    name="passwordConfirm"
    value={formik.values.passwordConfirm}
    onChange={formik.handleChange}
    error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
    helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
    label="Confirm password"
  />
);

export {
  PasswordConfirmField,
};
