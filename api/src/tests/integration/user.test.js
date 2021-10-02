import mangoose from "mongoose";
import db from "../../db";
import { ApolloServer } from "apollo-server-express";
import { schema, contextModels } from "../../apolloSever";
import User from "../../User/user-schema";
import Token from "../../Token/token-schema";
import { LOGIN, SIGN_UP, DELETE_USER, UPDATE_USER } from "../Mutations/user";
import { genrerateToken } from "../../auth/jwt";

describe("User Mutations", () => {
  let server;

  beforeAll(async () => {
    await db;
    server = new ApolloServer({
      schema,
      context(req) {
        return {
          req,
          ...contextModels,
        };
      },
    });
  });

  describe("Login", () => {
    let user;
    let userId = mangoose.Types.ObjectId().toHexString();
    let email;
    let password;
    let name;
    let isVerified;
    beforeEach(async () => {
      email = "Helmy@gmail.com";
      password = "123654";
      name = "Helmy";
      isVerified = false;
      user = new User({
        _id: userId,
        email,
        name,
        password,
        isVerified,
      });
      await user.save();
    });

    afterEach(async () => {
      await User.remove({});
    });

    const exec = () => {
      return server.executeOperation({
        query: LOGIN,
        variables: { email, password },
      });
    };

    test("Should return error with Invalid User", async () => {
      email = "";
      password = "";
      const result = await exec();
      expect(result.errors[0]).toMatchObject({
        message: "Invalid User!",
        extensions: { code: "UNAUTHORIZED" },
      });
    });

    test("Should return error with Invalid credentials", async () => {
      password = "";
      const result = await exec();
      expect(result.errors[0]).toMatchObject({
        message: "Invalid credentials!",
        extensions: { code: "UNAUTHORIZED" },
      });
    });

    test("Should return error with Verify account", async () => {
      const result = await exec();
      expect(result.errors[0]).toMatchObject({
        message: "Please verify your account first!",
        extensions: { code: "FORBIDDEN" },
      });
    });

    test("Should return data : token && user", async () => {
      user.isVerified = true;
      await user.save();
      const result = await exec();
      expect(Object.keys(result.data.login)).toEqual(
        expect.arrayContaining(["token", "user"])
      );
      expect(result.data.login.user._id).toEqual(userId);
      expect(result.data.login.token).toBeTruthy();
    });
  });

  describe("sign in", () => {
    let user;
    let usedEmail = "Helmy@gmail.com";
    let email;
    let name;
    let password;
    let isAdmin;

    beforeAll(async () => {
      user = new User({
        email: usedEmail,
        name: "Helmy Chaabane",
        password: "123654",
        isAdmin: false,
      });
      await user.save();
    });

    beforeEach(() => {
      email = "Helmy1@gmail.com";
      name = "Helmy Chaabane";
      password = "123654";
      isAdmin = false;
    });

    afterEach(async () => {
      await User.remove({});
      await Token.remove({});
    });

    const exec = () => {
      return server.executeOperation({
        query: SIGN_UP,
        variables: { email, password, name, isAdmin },
      });
    };

    test("Should return error with no User found", async () => {
      email = usedEmail;
      const result = await exec();

      expect(result.errors[0]).toMatchObject({
        message: "User already exists with this email!",
        extensions: { code: "CONFLICT" },
      });
    });
  });

  describe("deleteUser", () => {
    let user;
    let _id;
    let userId = mangoose.Types.ObjectId().toHexString();
    let isAdmin = true;
    let token;

    const exec = () => {
      return server.executeOperation({
        query: DELETE_USER,
        variables: { _id },
      });
    };

    beforeAll(async () => {
      user = new User({
        _id: userId,
        email: "Helmy@gmail.com",
        name: "Helmy Chaabane",
        password: "123654",
        isAdmin,
      });
      await user.save();
    });

    afterAll(async () => {
      await User.remove({});
    });
    beforeEach(() => {
      _id = userId;
      token = genrerateToken({ _id, isAdmin });
      server = new ApolloServer({
        schema,
        context() {
          return {
            req: {
              req: {
                headers: {
                  authorization: token,
                },
              },
            },
            ...contextModels,
          };
        },
      });
    });

    test("Should return error with valid ID", async () => {
      _id = "";
      const result = await exec();
      expect(result.errors[0]).toMatchObject({
        message: "Provide a valid ID!",
        extensions: { code: "BAD_USER_INPUT" },
      });
    });

    test("Should return error with no User found", async () => {
      _id = mangoose.Types.ObjectId().toHexString();
      const result = await exec();
      expect(result.errors[0]).toMatchObject({
        message: "No User with the provided ID!",
        extensions: { code: "NOT_FOUND" },
      });
    });

    test("Should return a deleted user", async () => {
      const result = await exec();
      expect(result.data.deleteUser).toMatchObject({ _id });
      expect(result.data.deleteUser._id).toEqual(userId);
    });
  });

  describe("updateUser", () => {
    let userId = mangoose.Types.ObjectId().toHexString();
    let _id;

    beforeAll(async () => {
      _id = userId;
      const user = new User({
        _id,
        email: "Helmy1@gmail.com",
        name: "Helmy Chaabane",
        password: "123654",
        isAdmin: true,
      });
      await user.save();
      server = new ApolloServer({
        schema,
        context() {
          return {
            req: {
              req: {
                headers: {
                  authorization: genrerateToken({ _id: userId }),
                },
              },
            },
            ...contextModels,
          };
        },
      });
    });

    const exec = () => {
      return server.executeOperation({
        query: UPDATE_USER,
        variables: {
          _id,
          name: "Fahmy",
        },
      });
    };

    test("Should return error win invalid ID", async () => {
      _id = "";
      const result = await exec();
      expect(result.errors[0]).toMatchObject({
        message: "Provide a valid ID!",
        extensions: { code: "BAD_USER_INPUT" },
      });
    });

    test("Should return error with User not found", async () => {
      _id = mangoose.Types.ObjectId().toHexString();
      const result = await exec();
      expect(result.errors[0]).toMatchObject({
        message: "No User with the provided ID!",
        extensions: { code: "NOT_FOUND" },
      });
    });

    test("Should return an updated user", async () => {
      _id = userId;
      const result = await exec();
      expect(result.data.updateUser).toMatchObject({
        _id,
        name: "Fahmy",
      });
    });
  });
});
