export const isEmpty = (formInputs) => {
  return formInputs.some((input) => !input);
};

export const isPasswordMatch = (pass1, pass2) => {
  return pass1.length >= 6 && pass2.length >= 6 && pass1 === pass2;
};

export const isEmailFormatValid = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
