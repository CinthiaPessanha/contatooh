var mongoose = require('mongoose');

// Debug
//mongoose.set('debug', true);

module.exports = function(uri) {
	mongoose.connect(uri);

	mongoose.connection.on('connected', function() {
		console.log('Mongoose! Conectado em ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose! Desconectado de ' + uri);
	});

	mongoose.connection.on('error', function(erro) {
		console.log('Mongoose! Erro na conexão: ' + erro);
	});

	// Fecha a conexão com o Mongodb quando a aplicação é fechada (CTRL + C)
	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose! Desconectado pelo término da aplicação')
			// 0 indica que a finalização ocorreu sem erros
			process.exit(0); 
		});
	});
}