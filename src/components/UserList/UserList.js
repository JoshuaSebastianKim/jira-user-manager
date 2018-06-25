import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';

class UserList extends Component {
	constructor(props) {
		super(props);

		this.handleUserSelect = this.handleUserSelect.bind(this);
	}

	handleUserSelect(isSelected, user) {
		const { onUserSelect } = this.props;

		onUserSelect(isSelected, user);
	}

	render() {
		const { users } = this.props;

		if (!users.length) {
			return null;
		}

		const keys = Object.keys(users[0]);

		return (
			<table className="table">
				<thead>
					<tr>
						<th>
							Seleccionar
						</th>
						{keys.map(key => (
							<th key={key}>
								{key}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<UserItem key={user.email} user={user} onTriggerSelect={this.handleUserSelect} />
					))}
				</tbody>
			</table>
		);
	}
}

UserList.propTypes = {
	users: PropTypes.array,
	onUserSelect: PropTypes.func,
};

UserList.defaultProps = {
	users: [],
	onUserSelect: () => undefined,
};

export default UserList;
