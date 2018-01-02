// Importar o Modulo do MongoDB
var mongo = require('mongodb');

// cria uma Função-variavel para retornar uma conexao quando necessario na APlicação
var connection = () => {
  var db = new mongo.Db(
    'got', //nome do banco de dados da aplicaçao Game of Thrones
    new mongo.Server(
      'localhost', //string com endereço do servidor
      27017, //porta de conexao padrão
      {} //objeto vazio, config adicionais
    ),
    {} //config adicionais
  );

  return db;
};

module.exports = () => {
  return connection;
};
