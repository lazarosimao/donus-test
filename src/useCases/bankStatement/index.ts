import { AccountRepository } from "../../../src/repositories/implementations/AccountRepository";
import { TransactionRepository } from "../../../src/repositories/implementations/TransactionRepository";
import { BankStatementUseCase } from "./BankStatementUseCase";
import { BankStatementController } from "./BankStatementController";

const accountRepository = new AccountRepository();
const transactionRepository = new TransactionRepository();

const bankStatementUseCase = new BankStatementUseCase(
  accountRepository,
  transactionRepository
);

const bankStatementController = new BankStatementController(
  bankStatementUseCase
);

export { bankStatementUseCase, bankStatementController }; 