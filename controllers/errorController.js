const errorHandler = error => {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || 'Internal Server Error';
  return {
    statusCode,
    error: {
      status: statusCode,
      message: errorMessage,
    },
  };
};

module.exports = errorHandler;
