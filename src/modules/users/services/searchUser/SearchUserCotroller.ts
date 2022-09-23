import { Request, Response } from "express";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";
import { SearchUserUseCase } from "./SearchUserUseCase";


export class SearchUserController {

	async searchUser(request: Request, response: Response): Promise<Response> {
		const { id } = request.user;

		const prismaUserRepository = new PrismaUserRepository();
		const searchUserUseCase = new SearchUserUseCase(prismaUserRepository);

		const user = await searchUserUseCase.execute({ id });

		return response.json(user);
	}
}