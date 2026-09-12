import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DishCategory, DishCategoryDocument } from './model/schema/dish_category.schema';
import { plainToInstance } from 'class-transformer';
import { DishCategoryDto } from './model/dto/dish_category.dto';
import { DishHeaderDto } from './model/dto/dish_header.dto';
import { Dish, DishDocument } from './model/schema/dish.schema';
import { DishDto } from './model/dto/dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(DishCategory.name) private readonly dishCategoryModel: Model<DishCategoryDocument>,
    @InjectModel(Dish.name) private readonly dishModel: Model<DishDocument>
  ) {}

  async getAllDishCategories(): Promise<DishCategoryDto[]> {
    const dishCategories = await this.dishCategoryModel.find().select('name').lean();
    return plainToInstance(DishCategoryDto, dishCategories, { excludeExtraneousValues: true });
  }

  async getDishesByCategory(categoryId: string): Promise<DishHeaderDto[]> {
    const dishes = await this.dishModel.find({ category: categoryId }).select('name price').lean();
    return plainToInstance(DishHeaderDto, dishes, { excludeExtraneousValues: true });
  }

  async getDishById(id: string): Promise<DishDto> {
    const dish = await this.dishModel.findById(id).lean();
    if (!dish)
      throw new NotFoundException('A fogás nem található');
    
    return plainToInstance(
      DishDto,
      dish,
      {
        excludeExtraneousValues: true,
        exposeUnsetFields: false
      }
    );
  }
}
