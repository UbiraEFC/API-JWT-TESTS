import { User } from "@prisma/client";
import { prismaClient } from "../../../../database/prismaClient";
import { CreateUserData, IUserRepository } from "../IUserRepository";

export class PrismaUserRepository implements IUserRepository {
	
	async create(data: CreateUserData): Promise<void> {
		await prismaClient.user.create(data);
	}
	
	async findByEmail(email: string): Promise<User | null> {
		const user = await prismaClient.user.findUnique({
			where: {
				email: email
			},
			include: {
				phones: true
			}
		});

		return user;
	}

	async findById(id: string): Promise<User | null> {
		const user = await prismaClient.user.findUnique({
			where: {
				id: id
			},
			include: {
				phones: true
			}
		});

		return user;
	}

}