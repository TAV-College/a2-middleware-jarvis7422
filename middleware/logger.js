const routeLogger = (req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl} IP: ${req.ip}`);
  next();
};

module.exports = {
  routeLogger,
};
