module.exports.index = (application, req, res) => {
  res.render('index', {validacao: {}, autenticacao: ""});
};

module.exports.autenticar = (application, req, res) => {
  var dados = req.body;

  req.assert("usuario", "Usuario nao deve ser vazio").notEmpty();
  req.assert("senha", "Senha nao deve ser vazio").notEmpty();

  var erros = req.validationErrors();
  if(erros) {
    res.render("index", {validacao: erros, autenticacao: ""});
    return;
  }

  var connection = application.config.dbConnection;
  var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

  UsuariosDAO.autenticar(dados, req, res);


};

module.exports.cadastrar = (application, req, res) => {
  res.render('cadastro', {validacao: {}, dadosDoForm: {}});
};
