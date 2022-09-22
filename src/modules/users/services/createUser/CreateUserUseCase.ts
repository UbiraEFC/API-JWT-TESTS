import { hash } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { CreateUserData, IUserRepository } from "../../repositories/IUserRepository";

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
	}: CreateUserRequest): Promise<IUserResponseDTO> {

		try {

			existsOrError(name, 'Name is required!');
			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');
			existsOrError(phones, 'Phone is required!');
			existsOrError(! await this.userRepository.findByEmail(email), 'Email already exists!');

		} catch (msg) {

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

		const user = await this.userRepository.create(queryUser);

		const userInfo = {
			id: user.id,
			created_at: user.created_at,
			updated_at: user.updated_at,
			last_login: user.last_login
		}

		return userInfo;
	}
}