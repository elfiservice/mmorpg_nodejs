module.exports = (application) => {
  application.get('/jogo', (req, res) => {
    application.app.controllers.jogoCtrl.jogo(application, req, res);
  });
};
