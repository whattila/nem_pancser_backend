import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { DishModule } from './features/dish/dish.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth_guard/auth.guard';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DishModule,
    MongooseModule.forRoot(config.databaseUrl)
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule {}
