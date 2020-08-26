import { Request, Response } from "express";
import { TransactionDepositUseCase } from "./TransactionDepositUseCase";
import Logger from "../../usefulness/Logger";

export class TransactionDepositController { 
  constructor(
    private transactionDepositUseCase: TransactionDepositUseCase
  ) { }
  
  async handle(request: Request, response: Response): Promise<Response> {
    const {accountId, amountRequest } = request.body;
    
    try {
      const result = await this.transactionDepositUseCase.execute({
        accountId,
        amountRequest
      });
      Logger.info(`Sucesso: ${result}`);
      return response.status(201).json({ message: result });

    } catch (error) {
      Logger.error(error.message || 'Unexpected error.');

      return response.status(error.statusCode).json({
        message: error.message || 'Unexpected error.'
      });
    }
  }
}