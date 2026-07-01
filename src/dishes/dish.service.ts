import { Dish } from "./dish";
import { DishRepository } from "./dish.repository";

export class DishService{
    constructor(private dishRepo:DishRepository){

    }
    async create(payload: Dish):Promise<Dish>{
      return this.dishRepo.create(payload)
    }
    async find():Promise<Dish[]>{
        return this.dishRepo.find()
    }
}