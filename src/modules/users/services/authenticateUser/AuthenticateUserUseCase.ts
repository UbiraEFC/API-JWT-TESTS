import { compare } from "bcryptjs";
import { AppError } from "../../../../errors/AppError";
import { existsOrError } from "../../../../errors/ExistsOrError";
import { IUserResponseDTO } from "../../dtos/IUserResponseDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

interface AuthenticateUserRequest {
	email: string;
	password: string;
}

export class AuthenticateUserUsecase {
	constructor(
		private userRepository: IUserRepository
	) { }

	async execute({ email, password }: AuthenticateUserRequest): Promise<IUserResponseDTO> {

		const user = await this.userRepository.findByEmail(email);
		const passwordMatch = await compare(password, user.password);

		try {

			existsOrError(email, 'Email is required!');
			existsOrError(password, 'Password is required!');
			// existsOrError(user, 'Email or password incorrect!');
			// existsOrError(passwordMatch, 'Email or password incorrect!');

		} catch (msg) {

			throw new AppError(msg);

		}

		const tokenReturn = {
			id: user.id,
			created_at: user.created_at,
			updated_at: user.updated_at,
			last_login: user.last_login
		}

		return tokenReturn;

	}
}