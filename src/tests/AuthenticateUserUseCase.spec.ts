import { AppError } from "../errors/AppError";
import { AuthenticateUserUsecase } from "../modules/users/services/authenticateUser/AuthenticateUserUseCase"
import { CreateUserUseCase } from "../modules/users/services/createUser/CreateUserUseCase";
import { UserRepositoryInMemory } from "./repositories/UserRepositoryInMemory";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUsecase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Authenticate User', () => {
	
	beforeEach(() => {
		userRepositoryInMemory = new UserRepositoryInMemory();
		authenticateUserUseCase = new AuthenticateUserUsecase(userRepositoryInMemory);
		createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
	});

	it(" should be able to authenticate an user ", async () => {
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

		const result = await authenticateUserUseCase.execute({
			email: "test@test",
			password: "test123"
		});

		expect(result).toHaveProperty('token');
	});

	it(" should not be able to authenticate a non-existent user ", () => {
		expect(async () => {
			await authenticateUserUseCase.execute({
				email: "false@false.com",
				password: "hackerhacker"
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it(" should not be able to authenticate an incorrent password ", () => {
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
	
			await authenticateUserUseCase.execute({
				email: "test@test",
				password: "incorrectPassword"
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});