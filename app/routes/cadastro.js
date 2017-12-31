module.exports = function(application){
	application.get('/cadastro', function(req, res){
		application.app.controllers.cadastroCtrl.cadastro(application, req, res);
	});

	//vem da view cadastro.ejs do form metodo post ao enviar um cadatro
	application.post('/cadastrar', (req, res) => {
		application.app.controllers.cadastroCtrl.cadastrar(application, req, res);
	});
}
