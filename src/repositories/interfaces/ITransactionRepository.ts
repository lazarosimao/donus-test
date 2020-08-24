import { ITransactionDepositDTO } from "@src/useCases/transactionDeposit/TransactionDepositDTO";
import { Transaction } from "@src/entities/Transaction";

export interface ITransactionRepository {
  updateBalanceAccount(accountId: number, amount: number): Promise<void>;
  actualBalanceIfExistsAccount(accountId: number): Promise<number | boolean>;
  existAccount(accountId: number): Promise<boolean>;
  save(transaction: Transaction): Promise<void>;
  statementOfAccount(accountId: number): Promise<Transaction[] | boolean>;
}