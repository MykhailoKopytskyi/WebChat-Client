import configuration from "../config/config";

export const emailValidation = (email) => {
  let emailRegEx = configuration.validation.emailRegExp;
  if( emailRegEx.test(email) == true) {
    return email;
  }
  return false;
}

export const passwordValidation = (password) => {
  let passwordRegEx = configuration.validation.passwordRegExp;
  if( passwordRegEx.test(password) == true) {
    return password;
  }
  return false;
}

export const usernameValidation = (username) => {
  let usernameRegEx = configuration.validation.usernameRegExp;
  if( usernameRegEx.test(username) == true) {
    return username;
  }
  return false;
}

