import { Request, Response } from "express";
import { UpdateEndAtUseCase } from "./UpdateEndAtUseCase";


export class UpdateEndAtController {
  async handle(req: Request, res: Response) {
    const { id_deliveryman } = req;
    const { id: id_delivery } = req.params;

    const updateEndAtUseCase = new UpdateEndAtUseCase();
    const delivery = await updateEndAtUseCase.execute({
      id_delivery,
      id_deliveryman
    });

    return res.json(delivery);
  }
}