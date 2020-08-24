import Account from "@src/entities/Account";
import { Transaction } from "@src/entities/Transaction";
import { TransactionRepository } from "@src/repositories/implementations/TransactionRepository";
import { TransactionDepositUseCase } from "@src/useCases/transactionDeposit/TransactionDepositUseCase";
import { createConnection, getConnection, QueryRunner } from "typeorm";

describe('TransactionDepositUseCase', () => { 
  const transactionDTO = {
    accountId: 999,
    amountRequest: 200
  }

  const account = new Account();
  account.fullName = 'Lucas Simao';
  account.registerCpf = '234234';
  account.balance = 120,
  account.id = 999
  
  const transaction = new Transaction();
  transaction.accountId = 1;
  transaction.type = 'deposit';
  transaction.amountRequest = 200.00;
  transaction.bonusAmount = 1.00;
  transaction.total = 201.00;
  
  
  it('Deve criar uma transação de deposito', async () => {
    const transactionRepository = new TransactionRepository();
    const transactionDepositUseCase = new TransactionDepositUseCase(transactionRepository);
    
    const mocks = {
      TransactionRepository: {
        save: transactionRepository.save = jest.fn().mockResolvedValue(true),
        actualBalanceIfExistsAccount: transactionRepository.actualBalanceIfExistsAccount = jest.fn().mockResolvedValue(2.99),
        updateBalanceAccount: transactionRepository.updateBalanceAccount = jest.fn()
      }
    }

    await transactionDepositUseCase.execute(transactionDTO);

    expect(mocks.TransactionRepository.actualBalanceIfExistsAccount).toBeCalledTimes(1);
    expect(mocks.TransactionRepository.updateBalanceAccount).toBeCalledTimes(1);
    expect(mocks.TransactionRepository.save).toBeCalledTimes(1);
  });
});