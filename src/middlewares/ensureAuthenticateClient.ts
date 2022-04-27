import { NextFunction, Request, Response, } from "express"
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({
      message: "Token missing",
    });
  }
  // Bearer Token - just need the token
  const [, token] = authHeader.split(" ");

  try {
    const {sub} = verify(token, "898ce53049638f3ff86c4b534cf16078") as IPayload;

    req.id_client = sub;

    return next();
  } catch(err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

}