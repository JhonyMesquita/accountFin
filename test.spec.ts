import 'reflect-metadata'
import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { buildSchema } from 'type-graphql';
import { ContaResolver } from './src/resolvers/conta-resolver'; // Adjust the path
import ContaSchema from './src/dtos/schemas/ContaSchema'; // Adjust the path

describe('Check Account', () => {
  it('should return saldo for a valid account', async () => {
    const mockConta = {
      conta: 12345,
      saldo: 1000,
    };

    const schema = await buildSchema({
      resolvers: [ContaResolver],
    });

    const server = new ApolloServer({ schema });

    const { query } = createTestClient(server as any);

    ContaSchema.findOne = jest.fn().mockResolvedValue(mockConta);

    const GET_SALDO_QUERY = `
      query {
        saldo(data: { conta: 12345 })
      }
    `;

    const res = await query({ query: GET_SALDO_QUERY });

    expect(res.data.saldo).toBe(1000);
    expect(ContaSchema.findOne).toHaveBeenCalledWith({ conta: 12345 });
  });

  it('Must create a new account with initial balance', async () => {
    const input = {
      conta: 12345,
      valor: 1000,
    };

    const mockConta = {
      conta: input.conta,
      saldo: input.valor,
    };

    const schema = await buildSchema({
      resolvers: [ContaResolver],
    });

    const server = new ApolloServer({ schema });

    const { mutate } = createTestClient(server as any);

    ContaSchema.create = jest.fn().mockResolvedValue(mockConta);
    
    const CREATE_CONTA_MUTATION = `
      mutation {
        createConta(data: { conta: 12345, valor: 1000 }) {
          conta
          saldo
        }
      }
    `;

    const res = await mutate({ mutation: CREATE_CONTA_MUTATION });

    expect(res.data.createConta).toEqual(mockConta);
    expect(ContaSchema.create).toHaveBeenCalledWith(mockConta);
  });
  
  it('Must deposit an amount into the existing account', async () => {
    const existingConta = {
      conta: 12345,
      saldo: 1000,
    };
  
    const depositAmount = 500;
  
    const expectedConta = {
      conta: existingConta.conta,
      saldo: existingConta.saldo + depositAmount,
    };
  
    const schema = await buildSchema({
      resolvers: [ContaResolver],
    });
  
    const server = new ApolloServer({ schema });
  
    const { mutate } = createTestClient(server as any);
  
    ContaSchema.findOne = jest.fn().mockResolvedValue(existingConta);
   
    // ContaSchema.findByIdAndUpdate = jest.fn().mockResolvedValue(expectedConta);
  
    const DEPOSITAR_MUTATION = `
      mutation {
        depositar(data: { conta: 12345, valor: 500 }) {
          conta
          saldo
        }
      }
    `;
  
    const res = await mutate({ mutation: DEPOSITAR_MUTATION });
  
    expect(res.data.depositar).toEqual(expectedConta);
    expect(ContaSchema.findOne).toHaveBeenCalledWith({ conta: 12345 });
    // expect(ContaSchema.findByIdAndUpdate).toHaveBeenCalledWith(expectedConta);
  }, 10000);

  it('Must withdraw an amount from the existing account with sufficient balance', async () => {
    const existingConta = {
      conta: 12345,
      saldo: 1000,
    };
  
    const withdrawAmount = 500;
  
    const expectedConta = {
      conta: existingConta.conta,
      saldo: existingConta.saldo - withdrawAmount,
    };
  
    const schema = await buildSchema({
      resolvers: [ContaResolver],
    });
  
    const server = new ApolloServer({ schema });
  
    const { mutate } = createTestClient(server as any);
  
    ContaSchema.findOne = jest.fn().mockResolvedValue(existingConta);
  
    const SACAR_MUTATION = `
      mutation {
        sacar(data: { conta: 12345, valor: 500 }) {
          conta
          saldo
        }
      }
    `;
  
    const res = await mutate({ mutation: SACAR_MUTATION });
    expect(res.data.sacar).toEqual(expectedConta);
    expect(ContaSchema.findOne).toHaveBeenCalledWith({ conta: 12345 });
  }, 10000);

  it('Error when trying to withdraw over balance', async () => {
    const existingConta = {
      conta: 12345,
      saldo: 1000,
    };
  
    const withdrawAmount = 1500;
  
    const expectedConta = {
      conta: existingConta.conta,
      saldo: existingConta.saldo - withdrawAmount,
    };
  
    const schema = await buildSchema({
      resolvers: [ContaResolver],
    });
  
    const server = new ApolloServer({ schema });
  
    const { mutate } = createTestClient(server as any);
  
    ContaSchema.findOne = jest.fn().mockResolvedValue(existingConta);
  
    const SACAR_MUTATION = `
      mutation {
        sacar(data: { conta: 12345, valor: 1500 }) {
          conta
          saldo
        }
      }
    `;
  
    const res = await mutate({ mutation: SACAR_MUTATION });
    
    expect(res.errors).toBeDefined()
    if (res.errors) {
      expect(res.errors[0].message).toBe('Saldo insuficiente');
    } else {
      fail('Erro esperado não foi retornado');
    }
    expect(ContaSchema.findOne).toHaveBeenCalledWith({ conta: 12345 });
  }, 10000);
});
