import { Request, Response } from "express";
import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";



class CreateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { name, email, password, phones } = request.body;

		const prismaUserRepository = new PrismaUserRepository();
		const createuserUseCase = new CreateUserUseCase(prismaUserRepository);

		await createuserUseCase.execute({
			name, email, password, phones
		});
		return response.status(201).send()
	}
}

export { CreateUserController }