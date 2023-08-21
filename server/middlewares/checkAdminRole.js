const checkAdminRole = (request, reply) => {
  if (request.user.role !== 'admin') {
    return reply
      .code(400)
      .send({ message: 'Вы не являетесь администратором' });
  }
  
  return;
};

module.exports = {
  checkAdminRole,
};
