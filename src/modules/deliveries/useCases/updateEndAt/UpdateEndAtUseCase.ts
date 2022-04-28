import { prisma } from "../../../../database/prismaClient";

interface IUpdateEndAt {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateEndAtUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateEndAt) {
    const result = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman,
      },
      data: {
        end_at: new Date(),
      }
    });

    return result;
  }
}