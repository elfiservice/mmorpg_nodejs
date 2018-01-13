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

JogoDAO.prototype.iniciarJogo = function(res, usuario, casa, msg) {
  this._connection.open((err, mongoClient) => {
    mongoClient.collection("jogo", (err, collection) => {
      collection.find({usuario: usuario}).toArray((err, result) => {

        res.render("jogo", {jogo_param: result[0], img_casa: casa, msg: msg});

        mongoClient.close();
      });
    });
  });
}

JogoDAO.prototype.execAcao = function(dadosDaAcao) {
  this._connection.open((err, mongoClient) => {
    mongoClient.collection("acao", (err, collection) => {
      var date = new Date();
      var tempo = null;

      switch(parseInt(dadosDaAcao.acoes)) {
        case 1: tempo = 1 * 60 * 60000; break;
        case 2: tempo = 2 * 60 * 60000; break;
        case 3: tempo = 5 * 60 * 60000; break;
        case 4: tempo = 5 * 60 * 60000; break;
      }
      //date.getTime() = instante atual em milisegundos deste 1-1-1970 até o instante em q foi executado
      // + o tempo = que é os milisegundos a mais para concluir a acao do jogo
      dadosDaAcao.acao_termina_em = date.getTime() + tempo;
      collection.insert(dadosDaAcao);

      mongoClient.close();
    });
  });
}

JogoDAO.prototype.getAcoes = function(res, usuario) {
  this._connection.open((err, mongoClient) => {
    mongoClient.collection("acao", (err, collection) => {
      collection.find({usuario: usuario}).toArray((err, result) => {

        res.render('pergaminhos', {acoes: result});

        mongoClient.close();
      });
    });
  });
}

module.exports = () => {
  return JogoDAO;
};
