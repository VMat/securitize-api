import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

import { Exchange } from './exchange.model';
import { ExchangeService } from './exchange.service';
import {
  CreateExchangeInput,
  ListExchangeInput,
  UpdateExchangeInput,
} from './exchange.inputs';

@Resolver(() => Exchange)
export class ExchangeResolver {
  constructor(private exchangeService: ExchangeService) {}

  @Query(() => Exchange)
  async exchange(@Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId) {
    return this.exchangeService.getById(_id);
  }

  @Query(() => [Exchange])
  async exchanges(@Args('filters', { nullable: true }) filters?: ListExchangeInput) {
    return this.exchangeService.list(filters);
  }

  @Mutation(() => Exchange)
  async createExchange(@Args('payload') payload: CreateExchangeInput) {
    return this.exchangeService.create(payload);
  }

  @Mutation(() => Exchange)
  async updateExchange(@Args('payload') payload: UpdateExchangeInput) {
    return this.exchangeService.update(payload);
  }

  @Mutation(() => Exchange)
  async deleteExchange(@Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId) {
    return this.exchangeService.delete(_id);
  }
}
