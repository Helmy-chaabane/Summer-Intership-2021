export const createValidation = ({ title }) => {
  const errors = {
    title: "",
    valid: true,
  };
  if (!title) {
    errors.title = "Title is required!";
    errors.valid = false;
  }

  return errors;
};
