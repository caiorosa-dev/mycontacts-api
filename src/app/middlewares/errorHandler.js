module.exports = (error, request, response, next) => {
  console.log('#### ERROR HANDLER ####');
  console.error(error);
  response.sendStatus(500);
};
