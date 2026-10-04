import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MenuItem, MenuItemSchema } from "./menu_item.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: MenuItem.name, schema: MenuItemSchema}]),
  ],
  exports: [MongooseModule],
})
export class MenuItemModule {}