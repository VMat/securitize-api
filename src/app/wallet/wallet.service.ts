import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Axios from 'axios';
import { first, get, isNaN } from 'lodash';
import * as Moment from 'moment';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { Wallet, WalletDocument } from './wallet.model';
import {
  CreateWalletInput,
  ListWalletInput,
  UpdateWalletInput,
} from './wallet.inputs';

const API_KEY = 'NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY';
const API_COOLDOWN = 600;

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async create(payload: CreateWalletInput) {
    const alreadyExists = await this.walletModel.findOne({ address: payload.address });
    if (alreadyExists) {
      throw new Error("This wallet address already exists.");
    }
    const createdWallet = new this.walletModel({ ...payload, isFavorite: false });
    return createdWallet.save();
  }

  getById(_id: MongooseSchema.Types.ObjectId) {
    return this.walletModel.findById(_id).exec();
  }

  async list(filters: ListWalletInput) {
    const wallets: any = await this.walletModel.find({ ...filters }).exec();

    // GET WALLET INFO - BALANCE & TRANSACTIONS
    const rawData = await Promise.all(wallets.map((w, i) => {  
      return new Promise((res) => {
        setTimeout(() => {
          res(Promise.all([
            Promise.resolve(w),
            Axios.get( `https://api.etherscan.io/api?module=account&action=balance&address=${w.address}&tag=latest&apikey=${API_KEY}`),
            Axios.get( `https://api.etherscan.io/api?module=account&action=txlist&address=${w.address}&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`),
          ]));
        }, API_COOLDOWN * i);
      })
    }));

    // ADAPT DATA TO MODEL SCHEMA
    const decoratedData = rawData.map((d) => {
      const balance = !isNaN(Number(d[1].data.result)) ? Number(d[1].data.result) : 0;
      const firstTransaction = get(first(d[2].data.result), 'timeStamp');
      const isOld = Moment().diff(Moment.unix(firstTransaction), 'y') >= 1;
      return { ...d[0]._doc, balance, isOld };
    });

    return decoratedData;
  }

  update(payload: UpdateWalletInput) {
    return this.walletModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  delete(_id: MongooseSchema.Types.ObjectId) {
    return this.walletModel.findByIdAndDelete(_id).exec();
  }
}
