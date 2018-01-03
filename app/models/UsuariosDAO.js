function UsuariosDAO(connection) {
  this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {
  //funcai open fornecida pelo objeto mongo.Db
  this._connection.open( (err, mongoClient) => {
    //estabelecida a conexao, agora podemos manipular os docs dentro do bd
    mongoClient.collection("usuarios", (err, collection) => {
      collection.insert(usuario);
    });
  });
}

module.exports = () => {
  return UsuariosDAO;
};
