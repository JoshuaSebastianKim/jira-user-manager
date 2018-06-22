const Jira = require('./src/classes/Jira');
const Csv = require('./src/classes/Csv');
const inquirer = require('inquirer');
const moment = require('moment');

const HOST = 'https://fizzmod.atlassian.net';
const AUTH = {
	username: process.env.USER_EMAIL,
	password: process.env.API_TOKEN
};
const questions = [{
	type: 'confirm',
	name: 'neverLogged',
	message: 'Desabilitar usuarios nunca logeados?'
}, {
	type: 'list',
	name: 'since',
	message: 'Desabilitar usuarios sin actividad desde:',
	choices: [
		{
			name: 'Hace una semana',
			value: 'week'
		}, {
			name: 'Hace un mes',
			value: 'month'
		}
	]
}];

(async () => {
	try {
		const jira = new Jira(HOST, AUTH);
		const csv = new Csv('./export-users.csv');

		const users = await csv.toJson();

		const { neverLogged, since } = await inquirer.prompt(questions);

		const now = moment();
		const threshold = moment().subtract(1, since);

		const usersToDisable = await Promise.all(users.reduce((acc, user) => {
			const lastActiveInJira = user['Last active in Jira'];
			const lastActiveDate = moment(lastActiveInJira, 'DD-MMM-YYYY');

			if (
				(neverLogged && lastActiveInJira === 'Never logged in') ||
				lastActiveDate.diff(threshold) < 0
			)
				return acc.concat([user]);

			return acc;
		}, []));

		console.log('====================================');
		console.log(`Usuarios en planilla ${users.length}`);
		console.log(`Usuarios para desabilitar ${usersToDisable.length}`);
		console.log('====================================');
		console.log(neverLogged, since);

		usersToDisable.forEach(user => {
			// console.log(user.username);
			// console.log(user['Last active in Jira']);
			// console.log('====================================');
		});
	} catch (error) {
		console.log('ERROR');
		console.log(error);
	}
})();


// alan.leal@sony.com

// alexander@fizzmod.com

// debora.gomes@vtex.com.br

// gricel.olivos@rosen.cl

// amela.corderoavaria@jumbo.cl

// l.alegriasolar@gmail.com