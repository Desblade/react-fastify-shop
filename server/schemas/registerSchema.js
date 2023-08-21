const registerSchema = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        maxLength: 35,
        format: 'email',
      },
      password: {
        type: 'string',
        minLength: 7,
        maxLength: 25,
      },
      userConfirmCode: {
        type: 'string',
      },
    },
    required: ['email', 'password', 'userConfirmCode'],
  },
};

const loginSchema = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: { type: 'string' },
    },
  },
};

module.exports = {
  registerSchema,
  loginSchema,
};
