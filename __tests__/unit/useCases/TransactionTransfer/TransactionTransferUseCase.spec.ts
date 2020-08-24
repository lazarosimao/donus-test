import Account from "@src/entities/Account";
import { Transaction } from "@src/entities/Transaction";
import { TransactionRepository } from "@src/repositories/implementations/TransactionRepository";
import { TransactionTransferUseCase } from "@src/useCases/transactionTransfer/TransactionTransferUseCase";

describe('TransactionTransferUseCase', () => { 
  const transactionDTO = {
    accountId: 1,
    amountRequest: 2,
    toAccountId: 2
  }

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

  it('Deve criar uma transação de transferencia', async () => { 
    const transactionRepository = new TransactionRepository();
    const transactionTransferUseCase = new TransactionTransferUseCase(transactionRepository);

    const mocks = {
      TransactionRepository: {
        save: transactionRepository.save = jest.fn().mockResolvedValue(true),
        actualBalanceIfExistsAccount: transactionRepository.actualBalanceIfExistsAccount = jest.fn().mockResolvedValue(2.99),
        updateBalanceAccount: transactionRepository.updateBalanceAccount = jest.fn()
      }
    }

    await transactionTransferUseCase.execute(transactionDTO);

    expect(mocks.TransactionRepository.actualBalanceIfExistsAccount).toBeCalledTimes(2);
    expect(mocks.TransactionRepository.updateBalanceAccount).toBeCalledTimes(2);
    expect(mocks.TransactionRepository.save).toBeCalledTimes(1);
  });
});