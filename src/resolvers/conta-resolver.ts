import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AccountInput } from './../dtos/inputs/Account-input';
import { ContaInput } from "../dtos/inputs/conta-input";
import { Conta } from "../dtos/models/conta-model";
import ContaSchema from "../dtos/schemas/ContaSchema";

@Resolver(Conta)
export class ContaResolver {
  @Query(() => Number)
  async saldo(@Arg('data') data: AccountInput) {
    const { conta } = data
    const item = await ContaSchema.findOne({conta:conta})
    if (item) { 
      const saldo = item.saldo
      return saldo
    }
    if (!item) throw new Error('Conta não encontrada!')

    
  }

  @Mutation(() => Conta)
  async depositar(@Arg('data') data: ContaInput) {
    try {
      const { conta, valor } = data
      const item: Conta | any = await ContaSchema.findOne({conta: conta})
      const novoSaldo = item.saldo + valor
      const dados = {
        conta: conta,
        saldo: novoSaldo
      }
      if (item instanceof ContaSchema) {
        item.saldo = novoSaldo
        item.save()
      }
      return dados
    } catch(e) {
      throw new Error()
    }
  }

  @Mutation(() => Conta)
  async sacar(@Arg('data') data: ContaInput) {
    try {
      const { conta, valor } = data
      const item: Conta | any = await ContaSchema.findOne({conta: conta})
      const novoSaldo = item.saldo > valor ? item.saldo - valor : 0
      let dados = {
        conta: conta,
        saldo: novoSaldo != 0 ? novoSaldo : item.saldo
      }
      if (novoSaldo == 0) throw new Error('Saldo insuficiente')
      if (item instanceof ContaSchema) {
        item.saldo = novoSaldo
        item.save()
      }
      return dados
    } catch(e) {
      throw new Error('Saldo insuficiente');
    }
  }
}