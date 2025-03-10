const sessionMiddleware = (req, res, next) => {
    next()
}

module.exports.sessionMiddleware = sessionMiddleware;