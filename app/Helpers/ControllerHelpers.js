function message(message, data) {
  if (data) {
    return {message, data};
  }
  return {message}
};

module.exports = {message};
