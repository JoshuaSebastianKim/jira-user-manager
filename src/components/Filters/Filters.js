import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filters extends Component {
	constructor(props) {
		super(props);

		this.handleNeverLoggedChange = this.handleNeverLoggedChange.bind(this);
		this.handleSinceChange = this.handleSinceChange.bind(this);
	}

	componentDidMount() {
		this.props.onNeverLoggedChange('true');
		this.props.onSinceChange('week');
	}

	handleNeverLoggedChange(e) {
		this.props.onNeverLoggedChange(e.target.value);
	}

	handleSinceChange(e) {
		this.props.onSinceChange(e.target.value);
	}


	render() {
		return (
			<div className="container-fluid">
				<div>
					<label>Desabilitar usuarios nunca logeados?</label>
					<select onChange={this.handleNeverLoggedChange}>
						<option value="true">Si</option>
						<option value="">No</option>
					</select>
				</div>

				<div>
					<label>Desabilitar usuarios sin actividad desde:</label>
					<select onChange={this.handleSinceChange}>
						<option value="week">Hace una semana</option>
						<option value="month">Hace un mes</option>
					</select>
				</div>
			</div>
		);
	}
}

Filters.propTypes = {
	onNeverLoggedChange: PropTypes.func,
	onSinceChange: PropTypes.func
};

Filters.defaultProps = {
	onNeverLoggedChange: () => undefined,
	onSinceChange: () => undefined
};

export default Filters;