import { Request, Response } from "express";
import { BankStatementUseCase } from "./bankStatementUseCase";

export class BankStatementController {
  constructor(
    private bankStatementUseCase: BankStatementUseCase
  ) { }
  
  async handle(request: Request, response: Response): Promise<Response> { 
    try {
      const result = await this.bankStatementUseCase.execute(parseInt(request.params.account_id));
      return response.status(200).json(result);

    } catch (error) {
      return response.status(error.statusCode).json({
        message: error.message || 'Unexpected error.'
      });
    }
  }
}