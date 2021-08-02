import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Wallet, WalletSchema } from './wallet.model';
import { WalletService } from './wallet.service';
import { WalletResolver } from './wallet.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
  ],
  providers: [WalletService, WalletResolver],
})
export class WalletModule {}
