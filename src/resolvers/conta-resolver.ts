import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { AccountInput } from './../dtos/inputs/Account-input';
import { ContaInput } from "../dtos/inputs/conta-input";
import { Conta } from "../dtos/objectTypes/conta-types";
import ContaModel from "../model/ContaModel";

@Resolver(Conta)
export class ContaResolver {
  @Query(() => Number)
  async saldo(@Arg('data') data: AccountInput) {
    const { conta } = data
    const item = await ContaModel.findOne({conta:conta})
    if (!item) throw new Error('Conta não encontrada!')
    
    return item.saldo
    
  }

  @Mutation(() => Conta)
  async createConta(@Arg('data') data: ContaInput) {
    try {
      const conta : Conta = await ContaModel.create({
        conta: data.conta,
        saldo: data.valor
      })
      return conta;
    } catch(e) {
      throw new Error()
    }
  }

  @Mutation(() => Conta)
  async depositar(@Arg('data') data: ContaInput) {
    try {
      const { conta, valor } = data
      const item = await ContaModel.findOne({conta: conta})
      if (!item) throw new Error('Conta não encontrada')

      const novoSaldo = item.saldo + valor 
      item.saldo = novoSaldo
      item.save()
      
      const dados: Conta = {
        conta: conta,
        saldo: item.saldo
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
      const insuficiente: boolean = true
      const item = await ContaModel.findOne({conta: conta})
      if (!item) throw new Error('Conta não encontrada')

      const novoSaldo: number | boolean = item.saldo > valor 
        ? item.saldo - valor 
        : insuficiente
      
      if (novoSaldo === insuficiente) throw new Error('Saldo insuficiente')
      
      item.saldo = novoSaldo
      item.save()
      
      const dados: Conta = {
        conta: conta,
        saldo: item.saldo
      }
      return dados
    } catch(e) {
      throw new Error('Saldo insuficiente');
    }
  }
}