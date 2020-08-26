  
import request from 'supertest';
import { Connection, getRepository, getConnection, MigrationExecutor } from 'typeorm';
import createConnection from '@src/database';
import { app } from '@src/app';
import Account from '@src/entities/Account';

let connection: Connection;

describe('Transaction', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM accounts');
    await connection.query('DELETE FROM transactions');
  });

  afterAll(async () => {
    const mainConnection = getConnection();    
    const migrationExecutor = new MigrationExecutor(connection);
    const migrations = await migrationExecutor.getExecutedMigrations();
    for (let migration of migrations) {
      await connection.undoLastMigration();
    }

    await connection.close();
    await mainConnection.close();
  });

  it('Should return an account object', async () => {
    const accountRepository = getRepository(Account);

    const response = await request(app).post('/api/v1/account/create').send({
      fullName: 'Maria Teste da Silva',
      registerCpf: '1298317628'
    });

    const account = await accountRepository.findOne({
      where: {
        fullName: 'Maria Teste da Silva',
      },
    });

    expect(account).toBeTruthy();
    expect(response.status).toBe(201);
  });

  it('Should fail because of data cpf invalid', async () => {
    const response = await request(app).post('/api/v1/account/create').send({
      fullName: 'Maria Teste da Silva',
      registerCpf: ''
    });

    expect(response.text).toMatch('Error validating request body. \"registerCpf\" is not allowed to be empty.');
    expect(response.status).toBe(400);
  });

  it('Should fail because of data nome required', async () => {
    const response = await request(app).post('/api/v1/account/create').send({
      fullName: '',
      registerCpf: '1234543545'
    });

    expect(response.text).toMatch('Error validating request body. \"fullName\" is not allowed to be empty.');
    expect(response.status).toBe(400);
  });
});

