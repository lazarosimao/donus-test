import { TransactionRepository } from "../../../src/repositories/implementations/TransactionRepository";
import { TransactionWithdrawUseCase } from "./TransactionWithdrawUseCase";
import { TransactionWithdrawController } from "./TransactionWithdrawController";

const transactionRepository = new TransactionRepository();

const transactionWithdrawUseCase = new TransactionWithdrawUseCase(
  transactionRepository
);

const transactionWithdrawController = new TransactionWithdrawController(
  transactionWithdrawUseCase
);

export { transactionWithdrawUseCase, transactionWithdrawController };
