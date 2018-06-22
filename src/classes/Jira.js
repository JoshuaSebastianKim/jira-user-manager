const JiraUser = require('./JiraUser');

class Jira {
	constructor(host, auth) {
		this.host = host;
		this.auth = auth;
		this.user = new JiraUser(host, auth);
	}
}

module.exports = Jira;
