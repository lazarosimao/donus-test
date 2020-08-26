import { Request, Response } from "express";
import { TransactionWithdrawUseCase } from "./TransactionWithdrawUseCase";
import Logger from "../../usefulness/Logger";

export class TransactionWithdrawController { 
  constructor(
    private transactionWithdraw: TransactionWithdrawUseCase
  ) { }
  
  async handle(request: Request, response: Response): Promise<Response> {
    const {accountId, amountRequest } = request.body;
    
    try {
      const result = await this.transactionWithdraw.execute({
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