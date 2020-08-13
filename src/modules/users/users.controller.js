import {pick} from 'lodash';
import {User} from './../../models/user';

/**
 * @api {post} /users Signup user
 * @apiName Signup
 * @apiGroup Users
 */
const signup = async (req, res,) => {
	const body = pick(req.body, ['UserName', 'Email', 'Password']);
	body.Salt = "generated salt";
	const user = new User(body);
	try {
		// const userInfo = await user.save();
		return res.status(201).send({ message: "User creation success.", data : user } );
	} catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

module.exports = { signup };
