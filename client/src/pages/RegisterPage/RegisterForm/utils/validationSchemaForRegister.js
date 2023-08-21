import * as yup from 'yup';

const validationSchemaForRegister = yup.object().shape({
  email: yup
    .string()
    .email('Введите корректный email')
    .test(
      'is-required',
      'Введите почту или телефон',
      function (value) {
        return !!value || !!this.parent.phone;
      })
    .max(40, 'email не может быть таким длинным'),
  phone: yup
    .string()
    .matches(/^\+[1-9]\d{1,14}$/, 'Введите кооректный номер')
    .test(
      'is-required',
      'Введите почту или телефон',
      function (value) {
        return !!value || !!this.parent.email;
      })
    .max(10, 'Номер телефона слишком длинный')
    .min(10, 'Номер телефона слишком короткий'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/,
      'Пароль должен содержать латинские символы, цифры и хотя бы 1 специальный символ'
    )
    .min(7, 'Пароль не может быть таким коротки')
    .max(25, 'Пароль не может быть таким длинным'),
  passwordConfirm: yup
    .string()
    .required('Подтвердить пароль обязательно')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export {
  validationSchemaForRegister,
};
