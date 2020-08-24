import { AccountRepository } from "../../../src/repositories/implementations/AccountRepository";
import { TransactionRepository } from "../../../src/repositories/implementations/TransactionRepository";

export class BankStatementUseCase {
  constructor(
    private accountRepository: AccountRepository,
    private transactionRepository: TransactionRepository
  ) { }
  
  async execute(accountId: number) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new Error("Account not exists.");
    const transactions = await this.transactionRepository.statementOfAccount(accountId);

    const result = {
      account: account,
      transactions: transactions
    }

    return result;    
  }
}