import { Dish } from "./dishes/dish";
import {
  LocalFileDishRepository,
  PrismaDishRepository,
} from "./dishes/dish.repository";
import { dishRouter } from "./dishes/dish.routes";
import { DishService } from "./dishes/dish.service";

import express from "express";

const repository =
  process.env["DATABASE_TYPE"] == "local"
    ? new LocalFileDishRepository()
    : new PrismaDishRepository();
export const dishService = new DishService(repository); //espera um repositorio
const app = express();
app.use(express.json());
app.use(dishRouter);

app.get("/dishes", async (req, res) => {
  const allDishes: Dish[] = await dishService.find();
  res.send(allDishes);
});

app.listen(3000, () => {
  console.log("rodando na porta 3000");
});
