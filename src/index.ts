import { Dish } from "./dishes/dish";
import { PrismaDishRepository } from "./dishes/dish.repository";
import { DishService } from "./dishes/dish.service";

import express from "express";
const dishRepo = new PrismaDishRepository()
const dishService = new DishService(dishRepo)
const app = express();

app.use(express.json());

app.get("/dishes", async (req, res) => {
    const allDishes:Dish[] = await dishService.find()
    res.send(allDishes);
});

app.listen(3000, () => {
    console.log("foi");
});




