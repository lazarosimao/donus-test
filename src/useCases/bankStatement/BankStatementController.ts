import { Request, Response } from "express";
import { BankStatementUseCase } from "./bankStatementUseCase";

export class BankStatementController {
  constructor(
    private bankStatementUseCase: BankStatementUseCase
  ) { }
  
  async handle(request: Request, response: Response): Promise<Response> { 
    try {
      const result = await this.bankStatementUseCase.execute(parseInt(request.param('account_id')));
      return response.status(201).json(result);

    } catch (error) {
      return response.status(422).json({
        message: error.message || 'Unexpected error.'
      });
    }
  }
}