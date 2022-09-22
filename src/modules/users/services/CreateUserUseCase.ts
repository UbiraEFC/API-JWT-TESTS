import { User } from "../../../modelsTests/User";
import { CreateUserData, IUserRepository } from "../repositories/IUserRepository";

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
		private userrepository: IUserRepository
	) { }



	async execute({ name, email, password, phones }: CreateUserRequest) {

		const queryUser: CreateUserData = {
			data: {
				name,
				email,
				password,
				phones: {
					create: [...phones]
				}
			}
		}
		await this.userrepository.create( queryUser );
	}
}