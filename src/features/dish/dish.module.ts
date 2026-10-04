import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { DishCategory, DishCategorySchema } from './model/schema/dish_category.schema';
import { MenuItemModule } from '../shared/menu_item/menu_item.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: DishCategory.name, schema: DishCategorySchema }]),
    MenuItemModule
  ],
  controllers: [DishController],
  providers: [DishService]
})
export class DishModule {}
