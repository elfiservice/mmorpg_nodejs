module.exports = (application) => {
  application.get('/jogo', (req, res) => {
    application.app.controllers.jogoCtrl.jogo(application, req, res);
  });

  application.get('/sair', (req, res) => {
    application.app.controllers.jogoCtrl.sair(application, req, res);
  });

  application.get('/suditos', (req, res) => {
    application.app.controllers.jogoCtrl.suditos(application, req, res);
  });

  application.get('/pergaminhos', (req, res) => {
    application.app.controllers.jogoCtrl.pergaminhos(application, req, res);
  });

  application.post('/ordenar_acao_sudito', (req, res) => {
    application.app.controllers.jogoCtrl.ordenar_acao_sudito(application, req, res);
  });
};
