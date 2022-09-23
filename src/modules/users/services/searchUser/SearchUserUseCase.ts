import { IUserRepository } from "../../repositories/IUserRepository";

interface ISearchResponse {
	name: string;
	email: string;
}

interface ISearchRequest {
	id: string;
}

export class SearchUserUseCase {
	constructor(
		private userRepository: IUserRepository
	) {}

	async execute({ id }: ISearchRequest): Promise<ISearchResponse> {
		const user = await this.userRepository.findById(id);

		return {
			name: user.name,
			email: user.email
		}
		
	}
}