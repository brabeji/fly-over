import React from 'react';
import { compose, withHandlers, withState, pure } from 'recompose';
import FacebookLogin from 'react-facebook-login';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { connect } from 'react-redux';
import InvitationForm from 'components/InvitationForm';

// Lodash
import { get as g, noop } from 'lodash';

// Actions
import { receiveUser, post, geolocate, fetchFlights } from 'modules/flyover/actions';

const FB_APP_ID = process.env.FB_APP_ID;

const mapElement = <div style={{ height: '100%' }} />;

const withAppScreen = compose(
	withScriptjs,
	connect(
		(state) => {
			return {
				user: g(state, 'flyover.user'),
				bounds: g(state, 'flyover.bounds'),
				zoom: g(state, 'flyover.zoom'),
				center: g(state, 'flyover.center'),
			};
		},
	),
	withHandlers(
		{
			handleFacebookCallback: ({ dispatch }) => (user) => {
				dispatch(receiveUser({ user }))
			},
			handlePost: ({ dispatch, user }) => () => {
				dispatch(post({ data: {} }))
			},
			handleGeolocate: ({ dispatch, user }) => () => {
				dispatch(geolocate())
			},
			handleFetchFlights: ({ dispatch, user }) => () => {
				dispatch(fetchFlights({ query: { flyFrom: 'CZ', to: 'SK' } }))
			},
		}
	),
	pure,
);

const renderAppScreen = ({
	user,
	handleFacebookCallback,
	handlePost,
	handleGeolocate,
	handleFetchFlights,
}) => {
	// console.log(process);
	// console.log(FB_APP_ID);

	return (
		<div>
			<h2>Fly Over</h2>


			{!user && (
				<FacebookLogin
					appId="305457849865465"
					scope="public_profile,publish_actions"
					autoLoad={true}
					fields="name,email,picture"
					icon="fa-facebook"
					textButton="Facebook Login"
					callback={handleFacebookCallback}
				/>
			)}
			<InvitationForm onSubmitInvitation={handleFetchFlights} />
			<button onClick={handlePost}>POST</button>
			<button onClick={handleGeolocate}>LOCATE</button>
		</div>
	);
};

const AppScreen = withAppScreen(renderAppScreen);

export default AppScreen;
