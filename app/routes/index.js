module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.indexCtrl.index(application, req, res);
	});

	application.post('/autenticar', function(req, res){
		application.app.controllers.indexCtrl.autenticar(application, req, res);
	});
}
