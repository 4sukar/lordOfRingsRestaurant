import { Router } from "express";
import { dishService } from "../index";
import { Dish } from "./dish";
import { zstdCompress } from "node:zlib";
import { z } from "zod";

export const dishRouter = Router(); //express rotas

dishRouter.post("/dishes", async (req, res, next) => {
  try {
    DishSchema.parse(req.body)
      const dish = await dishService.create(req.body); //criar o jason
  return res.status(201).json(dish);
  } catch (error) {
    next(error)
  }

}); 

dishRouter.get("/dishes", async (req, res) => {
  const allDishes: Dish[] = await dishService.find();
  res.send(allDishes);
});

const DishSchema = z.object({  
  name: z
  .string()
  .min(3, { error: "the dish name must have at last 3 characters"})
  .max(30, { error: "The dish name must have a maximum of 30 characters"}),
  price: z
  .number()
  .positive({ error: "The price must be greater than 0"}),
  description: z
  .string()
  .min(10, { error: "The description must have at least 10 characters"})
  .max(300, { error : "The description must have a maximum of 300 characters"}),
  image: z
  .url({ error: "the url isn't valid"})
})