import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username }: ICreateClient) {
    // User exist verification
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        },
      },
    });

    if(clientExist){
      throw new Error("Client already exists");
    }

    // Encrypt password
    const hashPassword = await hash(password, 10);

    // Save client
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });
  
    return client;
  }
}