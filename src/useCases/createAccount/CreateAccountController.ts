import { Request, Response } from "express";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

export class CreateAccountController {
  constructor(
    private createAccountUseCase: CreateAccountUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { fullName, registerCpf } = request.body;

    try {
      const result = await this.createAccountUseCase.execute({
        fullName,
        registerCpf
      });
      return response.status(201).json(result);

    } catch (error) {
      return response.status(422).json({
        message: error.message || 'Unexpected error.'
      });
    }
  } 
}