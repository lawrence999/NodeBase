// Auth check middleware

const authenticate = (req, res, next) => {
    const token = req.header('x-auth');
    try {
        //logic for checking the auth token and user info comes here
        next();
    } catch (error) {
        return res.status(401).send({ message: error.message });
    }
}

const nonAuthenticate = (req, res, next) => next();

module.exports = { authenticate, nonAuthenticate};
