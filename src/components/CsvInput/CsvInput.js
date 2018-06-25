import React, { Component } from 'react';
import csvParse from 'csv-parse';
import PropTypes from 'prop-types';

class CsvInput extends Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		const { onChange } = this.props;
		const reader = new FileReader();
		const [file] = e.target.files;

		reader.onload = () => {
			csvParse(reader.result, { columns: true }, (err, output) => {
				onChange(output);
			});
		};

		reader.readAsText(file);
	}

	render() {
		return (
			<input
				type="file"
				name="csv"
				accept="text/csv"
				onChange={this.handleChange}
			/>
		);
	}
}

CsvInput.propTypes = {
	onChange: PropTypes.func,
};

CsvInput.defaultProps = {
	onChange: () => undefined,
};

export default CsvInput;
