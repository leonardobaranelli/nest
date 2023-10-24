import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ImmovablesModule } from './immovables/immovables.module';
import { SharedModule } from './shared/shared.module';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [UsersModule, ImmovablesModule, SharedModule, Web3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}