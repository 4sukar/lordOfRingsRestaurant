import { CreavteDishDTO, Dish } from "./dish";
import { DishRepository, PrismaDishRepository } from "./dish.repository";

export class DishService{
    constructor(private dishRepo:DishRepository){

    }
    async create(payload: CreavteDishDTO):Promise<Dish>{
        const dishes = await this.dishRepo.findByNameOrDescription(payload.name, payload.description)
        console.log(dishes)
        const errors = []
        if (dishes.some(dish => dish.name === payload.name)) {
            errors.push("A dish with this name already exists")
        }

        if (dishes.some(dish => dish.description === payload.description)) {
          errors.push("A dish with this description already exists")
        }
        if(errors.length != 0){
            throw new Error(errors.join(" and ")) 
        }
        return this.dishRepo.create(payload)
    }
    async find():Promise<Dish[]>{
        return this.dishRepo.find()
    }
}