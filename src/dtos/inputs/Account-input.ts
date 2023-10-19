import { Field, InputType } from "type-graphql";

@InputType()
export class AccountInput {
  @Field()
  conta!: number;
}