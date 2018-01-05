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

UsuariosDAO.prototype.autenticar = function(usuario, res) {
  //funcai open fornecida pelo objeto mongo.Db
  this._connection.open( (err, mongoClient) => {
    //estabelecida a conexao, agora podemos manipular os docs dentro do bd
    mongoClient.collection("usuarios", (err, collection) => {
      collection.find(usuario).toArray(function(err, result) {

        if(result[0] != undefined) {
            res.redirect("jogo");
        }else{
          res.render("index", {validacao: {}});
        }

      });

      mongoClient.close();
    });
  });
}

module.exports = () => {
  return UsuariosDAO;
};
