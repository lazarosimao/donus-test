import { TransactionRepository } from "../../repositories/implementations/TransactionRepository";
import { TransactionDepositUseCase } from "./TransactionDepositUseCase";
import { TransactionDepositController } from "./TransactionDepositController";

const transactionRepository = new TransactionRepository();

const transactionDepositUseCase = new TransactionDepositUseCase(
  transactionRepository
);

const transactionDepositController = new TransactionDepositController(
  transactionDepositUseCase
);

export { transactionDepositUseCase, transactionDepositController };