import { ITransactionRepository } from "../../../src/repositories/interfaces/ITransactionRepository";
import { Transaction, TransactionType } from "../../../src/entities/Transaction";
import { ITransactionTransferDTO } from "./TransactionTransferDTO";
import { getConnection } from "typeorm";
import { HandleErrors } from "../../usefulness/HandleErrors";

export class TransactionTransferUseCase {
  constructor(
    private transactionRepository: ITransactionRepository
  ) {}
  
  async execute(data: ITransactionTransferDTO) {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();

    const actualBalanceFrom = await this.transactionRepository.actualBalanceIfExistsAccount(data.accountId);
  
    if (actualBalanceFrom === false) { 
      throw new HandleErrors(422, 'Account not exists.');
    }

    if (actualBalanceFrom < data.amountRequest) { 
      throw new HandleErrors(422, 'Account does not have enough balance to effect this transaction');
    }
  
    const actualBalanceTo = await this.transactionRepository.actualBalanceIfExistsAccount(data.toAccountId);
    if (actualBalanceTo === false) { 
      throw new HandleErrors(422, 'To acconut not exists');
    }

    const transaction = new Transaction();
    transaction.accountId = data.accountId;
    transaction.toAccountId = data.toAccountId;
    transaction.type = TransactionType.TRANSFER;
    transaction.amountRequest = data.amountRequest;
    transaction.total = data.amountRequest;

    //@ts-ignore
    const updateBalanceFrom = parseFloat(actualBalanceFrom) - data.amountRequest;
    //@ts-ignore
    const updateBalanceTo = parseFloat(actualBalanceTo) + data.amountRequest;

    try {
      await queryRunner.startTransaction();

      await this.transactionRepository.save(transaction);
      await this.transactionRepository.updateBalanceAccount(data.accountId, updateBalanceFrom);
      await this.transactionRepository.updateBalanceAccount(data.toAccountId, updateBalanceTo);
      
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