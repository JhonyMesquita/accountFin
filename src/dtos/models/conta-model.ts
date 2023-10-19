import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Conta {
  @Field()
  conta: number;
  
  @Field()
  saldo: number;
}