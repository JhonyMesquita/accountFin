import "reflect-metadata";
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { ContaResolver } from "./resolvers/conta-resolver";
import ContaModel  from './model/ContaModel';
import "./connection";
import path from 'node:path';

async function firstRecord() {
  const contaInicial = {
    conta: 123,
    saldo: 1000
  } 
  const exist = await ContaModel.findOne({conta:contaInicial.conta})
  if (exist) {
    console.log('👌 Dado inicial já existente em banco 👌')
    return
  }

  try {
    await ContaModel.create(contaInicial)
    console.log('✨ Conta inicial inserida com sucesso! ✨')
  } catch(e) {
    console.error('❌ Erro ao inserir conta inicial: ❌', e)
  }
}

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ContaResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  })

  const server = new ApolloServer({
    schema
  })

  const { url } = await server.listen()
  
  console.log(`🚀🚀🚀 HTTP SERVER IS RUNNING ON 🚀🚀🚀 ${url}`)
  await firstRecord()
}

export default bootstrap()


