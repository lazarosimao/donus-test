import { ITransactionRepository } from "../../../src/repositories/interfaces/ITransactionRepository";
import { ITransactionWithdrawDTO } from "./TransactionWithdrawDTO";
import { Transaction, TransactionType } from "../../../src/entities/Transaction";
import { getConnection } from "typeorm";
import { HandleErrors } from "../../usefulness/HandleErrors";
import { Calculate } from '../../usefulness/Calculate'

export class TransactionWithdrawUseCase {
  private calculate: Calculate;

  constructor(
    private transactionRepository: ITransactionRepository
  ) { 
    this.calculate = new Calculate();
  }
  
  async execute(data: ITransactionWithdrawDTO) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();

    const actualBalance = await this.transactionRepository.actualBalanceIfExistsAccount(data.accountId);
    if (actualBalance === false) {
      throw new HandleErrors(422, "Account not exists");
    } 
    if (actualBalance < data.amountRequest) {
      throw new HandleErrors(409, "Account does not have enough balance to effect this transaction");
    } 

    const rate = this.calculate.rate(data.amountRequest);
    const total = data.amountRequest;

    const transaction = new Transaction();
    transaction.accountId = data.accountId;
    transaction.type = TransactionType.WITHDRAW;
    transaction.amountRequest = data.amountRequest;
    transaction.rateAmount = rate;
    transaction.total = data.amountRequest;

    //@ts-ignore
    const updateBalance = parseFloat(actualBalance) - total;

    try {
      await queryRunner.startTransaction();

      await this.transactionRepository.save(transaction);
      await this.transactionRepository.updateBalanceAccount(data.accountId, updateBalance);
      
      await queryRunner.commitTransaction();
      return true;

    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw new HandleErrors(error.statusCode, error.message);
      
    } finally {
      await queryRunner.release();
    }
  }
}

