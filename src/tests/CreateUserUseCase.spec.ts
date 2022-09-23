import { AppError } from "../errors/AppError";
import { CreateUserUseCase } from "../modules/users/services/createUser/CreateUserUseCase";
import { UserRepositoryInMemory } from "./repositories/UserRepositoryInMemory";

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {

	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory();
		createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
	});

	it(" should be able to create a new user ", async () => {
		const user = await createUserUseCase.execute({
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

		expect(user).toHaveProperty("token");
		expect(user.user).toHaveProperty("id");
	});

	it(" should not be able to cretae a new user with an existent email ", async () => {
		expect(async () => {
			await createUserUseCase.execute({
				name: "Test1",
				email: "test@test",
				password: "test123",
				phones: [
					{
						number: "123456",
						ddd: "111"
					}
				]
			});

			await createUserUseCase.execute({
				name: "Test2",
				email: "test@test",
				password: "test123",
				phones: [
					{
						number: "123456",
						ddd: "111"
					}
				]
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});