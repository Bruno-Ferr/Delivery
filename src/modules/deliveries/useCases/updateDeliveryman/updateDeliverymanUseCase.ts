import { prisma } from "../../../../database/prismaClient";


interface IPayloadDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateDeliverymaUseCase {
  async execute({ id_delivery, id_deliveryman }: IPayloadDeliveryman) {
    const result = await prisma.deliveries.update({
      where: {
        id: id_delivery
      },
      data: {
        id_deliveryman,
      },
    });

    return result;
  }
}