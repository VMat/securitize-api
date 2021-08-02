import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Wallet {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  address: string;
  
  @Field(() => Number, { nullable: true })
  @Prop()
  balance: Number;

  @Field(() => Boolean, { nullable: true })
  @Prop()
  isOld: Boolean;

  @Field(() => Boolean, { nullable: true })
  @Prop()
  isFavorite: Boolean;
}

export type WalletDocument = Wallet & Document;

export const WalletSchema = SchemaFactory.createForClass(Wallet);
