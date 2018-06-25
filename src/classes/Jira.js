const JiraUser = require('./JiraUser');
const JiraGroup = require('./JiraGroup');

class Jira {
	constructor(host, auth) {
		this.host = host;
		this.auth = auth;
		this.user = new JiraUser(host, auth);
		this.group = new JiraGroup(host, auth);
	}
}

module.exports = Jira;
