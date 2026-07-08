import { Router } from "express";
import { dishService } from "../index";

export const dishRouter = Router(); //express rotas

dishRouter.post("/", (req, res) => {
  const dish = dishService.create(req.body); //criar o jason
  return res.status(201).json(dish);
});
