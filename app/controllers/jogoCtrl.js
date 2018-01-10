module.exports.jogo = (application, req ,res) => {
  if(req.session.autorizado != true) {
    res.send("Usuario não logado!");
    return;
  }

  var usuario = req.session.usuario;
  var casa = req.session.casa;
  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.iniciarJogo(res, usuario, casa);

};

module.exports.sair = (application, req, res) => {
  req.session.destroy(function(err) {
    res.render('index', {validacao: {}});
  });
};
