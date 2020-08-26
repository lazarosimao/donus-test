  
import request from 'supertest';
import { Connection, getRepository, getConnection, MigrationExecutor } from 'typeorm';
import createConnection from '@src/database';
import { app } from '@src/app';
import { AccountRepository } from '@src/repositories/implementations/AccountRepository';
import Account from '@src/entities/Account';

let connection: Connection;
let accountRepository: AccountRepository;
describe('Transaction', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    accountRepository = new AccountRepository();
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

  it('Should create a transaction of deposit', async () => {
    const account = new Account();
    account.fullName = 'João da Silva';
    account.registerCpf = '12345678';
    account.balance = 1000.50;
    await accountRepository.create(account);
    
    const response = await request(app).post('/api/v1/transactions/deposit').send({
      accountId: account.id,
      amountRequest: 1000.00
    });

    const balanceNow = await accountRepository.getBalance(account.id); 
    expect(response.status).toBe(201);
  });

  it('Should create a transaction of withdraw', async () => {
    const account = new Account();
    account.fullName = 'Maria da Silva';
    account.registerCpf = '987665432';
    account.balance = 500.00;
    await accountRepository.create(account);

    const response = await request(app).post('/api/v1/transactions/withdraw').send({
      accountId: account.id,
      amountRequest: 400.00
    });

    const balanceNow = await accountRepository.getBalance(account.id);

    expect(balanceNow).toBe(100.00);
    expect(response.status).toBe(201);
  });

  it('Should create a transaction of transfer', async () => {
    const accountFrom = new Account();
    accountFrom.fullName = 'Maria da Silva';
    accountFrom.registerCpf = '987665432';
    accountFrom.balance = 258.00;
    await accountRepository.create(accountFrom);

    const accountTo = new Account();
    accountTo.fullName = 'João da Silva';
    accountTo.registerCpf = '987665432';
    accountTo.balance = 100.00;
    await accountRepository.create(accountTo);

    const response = await request(app).post('/api/v1/transactions/transfer').send({
      accountId: accountFrom.id,
      toAccountId: accountTo.id,
      amountRequest: 150.00
    });

    const balanceNowFrom = await accountRepository.getBalance(accountFrom.id);
    const balanceNowTo = await accountRepository.getBalance(accountTo.id);

    expect(balanceNowFrom).toBe(108.00);  
    expect(balanceNowTo).toBe(250.00);
    expect(response.status).toBe(201);
  });
});
