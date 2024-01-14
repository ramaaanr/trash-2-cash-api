const generateResponse = (status, message, dataResponse) => {
  if (status == 'success') {
    return {
      status: status,
      message: message,
      data: dataResponse,
    };
  }
  return {
    status: status,
    message: message,
    error: dataResponse,
  };
};

module.exports = { generateResponse };
