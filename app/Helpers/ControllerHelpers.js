function error(error, message) {
  if (error) {
    return {
      app_error: {
        status: error.status,
        code: error.code,
        message: message,
      },
    };
  }

  return {
    app_error: message,
  };
};

module.exports = {error};
