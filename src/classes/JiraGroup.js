const axios = require('axios');

class JiraGroup {
	constructor(host, auth) {
		this.host = host;
		this.auth = auth;
	}

	removeUser(groupname, username) {
		const url = `${this.host}/rest/api/2/group/user`;

		return axios.delete(url, {
			auth: this.auth,
			params: {
				groupname,
				username,
			},
		});
	}
}

module.exports = JiraGroup;
