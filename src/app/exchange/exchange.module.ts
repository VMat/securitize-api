import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exchange, ExchangeSchema } from './exchange.model';
import { ExchangeService } from './exchange.service';
import { ExchangeResolver } from './exchange.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exchange.name, schema: ExchangeSchema }]),
  ],
  providers: [ExchangeService, ExchangeResolver],
})
export class ExchangeModule {}
