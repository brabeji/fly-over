import React from 'react';
import { debounce } from 'lodash';
import { compose, withHandlers } from 'recompose';
import ReactSelect from 'react-select';
import axios from 'axios';

const withAirportPicker = compose(
	withHandlers(
		{
			handleQueryChange: ({ setQuery }) => debounce(
				(e) => {
					setQuery('aa');
				},
				500
			),
			handleLoadOptions: () => () => {
				axios.get().then(() => {
					debugger;
				})
			}
		}
	)
);

const renderAirportPicker = ({
	input: {
		value,
		onChange,
	},
	handleLoadOptions,
}) => {
	return (
		<div>
			<ReactSelect.Async
				multi
			    loadOptions={handleLoadOptions}
				onChange={onChange}
			    value={value}
			/>
		</div>
	)
};

const AirportPicker = withAirportPicker(renderAirportPicker);
export default AirportPicker;
