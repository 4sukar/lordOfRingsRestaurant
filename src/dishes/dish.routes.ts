import { Router } from "express";
import { LocalFileDishRepository, PrismaDishRepository } from "./dish.repository";
import { DishService } from "./dish.service";

export const router = Router();//express rotas

const repository = process.env["DATABASE_TYPE"] == "local"?new LocalFileDishRepository(): new LocalFileDishRepository();
const service = new DishService(repository); //espera um repositorio

router.post("/", (req, res) => {
    const dish = service.create(req.body);//criar o jason
    return res.status(201).json(dish);
});
