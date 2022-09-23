import { CreateUserUseCase } from "../modules/users/services/createUser/CreateUserUseCase";
import { SearchUserUseCase } from "../modules/users/services/searchUser/SearchUserUseCase";
import { UserRepositoryInMemory } from "./repositories/UserRepositoryInMemory";

let searchUserUseCases: SearchUserUseCase;
let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Search a user', () => {

	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
		searchUserUseCases = new SearchUserUseCase(userRepositoryInMemory);
	});

	it(" should be able to search a user by a token path id ", async () => {
		const { user } = await createUserUseCase.execute({
			name: "Test",
			email: "test@test",
			password: "test123",
			phones: [
				{
					number: "123456",
					ddd: "111"
				}
			]
		});

		const id = String(user.id);

		let result = await searchUserUseCases.execute({ id });

		expect(result).toHaveProperty("name");
	});

	it(" should not be able to search a user with a non-existent id ", async () => {
		expect(async () => {
			await createUserUseCase.execute({
				name: "Test",
				email: "test@test",
				password: "test123",
				phones: [
					{
						number: "123456",
						ddd: "111"
					}
				]
			});

			const id = "Wrong Id";

			await searchUserUseCases.execute({ id });
		}).rejects.toBeInstanceOf(Error);
	});
});