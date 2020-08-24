import { ITransactionRepository } from "../interfaces/ITransactionRepository";
import { Transaction } from "../../../src/entities/Transaction";
import { getManager, getConnection, getRepository } from "typeorm";
import { AccountRepository } from "./AccountRepository";

export class TransactionRepository implements ITransactionRepository {
  async updateBalanceAccount(accountId: number, amount: number): Promise<void> { 
    const accountRepository = new AccountRepository();
    await accountRepository.updateBalance(accountId, amount);
  }
  
  async actualBalanceIfExistsAccount(accountId: number): Promise<number|boolean> { 
    const accountRepository = new AccountRepository();
    return await accountRepository.getBalance(accountId);
  }
  
  async save(transaction: Transaction): Promise<void> {
    const repository = getConnection().getRepository(Transaction);
    await repository.save(transaction);
  }

  async existAccount(accountId: number): Promise<boolean> {
    const accountRepository = new AccountRepository();
    const account = await accountRepository.findById(accountId);
    return account ? true : false;
  }

  async statementOfAccount(accountId: number): Promise<Transaction[] | boolean> {
    const repository = getConnection().getRepository(Transaction);
    
    return await repository.find({
      where: {
        accountId: accountId
      },
      order: {
        id: "DESC"
      }
    }) || false;
    
  }
}