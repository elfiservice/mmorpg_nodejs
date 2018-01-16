module.exports.jogo = (application, req ,res) => {
  if(req.session.autorizado != true) {
    res.send("Usuario não logado!");
    return;
  }

  var msg = '';
  if(req.query.msg != '') {
    msg = req.query.msg;
  }


  var usuario = req.session.usuario;
  var casa = req.session.casa;
  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.iniciarJogo(res, usuario, casa, msg);

};

module.exports.sair = (application, req, res) => {
  req.session.destroy(function(err) {
    res.render('index', {validacao: {}, autenticacao: ""});
  });
};

module.exports.suditos = (application, req, res) => {
  if(req.session.autorizado != true) {
    res.send("Usuario não logado!");
    return;
  }
  res.render('aldeoes');
};

module.exports.pergaminhos = (application, req, res) => {
  if(req.session.autorizado != true) {
    res.send("Usuario não logado!");
    return;
  }

  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.getAcoes(res, req.session.usuario);


};

module.exports.ordenar_acao_sudito = (application, req, res) => {
  if(req.session.autorizado != true) {
    res.send("Usuario não logado!");
    return;
  }

  var dadosForm = req.body;

  req.assert('acoes', 'Selecione uma opção!').notEmpty();
  req.assert('quantidade', 'Digite uma qunatidade!').notEmpty();

  var erros = req.validationErrors();
  if(erros) {
    res.redirect('jogo?msg=ERROR');
    return;
  }

  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  dadosForm.usuario = req.session.usuario;
  JogoDAO.execAcao(dadosForm);

  res.redirect('jogo?msg=OK');

};


module.exports.revogar_acao = (application, req, res) => {
  var _id = req.query;

  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  var id_acao = _id.id_acao;
  JogoDAO.remover_acao(id_acao, res);
};
