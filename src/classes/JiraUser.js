const axios = require('axios');

class JiraUser {
	constructor(host, auth) {
		this.host = host;
		this.auth = auth;
	}

	getGroups(username) {
		const url = `${this.host}/rest/api/2/user/groups`;

		return axios.get(url, {
			auth: this.auth,
			params: {
				username,
			},
		});
	}
}

module.exports = JiraUser;
