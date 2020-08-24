import { Request, Response } from "express";
import { TransactionWithdrawUseCase } from "./TransactionWithdrawUseCase";

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
      return response.status(201).json({ message: result });

    } catch (error) {
      return response.status(422).json({ message: error });
    }
  }
}