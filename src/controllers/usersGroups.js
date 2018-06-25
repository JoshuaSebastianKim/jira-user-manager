const express = require('express');

const router = express.Router();

router.post('/delete', (req, res) => {
	const { jira } = req;
	const { users } = req.body;

	Promise.all(
		Object.values(users).map(({ username, group_name: groups }) =>
		Promise.all(
			groups.map(group =>
				jira.group.removeUser(group, username)
					.then(
						() => `${username} OK`,
						err => err.response.data.errorMessages
					)
				)
			)
		)
	)
		.then(responses => res.send(responses))
		.catch((err) => { throw new Error(err); });
});

module.exports = router;