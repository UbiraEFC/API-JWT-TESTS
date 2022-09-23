import { User } from "@prisma/client";
import crypto from "node:crypto";
import { CreateUserData, IUserRepository } from "../../modules/users/repositories/IUserRepository";


export class UserRepositoryInMemory implements IUserRepository {
	users: User[] = [];

	async create(data: CreateUserData): Promise<User> {
		const user = {
			id: crypto.randomUUID(),
			name: data.data.name,
			email: data.data.email,
			password: data.data.password,
			phones: [{
				number: data.data.phones.create[0].number,
				ddd: data.data.phones.create[0].ddd,
			}],
			created_at: new Date(),
			updated_at: new Date(),
			last_login: new Date(),
		}
		this.users.push(user);

		return user;
	}

	async findByEmail(email: string): Promise<User> {
		return this.users.find(user => user.email === email);
	}

	async findById(id: string): Promise<User> {
		return this.users.find(user => user.id === id);
	}

}