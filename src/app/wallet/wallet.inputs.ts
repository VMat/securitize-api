import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateWalletInput {
  @Field(() => String, { nullable: false })
  address: string;
}

@InputType()
export class ListWalletInput {
  @Field(() => String, { nullable: true })
  _id?: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => Boolean, { nullable: true })
  isFavorite?: boolean;
}

@InputType()
export class UpdateWalletInput {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  address?: string;

  @Field(() => Boolean, { nullable: true })
  isFavorite?: boolean;
}
