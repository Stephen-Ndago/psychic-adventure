const Err = require('../util/Error')


module.exports.errorHandler = (err, req, res, next) => {
const message = err.message || "error";
const statusCode = err.statusCode || 500;

res.status(statusCode).json({
    message,
    statusCode
})
}
