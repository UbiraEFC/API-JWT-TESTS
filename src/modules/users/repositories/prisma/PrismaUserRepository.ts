import { prismaClient } from "../../../../database/prismaClient";
import { CreateUserData, IUserRepository } from "../IUserRepository";


export class PrismaUserRepository implements IUserRepository {
	async create(data: CreateUserData): Promise<void> {
		await prismaClient.user.create(data);
	}
}