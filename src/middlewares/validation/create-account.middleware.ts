import * as Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator();
const validCreateAccount = Joi.object({
  fullName: Joi.string().required(),
  registerCpf: Joi.string().required()
});

export default validator.body(validCreateAccount);