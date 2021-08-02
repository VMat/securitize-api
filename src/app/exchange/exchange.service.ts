import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Exchange, ExchangeDocument } from './exchange.model';
import {
  CreateExchangeInput,
  ListExchangeInput,
  UpdateExchangeInput,
} from './exchange.inputs';

@Injectable()
export class ExchangeService {
  constructor(
    @InjectModel(Exchange.name) private exchangeModel: Model<ExchangeDocument>,
  ) {}

  create(payload: CreateExchangeInput) {
    const createdExchange = new this.exchangeModel(payload);
    return createdExchange.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.exchangeModel.findById(_id).exec();
  }

  list(filters: ListExchangeInput) {
    return this.exchangeModel.find({ ...filters }).exec();
  }

  update(payload: UpdateExchangeInput) {
    return this.exchangeModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.exchangeModel.findByIdAndDelete(_id).exec();
  }
}
