const http = require('http');
const chalk = require('chalk');

const config = require('../../config');
const syncDb = require('./sync-db');
const app = require('../app');

app.server = http.createServer(app);

// App Mode setting
let host = '';
if (process.env.NODE_ENV === 'production') {
	host = config.production.host;
} else if (process.env.NODE_ENV === 'test') {
	host = config.test.host;
} else if (process.env.NODE_ENV === 'development') {
	host = config.development.host;
}
const port = process.env.PORT || config.port;

syncDb().then(() => {
	console.log(`${chalk.white.bgHex('00546B').bold(`MySQL Database running`)}`);
	app.server.listen(port, () => {
		console.log(
			`${chalk.white
				.bgHex('#8BC500')
				.bold(`${process.env.NODE_ENV} Server running at ${host}:${port}/`)}`,
		);
		console.log(
			`${chalk
				.hex('#8BC500')
				.bold('=============================================')}`,
		);
	});
});
