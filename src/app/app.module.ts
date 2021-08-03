import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { WalletModule } from './wallet/wallet.module';
import { ExchangeModule } from './exchange/exchange.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
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
