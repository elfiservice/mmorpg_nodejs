module.exports.jogo = (application, req ,res) => {
  if(req.session.autorizado) {
    res.render('jogo');
  } else {
    res.send("Usuario não logado!");
  }
};
