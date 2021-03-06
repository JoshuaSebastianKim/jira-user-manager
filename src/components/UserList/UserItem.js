import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class UserItem extends Component {
	componentDidMount() {
		const { user, onTriggerSelect } = this.props;

		this.checkbox.checked = true;

		onTriggerSelect(true, user);
	}

	componentWillUnmount() {
		const { user, onTriggerSelect } = this.props;

		onTriggerSelect(false, user);
	}

	render() {
		const { user, onTriggerSelect } = this.props;

		return (
			<tr>
				<td>
					<input
						type="checkbox"
						ref={(input) => { this.checkbox = input; }}
						onChange={e => onTriggerSelect(e.target.checked, user)}
					/>
				</td>
				{Object.entries(user).map(([key, value]) => {
					if (key === 'group_name') {
						return <td dangerouslySetInnerHTML={{ __html: value.join('<br />') }} />;
					}

					if (key === 'Last active in Jira' && value !== 'Never logged in') {
						return (
							<td>
								{value} - {moment(value, 'DD-MMM-YYYY').fromNow()}
							</td>
						)
					}

					return (
						<td>
							{value}
						</td>
					);
				})}
			</tr>
		);
	}
}

UserItem.propTypes = {
	user: PropTypes.object.isRequired,
	onTriggerSelect: PropTypes.func,
};

UserItem.defaultProps = {
	onTriggerSelect: () => undefined,
};

export default UserItem;
