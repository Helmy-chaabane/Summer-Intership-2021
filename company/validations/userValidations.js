import { EMAIL_FORMAT } from "../constants/formats";

export const loginValidation = ({ email, password }) => {
  const errors = {
    email: "",
    password: "",
    valid: true,
  };
  if (!email) {
    errors.email = "Email is required!";
    errors.valid = false;
  } else if (!email.match(EMAIL_FORMAT)) {
    errors.email = "Email is not valid!";
    errors.valid = false;
  }
  if (!password) {
    errors.password = "Password is required!";
    errors.valid = false;
  }
  return errors;
};

export const signupValidation = ({
  name,
  email,
  password,
  confirmPassword,
  terms,
}) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
    valid: true,
  };

  if (!name) {
    errors.name = "Fullname is required!";
    errors.valid = false;
  }
  if (!email) {
    errors.email = "Email is required!";
    errors.valid = false;
  } else if (!email.match(EMAIL_FORMAT)) {
    errors.email = "Email is not valid!";
    errors.valid = false;
  }
  if (!password) {
    errors.password = "Password is required!";
    errors.valid = false;
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm your password!";
    errors.valid = false;
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords doesn't match!";
    errors.valid = false;
  }

  if (!terms) {
    errors.terms = "You need to accept our terms!";
    errors.valid = false;
  }

  return errors;
};

export const forgetPassswordValidation = (email) => {
  const errors = {
    email: "",
    valid: true,
  };

  if (!email) {
    errors.email = "Email is required!";
    errors.valid = false;
  } else if (!email.match(EMAIL_FORMAT)) {
    errors.email = "Email is not valid!";
    errors.valid = false;
  }

  return errors;
};

export const resetPassswordValidation = ({ password, confirmPassword }) => {
  const errors = {
    password: "",
    confirmPassword: "",
    valid: true,
  };

  if (!password) {
    errors.password = "Password is required!";
    errors.valid = false;
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm your password!";
    errors.valid = false;
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords doesn't match!";
    errors.valid = false;
  }

  return errors;
};
