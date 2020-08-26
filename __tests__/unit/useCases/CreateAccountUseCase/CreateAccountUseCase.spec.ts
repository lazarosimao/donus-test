import { CreateAccountUseCase } from "@src/useCases/createAccount/CreateAccountUseCase";
import { AccountRepository } from '@src/repositories/implementations/AccountRepository';
import Account from "@src/entities/Account";

const dataDTO = {
  fullName: 'Teste 1234',
  registerCpf: '23412345667'
}
const account = new Account();
account.fullName = dataDTO.fullName;
account.registerCpf = dataDTO.registerCpf;
account.balance = 0,
account.id = 999


describe('CreateAccountUseCase', () => {
  it('Should create a new account successfully', async () => {
    const accountRepository = new AccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);
    const expectedReturn = account;
    
    const mocks = {
      AccountRepository: {
        validateData: accountRepository.validateData = jest.fn().mockResolvedValue(true),
        findByCPF: accountRepository.findByCPF = jest.fn().mockResolvedValue(false),
        create: accountRepository.create = jest.fn().mockResolvedValue(expectedReturn)
      },
    } 

    const result = await createAccountUseCase.execute(dataDTO);

    expect(result.id).toBe(999);
    expect(mocks.AccountRepository.validateData).toBeCalledTimes(1);
    expect(mocks.AccountRepository.findByCPF).toBeCalledTimes(1);
    expect(mocks.AccountRepository.create).toBeCalledTimes(1);
  });

  it('Should Account creation must fail due to blank data', async () => {
    const accountRepository = new AccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);
    const expectedReturn = account;
    
    const mocks = {
      AccountRepository: {
        validateData: accountRepository.validateData = jest.fn().mockResolvedValue(false),
        findByCPF: accountRepository.findByCPF = jest.fn().mockResolvedValue(false),
        create: accountRepository.create = jest.fn().mockResolvedValue(expectedReturn)
      },
    } 

    try { 
      await createAccountUseCase.execute(dataDTO);
    } catch (err) {
      expect(err.message).toBe('The fields fullName and registerCpf are necessery to created of account');
    }

    expect(mocks.AccountRepository.validateData).toBeCalledTimes(1);
    expect(mocks.AccountRepository.findByCPF).not.toBeCalled()
    expect(mocks.AccountRepository.create).not.toBeCalled();
  });

  it('Should fail to create the account because there is already a registration for the informed cpf', async () => {
    const accountRepository = new AccountRepository();
    const createAccountUseCase = new CreateAccountUseCase(accountRepository);
    const expectedReturn = account;
    
    const mocks = {
      AccountRepository: {
        validateData: accountRepository.validateData = jest.fn().mockResolvedValue(true),
        findByCPF: accountRepository.findByCPF = jest.fn().mockResolvedValue(true),
        create: accountRepository.create = jest.fn().mockResolvedValue(expectedReturn)
      },
    } 

    try { 
      await createAccountUseCase.execute(dataDTO);
    } catch (err) {
      expect(err.message).toBe(`Already an account with cpf: ${dataDTO.registerCpf}`);
    }

    expect(mocks.AccountRepository.validateData).toBeCalledTimes(1);
    expect(mocks.AccountRepository.findByCPF).toBeCalledTimes(1);
    expect(mocks.AccountRepository.create).not.toBeCalled();
  });
});