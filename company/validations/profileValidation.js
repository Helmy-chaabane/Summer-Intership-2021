export const editValidation = ({ phone, location, diploma, job }) => {
  const errors = {
    phone: "",
    location: "",
    diploma: "",
    job: "",
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

  if (!location) {
    errors.location = "Location is required!";
    errors.valid = false;
  }
  if (!diploma) {
    errors.diploma = "Diploma is required!";
    errors.valid = false;
  }
  if (!job) {
    errors.job = "Job is required!";
    errors.valid = false;
  }
  return errors;
};
