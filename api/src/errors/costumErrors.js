import { ApolloError } from "apollo-server-express";

class NotFoundError extends ApolloError {
  constructor(message) {
    super(message, "NOT_FOUND");
    Object.defineProperty(this, "NotFoundError", { value: "NotFoundError" });
  }
}

class AuthorizationError extends ApolloError {
  constructor(message) {
    super(message, "UNAUTHORIZED");
    Object.defineProperty(this, "AuthorizationError", {
      value: "AuthorizationError",
    });
  }
}

class ConflitError extends ApolloError {
  constructor(message) {
    super(message, "CONFLICT");
    Object.defineProperty(this, "ConflitError", {
      value: "ConflitError",
    });
  }
}

export { NotFoundError, AuthorizationError, ConflitError };
