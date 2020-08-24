import { Request, Response } from "express";
import { TransactionTransferUseCase } from "./TransactionTransferUseCase";
import { transactionTransferUseCase } from ".";

export class TransactionTransferController { 
  constructor(
    private transactionTransferUseCase: TransactionTransferUseCase
  ) { }

  async handle(request: Request, response: Response): Promise<Response> { 
    const { accountId, amountRequest, toAccountId } = request.body;

    try {
      const result = await transactionTransferUseCase.execute({
        accountId, amountRequest, toAccountId
      })
      
      return response.status(201).json({ message: result });

    } catch (error) {
      return response.status(422).json({ message: error });
    }
  }
}