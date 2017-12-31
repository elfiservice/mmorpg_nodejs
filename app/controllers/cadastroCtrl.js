module.exports.cadastro = (application, req, res) => {
  res.render('cadastro', {validacao: {}, dadosDoForm: {}});
};

module.exports.cadastrar = (application, req, res) => {
  var dadosDoForm = req.body;

  req.assert('nome', 'Nome nao pode ser vazio!').notEmpty();
  req.assert('usuario', 'Usuario nao pode ser vazio').notEmpty();
  req.assert('senha', 'Senha nao pode ser vazia').notEmpty();
  req.assert('casa', 'Deve ser selecionada uma Casa!').notEmpty();

  var erros = req.validationErrors();
  if(erros) {
    res.render('cadastro', {validacao: erros, dadosDoForm: dadosDoForm});
    return;
  }

  res.send('OK.. Pode cadastrar');
};
