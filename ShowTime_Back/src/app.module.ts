import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { concertModule } from './concert/concert.module';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { groupModule } from './group/group.module';
import { ticketsModule } from './tickets/tickets.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './enums/roles.guards';

@Module({
  imports: [
    concertModule,
    UsersModule,
    groupModule,
    ticketsModule,
    MongooseModule.forRoot('mongodb://localhost/ShowTime', {
      connectionName: 'ShowTime',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
