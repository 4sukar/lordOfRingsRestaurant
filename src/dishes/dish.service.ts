import { error } from "console";
import { CreavteDishDTO, Dish } from "./dish";
import { DishRepository, PrismaDishRepository } from "./dish.repository";

export class DishService{
    constructor(private dishRepo:DishRepository){

    }
    async create(payload: CreavteDishDTO):Promise<Dish>{
        const dishes = await this.dishRepo.find()

        if (dishes.some(dish => dish.name === payload.name)) {
          throw new Error("A dish with this name already exists")
        }

        if (dishes.some(dish => dish.description === payload.description)) {
          throw new Error("A dish with this description already exists")
        }

        return this.dishRepo.create(payload)
    }
    async find():Promise<Dish[]>{
        return this.dishRepo.find()
    }
}