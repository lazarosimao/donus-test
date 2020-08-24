import { TransactionRepository } from "../../../src/repositories/implementations/TransactionRepository";
import { TransactionTransferUseCase } from "./TransactionTransferUseCase";
import { TransactionTransferController } from "./TransactionTransferController";

const transactionRepository = new TransactionRepository();

const transactionTransferUseCase = new TransactionTransferUseCase(
  transactionRepository
);

const transactionTransferController = new TransactionTransferController(
  transactionTransferUseCase
);

export { transactionTransferUseCase, transactionTransferController };