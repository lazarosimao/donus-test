import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();
const validTransactionDeposit = Joi.object({
  accountId: Joi.number().required(),
  amountRequest: Joi.number().required()
});

export default validator.body(validTransactionDeposit);