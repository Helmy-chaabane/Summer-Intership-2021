import { EMAIL_FORMAT } from "../constants/formats";

export const inviteValidation = (emails) => {
  const errors = { email: "", valid: true };

  emails.forEach((email) => {
    if (!email) {
      errors.email = "Email is required";
      errors.valid = false;
      return;
    } else if (!email.match(EMAIL_FORMAT)) {
      errors.email = "An email is not valid!";
      errors.valid = false;
      return;
    }
  });

  return errors;
};
