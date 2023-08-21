import React from 'react';
import { InputAdornment, OutlinedInput } from '@mui/material';

const PhoneField = ({ formik }) => (
  <OutlinedInput
    type="number"
    startAdornment={<InputAdornment position="start">+7</InputAdornment>}
    placeholder="Номер Вашего телефона"
    id="phone"
    name="phone"
    value={formik.values.phone}
    onChange={formik.handleChange}
    error={formik.touched.phone && Boolean(formik.errors.phone)}
    helperText={formik.touched.phone && formik.errors.phone}
  />
);

export {
  PhoneField,
};
