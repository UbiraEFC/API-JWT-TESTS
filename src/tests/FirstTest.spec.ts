import { User } from "../models/User";

test('should be ok', () => {
	const user = new User();

	user.name = 'Bira';

	expect(user.name).toEqual('Bira');
});

test('should be Error', () => {
	const user = new User();

	user.name = 'Bir';

	expect(user.name === 'Bira').toEqual(false);
});
