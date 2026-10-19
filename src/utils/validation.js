import isEmail from 'validator/lib/isEmail';

export function validateEmail(email) {
  return isEmail(email);
}

export function validatePassword(password) {
  const passwordRegex =
    /^(?=[a-zA-Z0-9_ñÑ]*\d)(?=[a-zA-Z0-9_ñÑ]*[A-ZÑ])(?=[a-zA-Z0-9_ñÑ]*[a-zñ])\S{8,16}$/;
  return passwordRegex.test(password);
}
