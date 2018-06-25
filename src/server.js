
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersGroupsController = require('./controllers/usersGroups');
const Jira = require('./classes/Jira');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.set('views', './src/views');
app.set('view engine', 'pug');
app.use(express.static('dist'));

app.use((req, res, next) => {
	req.jira = new Jira(
		process.env.HOST,
		{
			username: process.env.USER_EMAIL,
			password: process.env.API_TOKEN,
		},
	);

	next();
});

app.use('/users/groups', usersGroupsController);

app.listen(process.env.API_PORT, () => {
	console.log(`API Server running on port ${process.env.API_PORT}`);
});
