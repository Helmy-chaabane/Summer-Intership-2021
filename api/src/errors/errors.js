import {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
  ApolloError,
} from "apollo-server-express";
import {
  NotFoundError,
  AuthorizationError,
  ConflitError,
} from "./costumErrors";

const generateError = (message, errorType) => {
  switch (errorType) {
    case "BAD_USER_INPUT":
      throw new UserInputError(message);

    case "UNAUTHENTICATED":
      throw new AuthenticationError(message);

    case "UNAUTHORIZED":
      throw new AuthorizationError(message);

    case "FORBIDDEN":
      throw new ForbiddenError(message);

    case "CONFLICT":
      throw new ConflitError(message);

    case "NOT_FOUND":
      throw new NotFoundError(message);
    default:
      throw new ApolloError(message); // server error
  }
};

export { generateError };
