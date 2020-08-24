import { CreateAccountController } from "@src/useCases/createAccount/CreateAccountController";
import { AccountRepository } from "@src/repositories/implementations/AccountRepository";
import { CreateAccountUseCase } from "@src/useCases/createAccount/CreateAccountUseCase";
import { request, response } from "express";




describe('CreateAccountController', () => { 
  const accountRepository = new AccountRepository();
  const createAccountUseCase = new CreateAccountUseCase(accountRepository);
  const createAccountController = new CreateAccountController(createAccountUseCase);

  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('Deve responder uma requisicao com sucesso', async () => {

    const mocks = {
      Request: {
        method: request.method,
        url: request.url, 
        body: request.body = jest.fn().mockResolvedValue({
          fullName: 'Lazaro 1243',
          registerCpf: '123456321'
        }),
      },
      Response: {
        json: jest.isMockFunction(jest.fn()),
        status: response.status = jest.fn().mockResolvedValue(200)
      }
    } 
    
    console.log(mocks.Response)
    
    const result = await createAccountController.handle(request, response);
    console.log(result);
    
    
    expect(mocks.Request).toHaveBeenCalledTimes(1);
    expect(mocks.Response.json).toHaveBeenCalledTimes(1);
    expect(mocks.Response).toHaveBeenCalledTimes(1);
  });
});