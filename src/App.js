import React from 'react';
import { compose, withHandlers, withState, pure } from 'recompose';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { connect } from 'react-redux';

const FB_APP_ID = process.env.FB_APP_ID;

// Lodash
import { get as g } from 'lodash';

// Actions
import { receiveUser, post } from 'modules/flyover/actions';

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
				geolocation: g(state, 'flyover.geolocation'),
				geolocating: g(state, 'flyover.geolocating'),
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
		geolocation,
		geolocating,
	} = props;

	console.log(props);

	if(!user) {
		return (
			<LoginScreen
				facebookLoginButtonClick={handleFacebookCallback}
			/>
		)
	}

	if(geolocating) {
		return <div>Loading...</div>
	}

	if(!geolocation) {
		return <GeolocationNotEnabledScreen />
	}

	return <GeolocationEnabledScreen />;
};

const AppScreen = withAppScreen(renderAppScreen);

export default AppScreen;
