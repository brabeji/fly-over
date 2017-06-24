import React from 'react';
import { compose, pure, withHandlers } from 'recompose';

// Components
import Logo from '../../components/Logo';
import Planet from '../../components/Planet';
import Button from '../../components/Button';

const withGeolocationNotEnabledScreen = compose(
	withHandlers({
		handleOnButtonClick: () => () => {
			console.log('Ask geolocation again');
		},
	}),
	pure,
);

const renderGeolocationNotEnabledScreen = (props) => {
	const {
		handleOnButtonClick,
	} = props;

	return (
		<div>
			<Logo />
			<Planet />
			<Button
				onButtonClick={handleOnButtonClick}
			>
				Ask geolocation
			</Button>
		</div>
	);
};

const GeolocationNotEnabledScreen = withGeolocationNotEnabledScreen(renderGeolocationNotEnabledScreen);

export default GeolocationNotEnabledScreen;
