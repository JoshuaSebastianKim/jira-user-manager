import React, { Component } from 'react';
import moment from 'moment';
import { pick } from 'lodash';
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
			since: 'week'
		};

		this.handleCsvInputChange = this.handleCsvInputChange.bind(this);
		this.handleNeverLoggedChange = this.handleNeverLoggedChange.bind(this);
		this.handleSinceChange = this.handleSinceChange.bind(this);
		this.handleUserSelect = this.handleUserSelect.bind(this);
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

	getFilteredUsers(users) {
		const threshold = moment().subtract(this.state.since, 1);
		const filteredUsers = users.reduce((acc, user) => {
			const lastActiveInJira = user['Last active in Jira'];
			const lastActiveDate = moment(lastActiveInJira, 'DD-MMM-YYYY');

			if (
				(lastActiveInJira === 'Never logged in' && this.state.neverLogged) ||
				lastActiveDate.diff(threshold) < 0
			)
				return acc.concat([pick(user, ['group_name', 'username', 'full_name', 'email', 'Last active in Jira'])]);

			return acc;
		}, []);

		return filteredUsers;
	}

	handleUserSelect(isSelected, user) {
		console.log(isSelected, user);
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row justify-content-md-center">
					<div className="col-md-auto">
						<CsvInput onChange={this.handleCsvInputChange} />
					</div>
				</div>
				<Filters
					onNeverLoggedChange={this.handleNeverLoggedChange}
					onSinceChange={this.handleSinceChange}
				/>
				<UserList users={this.getFilteredUsers(this.state.users)} onUserSelect={this.handleUserSelect} />
			</div>
		);
	}
}

export default Home;