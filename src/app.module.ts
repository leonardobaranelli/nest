import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ImmovablesModule } from './immovables/immovables.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UsersModule, ImmovablesModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
