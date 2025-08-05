async function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;

  //mongo Bad Id
  if (err.name === "CastError") {
    error.message = "Resource not found";
    error.statusCode = 404;
  }

  //mongo duplicate key
  if (err.code === 11000) {
    error.message = "Duplicate key error";
    error.statusCode = 400;
  }

  //mongo validation error
  if (err.name === "ValidationError") {
    error.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error.statusCode = 400;
  }

  //JWT ERRORS

  if (err.name === "JsonWebTokenError") {
    (error.message = "Invalid token"), (error.statusCode = 401);
  }

  if (err.name === "TokenExpiredError") {
    error.message = "Your session has expired. Please log in again";
    error.statusCode = 401;
  }

  res.status(error.statusCode || 500).send({
    success: false,
    message: error.message || "Server Error",
  });
}


export default errorHandler