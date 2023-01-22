export const REGEX = {
  emailCheck:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  passwordCheck: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
};

export const ERROR_MESSAGES = {
  email: {
    require: 'Email address is required',
    notValid: 'Not a valid email address',
    exist: 'Email address already exist',
  },
  password: {
    require: 'Password is required',
    hint: 'Password needs to be at least six characters, one uppercase letter and one number',
  },
};
