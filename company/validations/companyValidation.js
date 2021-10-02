import { EMAIL_FORMAT } from "../constants/formats";

export const editCompanyValidation = ({ name, email, phone, address }) => {
  const errors = {
    phone: "",
    address: "",
    name: "",
    email: "",
    valid: true,
  };
  if (!phone) {
    errors.phone = "Phone is required!";
    errors.valid = false;
  } else if (isNaN(phone)) {
    errors.phone = "Phone is digits!";
    errors.valid = false;
  } else if (phone.length > 8 || phone.length < 8) {
    errors.phone = "Phone should have 8 digits!";
    errors.valid = false;
  }

  if (!address) {
    errors.address = "Address is required!";
    errors.valid = false;
  }
  if (!name) {
    errors.name = "Name is required!";
    errors.valid = false;
  }
  if (!email) {
    errors.email = "Email is required!";
    errors.valid = false;
  } else if (!email.match(EMAIL_FORMAT)) {
    errors.email = "Email is not valid!";
    errors.valid = false;
  }
  return errors;
};
