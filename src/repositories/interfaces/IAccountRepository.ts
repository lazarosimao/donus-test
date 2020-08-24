import { Account } from "../../entities/Account";
import { ICreateAccountDTO } from "@src/useCases/createAccount/CreateAccountDTO";

export interface IAccountRepository {
  create(account: Account): Promise<Account>;
  findByCPF(registerCpf: string): Promise<boolean>;
  findById(account_id: number): Promise<Account|boolean>;
  updateBalance(account_id: number, amount: number): Promise<void>;
  validateData(data: ICreateAccountDTO): Promise<boolean>;
  getBalance(account_id: number): Promise<number | boolean>;
}