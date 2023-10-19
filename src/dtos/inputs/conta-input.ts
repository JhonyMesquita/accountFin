import { Field, InputType } from "type-graphql";

@InputType()
export class ContaInput {
  @Field()
  conta!: number;

  @Field()
  valor!: number;
}