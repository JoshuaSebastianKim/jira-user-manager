import React, { Component } from 'react';
import moment from 'moment';
import { pick } from 'lodash';
import axios from 'axios';
import CsvInput from '../CsvInput/CsvInput';
import Filters from '../Filters/Filters';
import UserList from '../UserList/UserList';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			selectedUsers: {},
			neverLogged: true,
			since: 'month',
			isSubmitting: false,
		};

		this.whitelist = [
			'com.invisionapp.integration.jira@connect.atlassian.com',
			'com.atlassian.jira.chat@connect.atlassian.com',
			'jira-workplace-integration@connect.atlassian.com',
			'com.atlassian.servicedesk.embedded@connect.atlassian.com',
			'com.invisionapp.integration.jira@connect.atlassian.com',
			'com.atlassian.jira.chat@connect.atlassian.com',
			'jira-workplace-integration@connect.atlassian.com',
			'com.atlassian.servicedesk.embedded@connect.atlassian.com',
			'cello@connect.atlassian.com',
			'jira-sketch-integration@connect.atlassian.com',
			'jira-trello-integration@connect.atlassian.com',
		];

		this.handleCsvInputChange = this.handleCsvInputChange.bind(this);
		this.handleNeverLoggedChange = this.handleNeverLoggedChange.bind(this);
		this.handleSinceChange = this.handleSinceChange.bind(this);
		this.handleUserSelect = this.handleUserSelect.bind(this);
		this.handleDisableUsersSubmit = this.handleDisableUsersSubmit.bind(this);
	}

	getFilteredUsers(users) {
		const { neverLogged, since } = this.state;
		const threshold = moment().subtract(since, 1);
		const filteredUsers = {};

		for (let index = 0; index < users.length; index += 1) {
			const user = users[index];
			const lastActiveInJira = user['Last active in Jira'];
			const lastActiveDate = moment(lastActiveInJira, 'DD-MMM-YYYY');

			if (this.whitelist.some(email => email === user.email)) continue;

			if ((lastActiveInJira === 'Never logged in' && neverLogged) || lastActiveDate.diff(threshold) < 0) {
				if (!Object.prototype.hasOwnProperty.call(filteredUsers, user.email)) {
					filteredUsers[user.email] = pick(user, ['group_name', 'username', 'email', 'Last active in Jira']);
					filteredUsers[user.email].group_name = [filteredUsers[user.email].group_name];
				} else {
					filteredUsers[user.email].group_name.push(user.group_name);
				}
			}
		}

		return filteredUsers;
	}

	handleCsvInputChange(users) {
		this.setState({ users });
	}

	handleNeverLoggedChange(neverLogged) {
		this.setState({ neverLogged: Boolean(neverLogged) });
	}

	handleSinceChange(since) {
		this.setState({ since });
	}

	handleUserSelect(isSelected, user) {
		const { selectedUsers } = this.state;

		if (isSelected && !Reflect.has(selectedUsers, user.email)) {
			selectedUsers[user.email] = user;

			this.setState({
				selectedUsers,
			});
		} else {
			delete selectedUsers[user.email];

			this.setState({
				selectedUsers,
			});
		}
	}

	handleDisableUsersSubmit() {
		const { selectedUsers } = this.state;

		this.setState({
			isSubmitting: true,
		});

		axios.post('http://localhost:8081/users/groups/delete', {
			users: selectedUsers,
		}).then(
			() => { this.setState({ isSubmitting: false }); },
			() => { this.setState({ isSubmitting: false }); },
		);
	}

	render() {
		const { users, isSubmitting } = this.state;
		const filteredUsers = this.getFilteredUsers(users);

		return (
			<div className="container-fluid pt-3 pb-3">
				<div className="mb-3">
					<CsvInput onChange={this.handleCsvInputChange} />
				</div>
				<Filters
					onNeverLoggedChange={this.handleNeverLoggedChange}
					onSinceChange={this.handleSinceChange}
				/>
				<UserList users={Object.values(filteredUsers)} onUserSelect={this.handleUserSelect} />

				<button type="button" onClick={this.handleDisableUsersSubmit} disabled={isSubmitting}>
					{isSubmitting ?
						'Cargando...'
						: 'Aceptar'
					}
				</button>
			</div>
		);
	}
}

export default Home;