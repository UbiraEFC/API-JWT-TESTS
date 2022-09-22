import { CreateUserData, IUserRepository } from "../repositories/IUserRepository";
import { hash } from "bcryptjs";
import { AppError } from "../../../errors/AppError";
import { existsOrError } from "../../../errors/ExistsOrError";

interface CreateUserRequest {
	name: string;
	email: string;
	password: string;
	phones: [
		{
			number: string;
			ddd: string;
		}
	]
}

export class CreateUserUseCase {
	constructor(
		private userRepository: IUserRepository
	) { }

	async execute({
		name,
		email,
		password,
		phones
	}: CreateUserRequest): Promise<void> {

		try {

			existsOrError(name, 'Name is required!');
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');
			existsOrError(phones, 'Phone is required!');
			existsOrError(! await this.userRepository.findByEmail(email), 'Email already exists!');

		} catch (msg: any) {

			throw new AppError(msg);

		}

		const passwordHash = await hash(password, 8);

		const queryUser: CreateUserData = {
			data: {
				name,
				email,
				password: passwordHash,
				phones: {
					create: [...phones]
				}
			}
		}

		await this.userRepository.create(queryUser);
	}
}