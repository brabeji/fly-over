import React from 'react';
import { compose, pure, withHandlers } from 'recompose';
import { connect } from 'react-redux';

// Components
import Logo from '../../components/Logo';
import Planet from '../../components/Planet';
import Button from '../../components/Button';

// Actions
import { geolocate } from '../../modules/flyover/actions';

const withGeolocationNotEnabledScreen = compose(
	connect(),
	withHandlers({
		handleGeolocate: ({ dispatch }) => () => {
			dispatch(geolocate());
		},
	}),
	pure,
);

const renderGeolocationNotEnabledScreen = (props) => {
	const {
		handleGeolocate,
	} = props;

	return (
		<div>
			<Logo />
			<Planet />
			<Button
				onButtonClick={handleGeolocate}
			>
				Ask geolocation
			</Button>
		</div>
	);
};

const GeolocationNotEnabledScreen = withGeolocationNotEnabledScreen(renderGeolocationNotEnabledScreen);

export default GeolocationNotEnabledScreen;
