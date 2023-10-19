import "reflect-metadata";
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { ContaResolver } from "./resolvers/conta-resolver";
import "./connection";

import path from 'node:path';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ContaResolver],
    emitSchemaFile: path.resolve(__dirname, 'schemas.gql')
  })

  const server = new ApolloServer({
    schema
  })

  const { url } = await server.listen()
  
  console.log(`HTTP SERVER IS RUNNING ON ${url}`)
}
bootstrap()


