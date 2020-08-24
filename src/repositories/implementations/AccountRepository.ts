import { IAccountRepository } from "../interfaces/IAccountRepository";
import { Account } from "../../entities/Account";
import { getConnection, getManager } from "typeorm";
import { ICreateAccountDTO } from "@src/useCases/createAccount/CreateAccountDTO";

export class AccountRepository implements IAccountRepository {
 
  constructor() {}
  
  async findById(account_id: number): Promise<Account | boolean> {
    const accountManager = getManager().getRepository(Account);
    const account = await accountManager.findOne(account_id);
    return account ? account : false;
  }

  async getBalance(account_id: number): Promise<number|boolean> {
    const accountManager = getManager().getRepository(Account);
    const account = await accountManager.findOne(account_id);
    return account ? account.balance : false;
  }

  async findByCPF(registerCpf: string): Promise<boolean> {
    const account = await getConnection()
      .createQueryBuilder()
      .select("*")
      .from(Account, "a")
      .where(`a.register_cpf = '${registerCpf}'`)
      .getCount();
    return account ? true : false;
  }

  async create(account: Account): Promise<Account> {
    return await getConnection().manager.save(account);
  }

  async updateBalance(account_id: number, amount: number): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .update(Account)
      .set({ 
          balance: amount
      })
      .where(`id = ${account_id}`)
      .execute();
  }

  async validateData(data: ICreateAccountDTO): Promise<boolean> {
    let isValidade = true;
    if (!data.fullName) {
      isValidade = false;
    }
    if (!data.registerCpf) {
      isValidade = false;
    }

    return isValidade;
  }
}