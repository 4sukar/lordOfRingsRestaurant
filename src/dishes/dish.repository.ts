
import { prisma } from "../infra/prisma/prisma";
import { CreavteDishDTO, Dish } from "./dish";

export interface DishRepository{
    create(payload: CreavteDishDTO):Promise<Dish>
    find():Promise<Dish[]>
    findByNameOrDescription(name: string, description: string):Promise<Dish[]>
}
export class LocalFileDishRepository implements DishRepository {
  findByNameOrDescription(name: string, description: string): Promise<Dish[]> {
    throw new Error("Method not implemented.");
  }

  private dishes: Dish[] = [

    {
      id: 1,
      name: "Classic Burger",

      price: 25.9,

      description: "Juicy beef burger with cheese, lettuce and tomato.",

      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",

    },

    {
      id: 2,
      name: "Pepperoni Pizza",

      price: 49.9,

      description: "Traditional pizza topped with pepperoni and mozzarella.",

      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",

    },

    {
      id: 3,
      name: "Caesar Salad",

      price: 18.9,

      description: "Fresh romaine lettuce, croutons and Caesar dressing.",

      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",

    },

  ];

  async create(payload: CreavteDishDTO): Promise<Dish> {
    const newDishe = {id:1, ...payload}
    this.dishes.push(newDishe);

    return newDishe;

  }

  async find(): Promise<Dish[]> {

    return [...this.dishes];

  }

}


export class PrismaDishRepository implements DishRepository {
  async findByNameOrDescription(name: string, description: string): Promise<Dish[]> {
   const findDish = await prisma.dish.findMany({where: {OR: [{name},{description}]}})
   return findDish;
  }

  async create(payload: CreavteDishDTO): Promise<Dish> {
  const dish = await prisma.dish.create({
    data: {
      name: payload.name,
      price: payload.price,
      description: payload.description,
      image: payload.image
    }
  });
  return dish;
}

  async find(): Promise<Dish[]> {
    const dishes = await prisma.dish.findMany();
    return dishes;
  }

}

//regras de negocio