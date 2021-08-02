import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Wallet } from './wallet.model';
import { WalletService } from './wallet.service';
import {
  CreateWalletInput,
  ListWalletInput,
  UpdateWalletInput,
} from './wallet.inputs';

@Resolver(() => Wallet)
export class WalletResolver {
  constructor(private walletService: WalletService) {}

  @Query(() => Wallet)
  async wallet(@Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId) {
    return this.walletService.getById(_id);
  }

  @Query(() => [Wallet])
  async wallets(
    @Args('filters', { nullable: true }) filters?: ListWalletInput,
  ) {
    return this.walletService.list(filters);
  }

  @Mutation(() => Wallet)
  async createWallet(@Args('payload') payload: CreateWalletInput) {
    return this.walletService.create(payload);
  }

  @Mutation(() => Wallet)
  async updateWallet(@Args('payload') payload: UpdateWalletInput) {
    return this.walletService.update(payload);
  }

  @Mutation(() => Wallet)
  async deleteWallet(@Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId) {
    return this.walletService.delete(_id);
  }
}
