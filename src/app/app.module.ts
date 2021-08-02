import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { WalletModule } from './wallet/wallet.module';
import { ExchangeModule } from './exchange/exchange.module';


@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/three-in-one-db'),
    MongooseModule.forRoot('mongodb+srv://admin:pass@cluster0.bjon7.mongodb.net/securitize?retryWrites=true&w=majority'),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
    }),
    WalletModule,
    ExchangeModule,
  ],
})
export class AppModule {}
