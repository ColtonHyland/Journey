import jwt from "jsonwebtoken";

export function signJwtAccessToken(payload, expiresIn = "1h") {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn });
}

export function verifyJwtAccessToken(token) {
  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }

}