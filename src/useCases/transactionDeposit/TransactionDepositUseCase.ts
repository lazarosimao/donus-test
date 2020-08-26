import { ITransactionDepositDTO } from "./TransactionDepositDTO";
import { ITransactionRepository } from "../../../src/repositories/interfaces/ITransactionRepository";
import { Transaction, TransactionType } from "../../../src/entities/Transaction";
import { getConnection } from "typeorm";
import { HandleErrors } from "../../usefulness/HandleErrors";
import { Calculate } from '../../usefulness/Calculate'

export class TransactionDepositUseCase {
  private calculate: Calculate;

  constructor(
    private transactionRepository: ITransactionRepository
  ) { 
    this.calculate = new Calculate();
  }
  
  async execute(data: ITransactionDepositDTO) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    
    const actualBalance = await this.transactionRepository.actualBalanceIfExistsAccount(data.accountId);
    if (actualBalance === false) { 
      throw new HandleErrors(422, 'Account not exists.');
    }

    //Calculate the deposit bonus
    const bonus = this.calculate.bonus(data.amountRequest);
    const total = data.amountRequest + bonus;

    const transaction = new Transaction();
    transaction.accountId = data.accountId;
    transaction.type = TransactionType.DEPOSIT;
    transaction.amountRequest = data.amountRequest;
    transaction.bonusAmount = bonus;
    transaction.total = total;

    //@ts-ignore
    const updateBalance = parseFloat(actualBalance) + total;
    
    try {
      await queryRunner.startTransaction();

      await this.transactionRepository.save(transaction);
      await this.transactionRepository.updateBalanceAccount(data.accountId, updateBalance);
    
      await queryRunner.commitTransaction();
      return true;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error.message;
    } finally {
      await queryRunner.release();
    }
  }
}