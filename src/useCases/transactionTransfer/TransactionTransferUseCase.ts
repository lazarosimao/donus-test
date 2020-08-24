import { ITransactionRepository } from "../../../src/repositories/interfaces/ITransactionRepository";
import { Transaction } from "../../../src/entities/Transaction";
import { ITransactionTransferDTO } from "./TransactionTransferDTO";

export class TransactionTransferUseCase {
  constructor(
    private transactionRepository: ITransactionRepository
  ) { }
  
  async execute(data: ITransactionTransferDTO) {
    try {
      const actualBalanceFrom = await this.transactionRepository.actualBalanceIfExistsAccount(data.accountId);
      if (actualBalanceFrom === false) throw new Error("Acconut not exists");
      if (actualBalanceFrom < data.amountRequest) throw new Error("Account does not have enough balance to effect this transaction");
      
      const actualBalanceTo = await this.transactionRepository.actualBalanceIfExistsAccount(data.toAccountId);
      if (actualBalanceTo === false) throw new Error("To acconut not exists");

      const transaction = new Transaction();
      transaction.accountId = data.accountId;
      transaction.toAccountId = data.toAccountId;
      transaction.type = 'transfer';
      transaction.amountRequest = data.amountRequest;
      transaction.total = data.amountRequest;

      //@ts-ignore
      const updateBalanceFrom = parseFloat(actualBalanceFrom) - data.amountRequest;
      //@ts-ignore
      const updateBalanceTo = parseFloat(actualBalanceTo) + data.amountRequest;

      await this.transactionRepository.save(transaction);

      await this.transactionRepository.updateBalanceAccount(data.accountId, updateBalanceFrom);
      await this.transactionRepository.updateBalanceAccount(data.accountId, updateBalanceTo);
      
      return true;

    } catch (error) {
      return error.message;
    }
  }
}

