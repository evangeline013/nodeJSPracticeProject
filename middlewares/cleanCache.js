const { clearHash } = require('../services/cache');

module.exports = async (req, res, next) => {
    // let route handler run first
    await next();
    clearHash(req.user.id);
};