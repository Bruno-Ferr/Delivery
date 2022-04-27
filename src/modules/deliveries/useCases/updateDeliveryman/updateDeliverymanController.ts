import { Request, Response } from "express";
import { UpdateDeliverymaUseCase } from "./updateDeliverymanUseCase";



export class updateDeliverymaController {
  async handle(req: Request, res: Response) {
    const { id_deliveryman } = req;
    const { id: id_delivery } = req.params;

    const updateDeliverymanUseCase = new UpdateDeliverymaUseCase();
    const delivery = await updateDeliverymanUseCase.execute({
      id_delivery,
      id_deliveryman
    });

    return res.json(delivery);
  }
}