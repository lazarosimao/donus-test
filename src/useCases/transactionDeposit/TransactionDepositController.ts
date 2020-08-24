import { Request, Response } from "express";
import { TransactionDepositUseCase } from "./TransactionDepositUseCase";

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
      
      return response.status(201).json({ message: result });

    } catch (error) {
      return response.status(422).json({ message: error });
    }
    
  }
}