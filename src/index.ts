import { Dish } from "./dishes/dish";
import {
  LocalFileDishRepository,
  PrismaDishRepository,
} from "./dishes/dish.repository";
import { dishRouter } from "./dishes/dish.routes";
import { DishService } from "./dishes/dish.service";

import express, { NextFunction, Request, Response } from "express";

const repository =
  process.env["DATABASE_TYPE"] == "local"
    ? new LocalFileDishRepository()
    : new PrismaDishRepository();
export const dishService = new DishService(repository); //espera um repositorio
const app = express();
app.use(express.json());
app.use(dishRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno no servidor';
  res.status(statusCode).json({
    sucesso: false,
    status: statusCode,
    mensagem: message
  });
})

app.listen(3000, () => {
  console.log("rodando na porta 3000");
});
