import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";


interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {

    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive"
        },
      },
    });

    if(deliverymanExist){
      throw new Error("Deliveryman already exists");
    }

    // Encrypt password
    const hashPassword = await hash(password, 10);

    // Save deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });
  
    return deliveryman;
  }
}