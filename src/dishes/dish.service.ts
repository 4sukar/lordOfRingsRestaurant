import { error } from "console";
import { CreavteDishDTO, Dish } from "./dish";
import { DishRepository } from "./dish.repository";

export class DishService{
    constructor(private dishRepo:DishRepository){

    }
    async create(payload: CreavteDishDTO):Promise<Dish>{
      throw new Error("testando erros")
        return this.dishRepo.create(payload)
    }
    async find():Promise<Dish[]>{
        return this.dishRepo.find()
    }
}