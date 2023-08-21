import React from 'react';
import { TextField } from '@mui/material';

const EmailField = ({ formik }) => (
  <TextField
    placeholder="Email"
    id="email"
    name="email"
    value={formik.values.email}
    onChange={formik.handleChange}
    error={formik.touched.email && Boolean(formik.errors.email)}
    helperText={formik.touched.email && formik.errors.email}
    label="Email"
  />
);

export {
  EmailField,
};
