import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allSelected: false
		};

		this.handleUserSelect = this.handleUserSelect.bind(this);
		this.handleSelectAll = this.handleSelectAll.bind(this);
	}

	handleUserSelect(user) {
		return event => {
			this.props.onUserSelect(event.target.checked, user);
		};
	}

	handleSelectAll() {
		this.setState({ allSelected: !this.state.allSelected }, () => {
			this.props.users.forEach(user => {
				this.props.onUserSelect(this.state.allSelected, user);
			});
		});
	}

	render() {
		return (
			<table className="container-fuild">
				<thead>
					<tr>
						{this.props.users.length > 0 && (
							<React.Fragment>
								<th>
									<button onClick={this.handleSelectAll}>
										Seleccionar
									</button>
								</th>
								{Object.keys(this.props.users[0]).map(key => (
									<th key={key}>{key}</th>
								))}
							</React.Fragment>
						)}
					</tr>
				</thead>
				<tbody>
					{this.props.users.map(user => (
						<tr>
							<td>
								<input
									type="checkbox"
									name="disableUser"
									checked={this.state.allSelected}
									onChange={this.handleUserSelect(user)}
								/>
							</td>
							{Object.values(user).map(value => (
								<td>{value}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

UserList.propTypes = {
	users: PropTypes.array,
	onUserSelect: PropTypes.func
};

UserList.defaultProps = {
	users: [],
	onUserSelect: () => undefined
};

export default UserList;
