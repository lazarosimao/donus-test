import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();

function validCreateAccount() {
  let valid = Joi.object({
    fullName: Joi.string().required(),
    registerCpf: Joi.string().required()
  });

  return validator.body(valid);
}

function validTransactionDepositWithdraw() {
  let valid = Joi.object({
    accountId: Joi.number().required(),
    amountRequest: Joi.number().required()
  });

  return validator.body(valid);
}

function validTransactionTransfer() {
  let valid = Joi.object({
    accountId: Joi.number().required(),
    toAccountId: Joi.number().required(),
    amountRequest: Joi.number().required()
  });

  return validator.body(valid);
}



export {
  validCreateAccount,
  validTransactionDepositWithdraw,
  validTransactionTransfer,
}