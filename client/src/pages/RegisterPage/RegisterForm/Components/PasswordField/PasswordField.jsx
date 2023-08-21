import React from 'react';
import { TextField } from '@mui/material';

const PasswordField = ({ formik }) => (
  <TextField
    placeholder="Password"
    type="password"
    id="password"
    name="password"
    value={formik.values.password}
    onChange={formik.handleChange}
    error={formik.touched.password && Boolean(formik.errors.password)}
    helperText={formik.touched.password && formik.errors.password}
    label="Password"
  />
);

export {
  PasswordField,
};
