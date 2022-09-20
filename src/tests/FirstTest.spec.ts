import { User } from "../models/User";

test('should be ok', () => {
	const user = new User();

	user.name = 'Bira';

	expect(user.name).toEqual('Bira');
});