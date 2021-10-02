export const generateGraphQlErrors = (error) => {
  if (error.graphQLErrors) {
    const gqlError = error?.graphQLErrors[0];
    if (gqlError?.message)
      return { message: gqlError.message, code: gqlError.extensions.code };
  }
  return { code: "Error", message: error.message };
};
