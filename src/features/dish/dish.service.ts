import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DishCategory } from './model/schema/dish_category.schema';
import { plainToInstance } from 'class-transformer';
import { DishCategoryDto } from './model/dto/dish_category.dto';
import { DishHeaderDto } from './model/dto/dish_header.dto';
import { MenuItem } from '../shared/menu_item/menu_item.schema';
import { DishDto } from './model/dto/dish.dto';
import { DishAccessoryDto } from './model/dto/dish_accessory.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(DishCategory.name) private readonly dishCategoryModel: Model<DishCategory>,
    @InjectModel(MenuItem.name) private readonly menuItemModel: Model<MenuItem>
  ) {}

  async getAllDishCategories(): Promise<DishCategoryDto[]> {
    const dishCategories = await this.dishCategoryModel.find().select('name').lean();
    return plainToInstance(DishCategoryDto, dishCategories, { excludeExtraneousValues: true });
  }

  async getDishesByCategory(categoryId: string): Promise<DishHeaderDto[]> {
    const dishes = await this.menuItemModel.find({ categories: categoryId }).select('name price').lean();
    return plainToInstance(DishHeaderDto, dishes, { excludeExtraneousValues: true });
  }

  async getDishById(id: string): Promise<DishDto> {
    const dish = await this.menuItemModel.findById(id).lean();
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

  async getDishOptions(): Promise<DishAccessoryDto[]> {
    const dishOptions = await this.menuItemModel.find({ dishAccessoryType: { $exists: true } }).select('name price').lean();
    return plainToInstance(DishAccessoryDto, dishOptions, { excludeExtraneousValues: true });
  }

  async getSaladExtras(): Promise<DishAccessoryDto[]> {
    const saladExtras = await this.menuItemModel.find({ hasSaladExtraOption: true }).select('name price').lean();
    return plainToInstance(DishAccessoryDto, saladExtras, { excludeExtraneousValues: true });
  }
}
