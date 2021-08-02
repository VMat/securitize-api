import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema()
export class Exchange {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => Number)
  @Prop()
  rate: number;
}

export type ExchangeDocument = Exchange & Document;

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
