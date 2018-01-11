function JogoDAO (connection) {
  this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario) {
  this._connection.open( (err, mongoClient) => {
    //cria a collection JOGO caso nao exista
    mongoClient.collection("jogo", (err, collection) => {
      collection.insert({
        usuario: usuario,
        moeda: 15,
        suditos: 10,
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
      });

      mongoClient.close();
    });
  });
}

JogoDAO.prototype.iniciarJogo = function(res, usuario, casa, comando_invalido) {
  this._connection.open((err, mongoClient) => {
    mongoClient.collection("jogo", (err, collection) => {
      collection.find({usuario: usuario}).toArray((err, result) => {

        res.render("jogo", {jogo_param: result[0], img_casa: casa, comando_invalido: comando_invalido});

        mongoClient.close();
      });
    });
  });
}

module.exports = () => {
  return JogoDAO;
};
