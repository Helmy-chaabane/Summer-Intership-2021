import jwt from "jsonwebtoken";
import { generateError } from "../errors/errors";

function genrerateToken(object, expiresIn = "7 days") {
  try {
    const token = jwt.sign(object, process.env.JWT_SECRET || "secretKey", {
      expiresIn, // we can change it later
    });
    return token;
  } catch (error) {
    generateError(error.message);
  }
}

async function auth(request, User, tok, requireAuth = true) {
  try {
    const token = tok || request.req.headers.authorization || "";
    if (token) {
      const { _id } = jwt.verify(token, process.env.JWT_SECRET || "secretKey");
      if (!_id) generateError("Invalid Token!", "FORBIDDEN");
      const user = await User.findById(_id);
      if (!user) generateError("No User with the provided Token!", "NOT_FOUND");
      if (user.isBlocked)
        generateError("This account is Blocked!", "FORBIDDEN");
      return user;
    }
    if (requireAuth)
      generateError("Authorization is required!", "UNAUTHENTICATED");
  } catch (e) {
    if (e.extensions) generateError(e.message, e.extensions.code);
    else generateError(e.message, "FORBIDDEN");
  }
}

export { genrerateToken, auth };
