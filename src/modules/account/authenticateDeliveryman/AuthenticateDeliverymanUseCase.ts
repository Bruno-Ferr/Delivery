import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  // Recive username, password
  async execute({ username, password }: IAuthenticateDeliveryman) {

    // Verify if username is registered
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      },
    });

    if (!deliveryman) {
      throw new Error("username or password invalid!");
    }
    // Verify if password matches username
    const passwordMatch = await compare(password, deliveryman.password);

    if(!passwordMatch) {
      throw new Error("username or password invalid!");
    }
    // Token generation
    const token = sign({username}, "898ce53049638f3gg86c4b534cf16078", {
      subject: deliveryman.id,
      expiresIn: "1d"
    });

    return {
      token,
    };
  }
}