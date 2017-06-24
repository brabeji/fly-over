import React from 'react';
import { compose, withHandlers, withState, pure } from 'recompose';
import FacebookLogin from 'react-facebook-login';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import { connect } from 'react-redux';

// Components
import Map from './components/Map';

// Lodash
import { get as g, noop } from 'lodash';

// Actions
import { receiveUser, post } from 'modules/flyover/actions';

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

const renderAppScreen = (props) => {
	const {
		address,
		handleOnChangePlacesAutocomplete,
		user,
		doPost,
		handleFacebookCallback,
		handleFormSubmit,
		bounds,
		zoom,
		center,
	} = props;

	console.log(props);

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

			<Map
				loadingElement={(
					<div>spinner</div>
				)}
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0xV8WndscdK7e11dUbaoA2A2migsqlPc&libraries=drawing,places"
				containerElement={
					<div style={{
						height: 500,
						width: 500,
					}}
					/>
				}
				mapElement={mapElement}
				onMapLoad={noop}
				markers={[
					{
						id: 1,
						location: {
							lat: 50.0835754,
							lng: 14.448092999999998
						},
					},
					{
						id: 2,
						location: {
							lat: 51.509865,
							lng: -0.118092
						},
					},
					{
						id: 3,
						location: {
							lat: 48.1458923,
							lng: 17.1071373,
						},
					}
				]}
				center={center}
				zoom={zoom}
				bounds={bounds}
			/>
		</div>
	);
};

const AppScreen = withAppScreen(renderAppScreen);

export default AppScreen;
