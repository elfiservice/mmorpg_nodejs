module.exports.jogo = (application, req ,res) => {
  if(req.session.autorizado != true) {
    res.send("Usuario não logado!");
    return;
  }

  var comando_invalido = 'N';
  if(req.query.comando_invalido == 'S') {
    comando_invalido = 'S';
  }


  var usuario = req.session.usuario;
  var casa = req.session.casa;
  var connection = application.config.dbConnection;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.iniciarJogo(res, usuario, casa, comando_invalido);

};

module.exports.sair = (application, req, res) => {
  req.session.destroy(function(err) {
    res.render('index', {validacao: {}});
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
  res.render('pergaminhos');
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
    res.redirect('jogo?comando_invalido=S');
    return;
  }
console.log(dadosForm);
  res.send('tudo ok!');

};
