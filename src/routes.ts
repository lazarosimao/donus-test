import { Router } from "express";
import { createAccountController } from "./useCases/createAccount";
import { transactionDepositController } from "./useCases/transactionDeposit";
import { transactionWithdrawController } from "./useCases/transactionWithdraw";
import { transactionTransferController } from "./useCases/transactionTransfer";
import { bankStatementController } from "./useCases/bankStatement";
import {
  validCreateAccount, validTransactionDepositWithdraw, validTransactionTransfer
} from "./middlewares/validate-body.middleware";

const router = Router();
const basepath = '/api/v1';

router.post(`${ basepath }/account/create`, validCreateAccount(), (request, response) => {
  return createAccountController.handle(request, response);
});

router.post(`${ basepath }/transactions/deposit`, validTransactionDepositWithdraw(), (request, response) => {
  return transactionDepositController.handle(request, response);
});

router.post(`${ basepath }/transactions/withdraw`, validTransactionDepositWithdraw(), (request, response) => {
  return transactionWithdrawController.handle(request, response);
});

router.post(`${ basepath }/transactions/transfer`, validTransactionTransfer(),(request, response) => {
  return transactionTransferController.handle(request, response);
});

router.get(`${ basepath }/account/:account_id`, (request, response) => {
  return bankStatementController.handle(request, response);
});

export { router };