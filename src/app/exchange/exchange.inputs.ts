import { Schema as MongooseSchema } from 'mongoose';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateExchangeInput {
  @Field(() => String)
  name: string;
  
  @Field(() => Number)
  rate: number;
}

@InputType()
export class ListExchangeInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;
  
  @Field(() => Number, { nullable: true })
  rate?: number;
}

@InputType()
export class UpdateExchangeInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Number, { nullable: true })
  rate?: number;
}
