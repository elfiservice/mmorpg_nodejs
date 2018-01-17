var ObjectID = require('mongodb').ObjectId;

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

JogoDAO.prototype.iniciarJogo = function(req, res, usuario, casa, msg) {
  this._connection.open((err, mongoClient) => {
    mongoClient.collection("jogo", (err, collection) => {
      collection.find({usuario: usuario}).toArray((err, result) => {
        req.session.moedas = result[0].moeda;
        res.render("jogo", {jogo_param: result[0], img_casa: casa, msg: msg});

        mongoClient.close();
      });
    });
  });
}

JogoDAO.prototype.execAcao = function(dadosDaAcao, req, res) {
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
    });

    mongoClient.collection("jogo", (err, collection) => {
      var moedas = null;
      switch(parseInt(dadosDaAcao.acoes)) {
        case 1: moedas = -2 * dadosDaAcao.quantidade; break;
        case 2: moedas = -3 * dadosDaAcao.quantidade; break;
        case 3: moedas = -1 * dadosDaAcao.quantidade; break;
        case 4: moedas = -1 * dadosDaAcao.quantidade; break;
      }

      var saldo_de_moedas = req.session.moedas + moedas;

      if(saldo_de_moedas < 0) {
        res.redirect('jogo?msg=saldo_insuficiente');
      } else {
        collection.update(
          {usuario: dadosDaAcao.usuario},
          {$inc: {moeda: moedas}}
        );
        res.redirect('jogo?msg=OK');
      }

      mongoClient.close();
    });
  });
}

JogoDAO.prototype.getAcoes = function(res, usuario) {
  this._connection.open((err, mongoClient) => {
    mongoClient.collection("acao", (err, collection) => {
      var date = new Date();
      var tempo_atual = date.getTime();
      collection.find({usuario: usuario, acao_termina_em: {$gt: tempo_atual}}).toArray((err, result) => {

        res.render('pergaminhos', {acoes: result});

        mongoClient.close();
      });
    });
  });
}

JogoDAO.prototype.remover_acao = function(id_acao, res) {
  this._connection.open((err, mongoClient) => {
    mongoClient.collection('acao', (err, collection) => {
      collection.remove(
        {_id: ObjectID(id_acao)}, //deve ser um OBJETO conforme esta no BD mongo
        function(err, result) {
          res.redirect('jogo?msg=acao_revogada');
          mongoClient.close();
        }
      );
    });
  });
}

module.exports = () => {
  return JogoDAO;
};
