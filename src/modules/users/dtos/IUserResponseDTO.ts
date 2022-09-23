export interface IUserResponseDTO {
	user: {
		id: String;
		created_at: Date;
		updated_at: Date;
		last_login: Date;
	};
	token: string;
}