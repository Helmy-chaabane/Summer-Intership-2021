import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import db from "../../db";
import User from "../../User/user-schema";
import { genrerateToken, auth } from "../../auth/jwt";

describe("Token generating", () => {
  test("Should validate token", () => {
    const token = genrerateToken({ _id: 1 });
    const decode = jwt.verify(token, process.env.JWT_SECRET || "secretKey");
    expect(decode).toMatchObject({ _id: 1 });
  });
});

describe("Token Validation", () => {
  let user;
  let token;
  let request;
  let _id;

  beforeAll(async () => {
    await db;
    _id = mongoose.Types.ObjectId().toHexString();
    user = new User({
      _id,
      email: "Helmy@gmail.com",
      name: "Helmy Chaabane",
      password: "123654",
      isAdmin: false,
    });
    await user.save();
  });
  afterAll(async () => {
    await User.deleteMany({});
  });

  beforeEach(async () => {
    token = await genrerateToken({ _id });
    request = {
      req: {
        headers: {
          authorization: token,
        },
      },
    };
  });

  test("Should return error with UNAUTHENTICATED code ", async () => {
    request.req.headers.authorization = "";
    try {
      await auth(request, User, "");
    } catch (error) {
      expect(error).toMatchObject({
        message: "Authorization is required!",
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }
  });

  test("Should return error with Invalid Token", async () => {
    request.req.headers.authorization = genrerateToken({ _id: 5 });
    try {
      await auth(request, User, "");
    } catch (error) {
      expect(error).toMatchObject({
        extensions: {
          code: "FORBIDDEN",
        },
      });
    }
  });

  test("Should return error with no User found Token", async () => {
    request.req.headers.authorization = genrerateToken({
      _id: mongoose.Types.ObjectId().toHexString(),
    });
    try {
      await auth(request, User, "");
    } catch (error) {
      expect(error).toMatchObject({
        extensions: {
          code: "NOT_FOUND",
        },
      });
    }
  });

  test("Should return a valid user", async () => {
    const result = await auth(request, User, "");
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("_id");
  });
});
