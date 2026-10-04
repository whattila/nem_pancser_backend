import { Controller, Get, Param } from '@nestjs/common';
import { DishService } from './dish.service';

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get('categories')
  async getAllDishCategories() {
    return await this.dishService.getAllDishCategories();
  }

  @Get('categories/:id/dishes')
  async getDishesByCategory(@Param('id') categoryId: string) {
    return await this.dishService.getDishesByCategory(categoryId);
  }

  @Get(':id')
  async getDishById(@Param('id') id: string) {
    return await this.dishService.getDishById(id);
  }

  @Get('dishOptions')
  async getDishOptions() {
    return await this.dishService.getDishOptions();
  }

  @Get('saladExtras')
  async getSaladExtras() {
    return await this.dishService.getSaladExtras();
  }
}
