import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { AuthenticateUserUsecase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
	async singIn(request: Request, response: Response): Promise<Response> {
		const { email, password } = request.body;

		const prismaUserRepository = new PrismaUserRepository();
		const authenticateUserUsecase = new AuthenticateUserUsecase(prismaUserRepository);

		try {

			const userInfo = await authenticateUserUsecase.execute({
				email,
				password,
			});

			return response.status(202).json(userInfo);

		} catch (error) {

			return response.status(error.statusCode).json({ message: error.message });

		}
	}
}

export { AuthenticateUserController }