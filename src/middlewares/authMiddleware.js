const jwt = require('../lib/jsonwebtoken');
const config = require('../config');

exports.authentication = async (req, res, next) => {

    const token = req.cookies['auth'];

    if (token) {
        try {

            const decodedToken = await jwt.verify(token, config.SECRET);

            req.user = decodedToken;
            res.locals.isAuthenticated = true;
            res.locals.user = decodedToken;

        } catch (err) {
            res.clearCookie('auth');
            res.status(401).redirect('/404');
        }

    }

    next();

}

exports.isAuthorized = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }


  next();

}