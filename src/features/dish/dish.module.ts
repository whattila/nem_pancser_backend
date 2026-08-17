import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { DishCategory, DishCategorySchema } from './dish_category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DishCategory.name, schema: DishCategorySchema },
    ]),
  ],
  controllers: [DishController],
  providers: [DishService]
})
export class DishModule {}
