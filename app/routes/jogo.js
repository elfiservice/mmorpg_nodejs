module.exports = (application) => {
  application.get('/jogo', (req, res) => {
    application.app.controllers.jogoCtrl.jogo(application, req, res);
  });

  application.get('/sair', (req, res) => {
    application.app.controllers.jogoCtrl.sair(application, req, res);
  });
};
