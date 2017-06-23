import React from 'react';
import { compose, withHandlers, withState, pure } from 'recompose';
import FacebookLogin from 'react-facebook-login';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { connect } from 'react-redux';

// Lodash
import { get as g } from 'lodash';

// Actions
import { receiveUser, post } from 'modules/flyover/actions';

const FB_APP_ID = process.env.FB_APP_ID;

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
        handleFacebookLoginButtonClick: () => () => console.log('Click'),
		handleFacebookCallback: ({ dispatch }) => (user) => {
			dispatch(receiveUser({user}))
		},
		handleFormSubmit: ({ address }) => (event) => {
			event.preventDefault();

			geocodeByAddress(address)
				.then(results => getLatLng(results[0]))
				.then(latLng => console.log('Success', latLng))
				.catch(error => console.error('Error', error));
		},
		handleOnChangePlacesAutocomplete: ({ setAddress }) => (e) => {
			setAddress(e);
		},
		doPost: ({ dispatch, user }) => () => {
			dispatch(post({ data: {} }))
		},
    }),
    pure,
);

const renderAppScreen = ({
	address,
	handleOnChangePlacesAutocomplete,
	user,
	doPost,
    handleFacebookCallback,
	handleFormSubmit,
}) => {
	// console.log(process);
	// console.log(FB_APP_ID);

	return (
		<div>
			<h2>Fly Over</h2>

			<form onSubmit={handleFormSubmit}>
				<PlacesAutocomplete inputProps={{
					value: address,
					onChange: handleOnChangePlacesAutocomplete,
				}} />
				<button type="submit">Submit</button>
			</form>

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
			<button onClick={doPost}>POST</button>
		</div>
	);
};

const AppScreen = withAppScreen(renderAppScreen);

export default AppScreen;
