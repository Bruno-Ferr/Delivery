import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // Recive username, password

    // Verify if username is registered
    const client = await prisma.clients.findFirst({
      where: {
        username
      },
    });

    if (!client) {
      throw new Error("username or password invalid!");
    }
    // Verify if password matches username
    const passwordMatch = await compare(password, client.password);

    if(!passwordMatch) {
      throw new Error("username or password invalid!");
    }
    // Token generation
    const token = sign({username}, "898ce53049638f3ff86c4b534cf16078", {
      subject: client.id,
      expiresIn: "1d"
    });

    return {
      token,
    };
  }
}