import React from 'react';
import { compose, withHandlers, withState, pure } from 'recompose';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { connect } from 'react-redux';

const FB_APP_ID = process.env.FB_APP_ID;

// Components
import Map from './components/Map';

// Lodash
import { get as g, noop } from 'lodash';

// Actions
import { receiveUser, post, geolocate, fetchFlights } from 'modules/flyover/actions';

// Screens
import LoginScreen from './screens/LoginScreen';
import GeolocationEnabledScreen from './screens/GeolocationEnabledScreen';
import GeolocationNotEnabledScreen from './screens/GeolocationNotEnabledScreen';

const withAppScreen = compose(
	withScriptjs,
	connect(
		(state) => {
			return {
				user: g(state, 'flyover.user'),
			};
		},
	),
	withState('address', 'setAddress', 'Prague'),
    withHandlers({
		handleFacebookCallback: ({ dispatch }) => (user) => {
			dispatch(receiveUser({user}))
		},
		doPost: ({ dispatch, user }) => () => {
			dispatch(post({ data: {} }))
		},
    }),
    pure,
);

const renderAppScreen = (props) => {
	const {
		user,
		handleFacebookCallback,
		geolocation = false,
	} = props;

	if(!user) {
		return (
			<LoginScreen
				facebookLoginButtonClick={handleFacebookCallback}
			/>
		)
	}

	if(!geolocation) {
		return <GeolocationNotEnabledScreen />
	}

	return <GeolocationEnabledScreen />;
};

const AppScreen = withAppScreen(renderAppScreen);

export default AppScreen;
