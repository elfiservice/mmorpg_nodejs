function UsuariosDAO(connection) {
  this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {
  //funcai open fornecida pelo objeto mongo.Db
  this._connection.open( (err, mongoClient) => {
    //estabelecida a conexao, agora podemos manipular os docs dentro do bd
    mongoClient.collection("usuarios", (err, collection) => {
      collection.insert(usuario);

      mongoClient.close();
    });
  });
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res) {
  //funcai open fornecida pelo objeto mongo.Db
  this._connection.open( (err, mongoClient) => {
    //estabelecida a conexao, agora podemos manipular os docs dentro do bd
    mongoClient.collection("usuarios", (err, collection) => {
      collection.find(usuario).toArray(function(err, result) {
        if(result[0] != undefined) {
          //cria uma variavel de sessao de controle para usar nas paginas q usuario pode acessar
          req.session.autorizado = true;
          //salva na sessao os dados do usuario e da casa do mesmo
          req.session.usuario = result[0].usuario;
          req.session.casa = result[0].casa;
        }

        if(req.session.autorizado){
          res.redirect("jogo");
        } else {
          res.render("index", {validacao: {}, autenticacao: usuario.usuario});
        }

      });

      mongoClient.close();
    });
  });
}

module.exports = () => {
  return UsuariosDAO;
};
