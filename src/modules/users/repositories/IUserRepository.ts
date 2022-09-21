export interface CreateUserData {
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

export interface ICreateUserRepository {
	create(data: CreateUserData): Promise<void>;
}