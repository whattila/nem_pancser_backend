import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DishCategory, DishCategoryDocument } from './dish_category.schema';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(DishCategory.name) private readonly dishCategoryModel: Model<DishCategoryDocument>,
  ) {}

  async getAllDishes(): Promise<DishCategory[]> {
    return await this.dishCategoryModel.find().select('_id name').lean();
  }
}
