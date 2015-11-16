var config = require('./config')();

exports.config = {
	sauceUser: config.sauceUser,
	sauceKey: config.sauceKey,
	capabilities: {
		'name': config.sauceTestName,
		'browserName': 'chrome',
		'tunnel-identifier': config.travisJobNumber,
		'build': config.travisBuild
	},
	
	specs: ['../test/e2e/**/*.js'],

	onPrepare: function() {
		browser.driver.get('http://localhost:3000/#/auth');
		browser.driver.findElement(by.id('entrar'))
			.click();
		// Login no GitHub
		browser.driver.findElement(by.id('login_field'))
			.sendKeys(config.seleniumUser);
		browser.driver.findElement(by.id('password'))
			.sendKeys(config.seleniumUserPassword);
		browser.driver.findElement(by.name('commit'))
			.click();
	}

}
