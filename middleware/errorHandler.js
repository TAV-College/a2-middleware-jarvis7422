// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Error :(");
};

module.exports = {
  errorHandler,
};
