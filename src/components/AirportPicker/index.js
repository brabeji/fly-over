import React from 'react';
import { get as g, reduce, debounce } from 'lodash';
import { compose, withProps, withHandlers } from 'recompose';
import ReactSelect from 'react-select';
import axios from 'axios';
import 'react-select/dist/react-select.css';

const withAirportPicker = compose(
	withHandlers(
		{
			handleLoadOptions: ({ ps }) => (query) => {
				if (query) {
					return axios.get(
						'http://api.geonames.org/searchJSON',
						{
							params: {
								username: 'brabeji',
								fcode: 'AIRP',
								q: query,
								style: 'FULL',
							}
						}
					).then((response) => {
						return {
							options: reduce(
								g(response, 'data.geonames', []),
								(aacc, airport) => {
									const code = reduce(g(airport, 'alternateNames', []), (acc, aname) => acc ? acc : (aname.lang === 'iata' ? aname.name : null), null);
									if (!code) {
										return aacc;
									}
									return [
										...aacc,
										{
											...airport,
											code,
										},
									];
								},
								[]
							),
						}
					});
				} else {
					return Promise.resolve({ options: [] });
				}
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
				labelKey="toponymName"
				valueKey="code"
			/>
		</div>
	)
};

const AirportPicker = withAirportPicker(renderAirportPicker);
export default AirportPicker;
