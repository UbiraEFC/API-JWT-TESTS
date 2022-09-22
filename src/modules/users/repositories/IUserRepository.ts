export interface CreateUserData {
	data: {
		name: string;
		email: string;
		password: string;
		phones: {
			create: [{
				number: string;
				ddd: string;
			}]
		}
	}
}

export interface IUserRepository {
	create(data: CreateUserData): Promise<void>;
}