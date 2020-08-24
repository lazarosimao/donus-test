import { ITransactionDepositDTO } from "./TransactionDepositDTO";
import { ITransactionRepository } from "../../../src/repositories/interfaces/ITransactionRepository";
import { Transaction } from "../../../src/entities/Transaction";

export class TransactionDepositUseCase {
  constructor(
    private transactionRepository: ITransactionRepository
  ) { }
  
  async execute(data: ITransactionDepositDTO) {
    try {
      const actualBalance = await this.transactionRepository.actualBalanceIfExistsAccount(data.accountId);
      if (actualBalance === false) throw new Error("Acconut not exists");

      //Calculate the deposit bonus
      const bonus = data.amountRequest * 0.005;
      const total = data.amountRequest + bonus;

      const transaction = new Transaction();
      transaction.accountId = data.accountId;
      transaction.type = 'deposit';
      transaction.amountRequest = data.amountRequest;
      transaction.bonusAmount = bonus;
      transaction.total = total;

      //@ts-ignore
      const updateBalance = parseFloat(actualBalance) + total;
    
      await this.transactionRepository.save(transaction);
      await this.transactionRepository.updateBalanceAccount(data.accountId, updateBalance);
      
      return true;

    } catch (error) {
      return error.message;
    }
  }
}