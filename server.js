const express = require('express');
const packageInfo = require('./package.json');

const app = express();

app.get('/', (req, res) => {
	res.json({ version: packageInfo.version });
});

const server = app.listen(process.env.PORT, () => {
	const serverAddress = server.address();
	const host = process.env.IP;
	const port = process.env.PORT;

	console.log(`Server started at http://${host}:${port}`);
});