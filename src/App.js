import React from 'react';
import { compose, withHandlers, withState, pure } from 'recompose';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { connect } from 'react-redux';
import doOnPropsChange from 'client-core/lib/utils/doOnPropsChange';

const FB_APP_ID = process.env.FB_APP_ID;

const GOOGLE_API_KEY = 'AIzaSyCtTfmY2KB9JziKF2N1SgaEyty2GY1_ZP0';

// Lodash
import { get as g } from 'lodash';

// Actions
import { receiveUser, post, geolocate } from 'modules/flyover/actions';
import Loading from 'components/Loading'

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
		handleGeolocate: ({ dispatch }) => () => {
			dispatch(geolocate());
		},
    }),
	doOnPropsChange(
		['user'],
		({ user, handleGeolocate, geolocation }) => {
			if (user && !geolocation) {
				handleGeolocate();
			}
		}
	),
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

	if(!user || g(user, 'status') === 'unknown') {
		return (
			<LoginScreen
				facebookLoginButtonClick={handleFacebookCallback}
			/>
		);
	}

	if(geolocating) {
		return <Loading />
	}

	if(!geolocation) {
		return <GeolocationNotEnabledScreen />
	}

	return <GeolocationEnabledScreen />;
};

const AppScreen = withAppScreen(renderAppScreen);

export default AppScreen;
