module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.indexCtrl.index(application, req, res);
	});

	application.post('/autenticar', function(req, res){
		application.app.controllers.indexCtrl.autenticar(application, req, res);
	});

	application.get('/cadastrar', (req, res) => {
		application.app.controllers.indexCtrl.cadastrar(application, req, res);
	});
}
