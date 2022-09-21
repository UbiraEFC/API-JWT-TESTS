import { prismaClient } from "../../../../database/prismaClient";
import { CreateUserData, ICreateUserRepository } from "../IUserRepository";


export class PrismaUserRepository implements ICreateUserRepository {
	async create(data: CreateUserData): Promise<void> {
		await prismaClient.user.create({
			data
		});
	}
}