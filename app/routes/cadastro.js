module.exports = function(application){
	application.get('/cadastro', function(req, res){
		application.app.controllers.cadastroCtrl.cadastro(application, req, res);
	});
}
