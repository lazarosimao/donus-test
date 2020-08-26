import { Request, Response } from "express";
import { TransactionTransferUseCase } from "./TransactionTransferUseCase";
import { transactionTransferUseCase } from ".";
import Logger from "../../usefulness/Logger";

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