import React from 'react';
import { TextField } from '@mui/material';

const NameField = ({ formik }) => (
  <TextField
    placeholder="Name"
    id="name"
    name="name"
    value={formik.values.name}
    onChange={formik.handleChange}
    error={formik.touched.name && Boolean(formik.errors.name)}
    helperText={formik.touched.name && formik.errors.name}
    label="Name"
  />
);

export {
  NameField,
};
