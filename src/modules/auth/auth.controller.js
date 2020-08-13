import { pick } from 'lodash';
import { User } from '../../models/user';

/**
 * @api {post} /auth Login
 * @apiName Login
 * @apiGroup Auth
 */
const login = async (req, res) => {
    const body = pick(req.body, ['email', 'password']);
    // const user = await User.findOne(body.email, body.password);
    if(!user){
        return res.status(401).send({ message:'Invalid Creds'});
    }
    
    then((user) => {
        return user.generateAuthToken()
            .then((token) => res.header('x-auth', token).return(user))
            .catch((e) => Promise.reject(e));
    }).catch((e) => {
        return res.status(401).send({ message: e.message });
    });
}

module.exports = { login };
