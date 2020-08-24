import { CreateAccountUseCase } from "./CreateAccountUseCase";
import { AccountRepository } from "../../repositories/implementations/AccountRepository";
import { CreateAccountController } from "./CreateAccountController";

const accountRepository = new AccountRepository();

const createAccountUseCase = new CreateAccountUseCase(
  accountRepository
);

const createAccountController = new CreateAccountController(
  createAccountUseCase
);

export { createAccountUseCase, createAccountController };