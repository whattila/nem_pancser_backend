import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { DishCategory, DishCategorySchema } from './model/schema/dish_category.schema';
import { Dish, DishSchema } from './model/schema/dish.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dish.name, schema: DishSchema },
      { name: DishCategory.name, schema: DishCategorySchema },
    ]),
  ],
  controllers: [DishController],
  providers: [DishService]
})
export class DishModule {}
