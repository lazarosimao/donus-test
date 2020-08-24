import Account from "@src/entities/Account";
import { Transaction } from "@src/entities/Transaction";
import { TransactionRepository } from "@src/repositories/implementations/TransactionRepository";
import { BankStatementUseCase } from "@src/useCases/bankStatement/BankStatementUseCase";
import { AccountRepository } from "@src/repositories/implementations/AccountRepository";

describe('BankStatementUseCase', () => {
  const account = new Account();
  account.fullName = 'Lucas Simao';
  account.registerCpf = '234234';
  account.balance = 120,
  account.id = 999
  
  const transaction = new Transaction();
  transaction.accountId = 1;
  transaction.type = 'transfer';
  transaction.amountRequest = 200.00;
  transaction.bonusAmount = 1.00;
  transaction.total = 201.00;

  const expectedData = {
    account: account,
    transactions: transaction
  }

  it('Deve retornar a conta e as transações do cliente', async () => { 
    const transactionRepository = new TransactionRepository();
    const accountRepository = new AccountRepository();
    const bankStatementUseCase = new BankStatementUseCase(accountRepository, transactionRepository);

    const mocks = {
      TransactionRepository: {
        statementOfAccount: transactionRepository.statementOfAccount = jest.fn().mockResolvedValue(transaction)
      },
      AccountRepository: {
        findById: accountRepository.findById = jest.fn().mockResolvedValue(account)
      }
    }

    const result = await bankStatementUseCase.execute(account.id);
    
    expect(result.account).toBe(expectedData.account);
    expect(result.transactions).toBe(expectedData.transactions);
    expect(mocks.TransactionRepository.statementOfAccount).toBeCalledTimes(1);
    expect(mocks.AccountRepository.findById).toBeCalledTimes(1);
  });

});