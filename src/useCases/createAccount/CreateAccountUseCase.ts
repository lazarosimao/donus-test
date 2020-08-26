import { IAccountRepository } from "../../repositories/interfaces/IAccountRepository"
import { ICreateAccountDTO } from "./CreateAccountDTO";
import { Account } from "../../entities/Account";
import { HandleErrors } from "../../usefulness/HandleErrors"
import { app } from "@src/app";

export class CreateAccountUseCase {
  constructor(
    private accountsRepository: IAccountRepository
  ) {}
  
  async execute(data: ICreateAccountDTO) {
    const validateData = await this.accountsRepository.validateData(data);
    if (!validateData) { 
      throw new HandleErrors(422, 'The fields fullName and registerCpf are necessery to created of account');
    }

    const accountAlreadyExists = await this.accountsRepository.findByCPF(data.registerCpf);
    if (accountAlreadyExists) {
      throw new HandleErrors(409, `Already an account with cpf: ${data.registerCpf}`);
    }
    
    const account = new Account();
    account.fullName = data.fullName;
    account.registerCpf = data.registerCpf;

    return await this.accountsRepository.create(account);
  }
}