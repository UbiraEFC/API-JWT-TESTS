import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";



class CreateUserController {
	async signUp(request: Request, response: Response): Promise<Response> {
		const { name, email, password, phones } = request.body;

		const prismaUserRepository = new PrismaUserRepository();
		const createuserUseCase = new CreateUserUseCase(prismaUserRepository);

		try {

			const userInfo = await createuserUseCase.execute({
				name, 
				email, 
				password, 
				phones
			});

			return response.status(201).json(userInfo);

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });

		}
	}
}

export { CreateUserController }