export const resetForm = (formik, values, setValues) => {
  formik.values.email = '';
  formik.values.phone = '';
  formik.values.password = '';
  formik.values.passwordConfirm = '';
  setValues({ ...values, userConfirmCode: '' });
};

export const handleAlignment = (setAlignment, event, newAlignment) => {
  setAlignment(newAlignment);
};

export const handlerShowEmail = (setBoolValues, boolValues, formik) => {
  setBoolValues({
    ...boolValues,
    showEmailField: true,
    showPhoneField: false,
  });

  formik.values.phone = '';
};

export const handlerShowPhone = (setBoolValues, boolValues, formik) => {
  setBoolValues({
    ...boolValues,
    showEmailField: false,
    showPhoneField: true,
  });

  formik.values.email = '';
};