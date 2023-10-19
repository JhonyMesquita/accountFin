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
  async createConta(@Arg('data') data: ContaInput) {
    try {
      const conta = {
        conta: data.conta,
        saldo: data.valor
      }
      await ContaSchema.create(conta)
      return conta;
    } catch(e) {
      console.log('--------e', e)
    }
    
  }

  @Mutation(() => Conta)
  async depositar(@Arg('data') data: ContaInput) {
    const { conta, valor } = data
    const item = await ContaSchema.findOne({conta: conta})
    let dados = {}  
    if (item){
      item.saldo += valor
      item.save()
      dados = {
        conta: conta,
        saldo: item.saldo
      }
    }
    if (!item) throw new Error('Conta não encontrada!')
    
    return dados
  }

  @Mutation(() => Conta)
  async sacar(@Arg('data') data: ContaInput) {
    const { conta, valor } = data
    const item = await ContaSchema.findOne({conta: conta})
    let dados = {}
    if (item) {
      if (item.saldo < valor) throw new Error('Saldo insuficiente') 
      item.saldo -= valor
      item.save()
      dados = {
        conta: conta,
        saldo: item.saldo
      }
    }
    if (!item) throw new Error('Conta não encontrada!')
    return dados
  }
  
}