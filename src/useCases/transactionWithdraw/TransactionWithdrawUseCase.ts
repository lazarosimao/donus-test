import { ITransactionRepository } from "../../../src/repositories/interfaces/ITransactionRepository";
import { ITransactionWithdrawDTO } from "./TransactionWithdrawDTO";
import { Transaction } from "../../../src/entities/Transaction";

export class TransactionWithdrawUseCase {
  constructor(
    private transactionRepository: ITransactionRepository
  ) { }
  
  async execute(data: ITransactionWithdrawDTO) {
    try {
    
      const actualBalance = await this.transactionRepository.actualBalanceIfExistsAccount(data.accountId);
      if (actualBalance === false) throw new Error("Acconut not exists");
      if (actualBalance < data.amountRequest) throw new Error("Account does not have enough balance to effect this transaction");

      const rate = data.amountRequest * 0.010;
      const total = data.amountRequest + rate;

      const transaction = new Transaction();
      transaction.accountId = data.accountId;
      transaction.type = 'withdraw';
      transaction.amountRequest = data.amountRequest;
      transaction.rateAmount = rate;
      transaction.total = data.amountRequest;

      //@ts-ignore
      const updateBalance = parseFloat(actualBalance) - total;

      await this.transactionRepository.save(transaction);
      await this.transactionRepository.updateBalanceAccount(data.accountId, updateBalance);
      
      return true;

    } catch (error) {
      return error.message;
    }
  }
}

