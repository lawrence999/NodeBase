import { ValidationError } from 'express-validation';

/**
 * Every error code should have a corresponding error message entry in ERROR_MESSAGES object
 */
export const ERROR_CODES = {
  REVERT: {
    FORBIDDEN: 'Revert: forbidden',
  },
  NOT_FOUND: {
    ORGANIZATION: 'organization_not_found',
  },
  FORBIDDEN: 'forbidden',
  COULD_NOT_CONNECT: 'could_not_connect',
};

export const ERROR_MESSAGES = {
  'Revert: forbidden': 'Did not have permission to do that action',
  forbidden: 'Did not have permission to do that action',
  could_not_connect: 'Was unable to connect to external service',
  organization_not_found: 'Organization not found',
};

/**
 * Handle application errors.
 *
 * NOTE: 500 status code is returned by default.
 *
 * To properly leverage this middleware, rather than return responses in your routes,
 * simply set a response status in the route and then pass the error object to `next`.
 * This middleware will catch that error and handle it in a consistent way across
 * the entire application. For example:
 *
 *     try {
 *       // look up something here
 *     } catch (err) {
 *       res.status(404);
 *       return next(err);
 *     }
 *
 * The reason it has to be done this way is because all of our routes are
 * asynchronous promises, and express won't be able to catch them unless
 * we explicitly catch & pass them along with `next`.
 *
 * @see {@link https://expressjs.com/en/guide/error-handling.html}
 */
export function defaultErrorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ValidationError) {
    // Errors have "field" value as an array, we want to reshape to string.
    const reshapedErrors = err.errors.map(error => {
      const reshaped = error;
      [reshaped.field] = error.field;
      return reshaped;
    });

    return res.status(422).send({ message: 'Validation failed', errors: reshapedErrors });
  }

  console.error(err);

  const message = ERROR_MESSAGES[err.message] || err.message;
  // if code is undefined express won't return it in the response
  const code = err.code || (ERROR_MESSAGES[err.message] && err.message);
  return res.status((res.statusCode > 200 && res.statusCode) || 500).send({ message, code });
}

/**
 * Middleware to validate content type.
 *
 * @param {Request} req - HTTP request object.
 * @param {Response} res - HTTP response object.
 * @param {function} next - Callback argument to the middleware function.
 */
export function validateContentType(req, res, next) {
  if (req.method !== 'GET' && req.headers['content-type'] !== 'application/json') {
    res.status(400).json({ message: 'Body should be a JSON object' });
  } else {
    next();
  }
}

/**
 * Validates that the client sent proper formatted JSON in the request.
 *
 * NOTE: Should be placed directly after the bodyParser middleware runs.
 *
 * @param {Error} err - Possible request error.
 * @param {Request} req - HTTP request object.
 * @param {Response} res - HTTP response object.
 * @param {function} next - Callback argument to the middleware function.
 */
export function validateJSONSyntax(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400) {
    res.status(400).json({ message: 'Problems parsing JSON' });
  }

  return next();
}
