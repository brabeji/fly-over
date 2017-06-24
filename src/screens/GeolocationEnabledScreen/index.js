import React from 'react';
import { compose, pure, withHandlers, withState } from 'recompose';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// Components
import Map from '../../components/Map';

// Lodash
import { get as g, noop } from 'lodash';

// MapElement
const mapElement = <div style={{ height: '100%' }} />;

const withGeolocationEnabledScreen = compose(
	connect(
		(state) => {
			return {
				bounds: g(state, 'flyover.bounds'),
				zoom: g(state, 'flyover.zoom'),
				center: g(state, 'flyover.center'),
			};
		},
	),
	withState('address', 'setAddress', 'Prague'),
	withHandlers({
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
	}),
	pure,
);

const renderGeolocationEnabledScreen = (props) => {
	const {
		handleFormSubmit,
		handleOnChangePlacesAutocomplete,
		bounds,
		center,
		zoom,
		address,
	} = props;

	return (
		<div>
			<h2>Geolocation Screen</h2>
			<form onSubmit={handleFormSubmit}>
				<PlacesAutocomplete inputProps={{
					value: address,
					onChange: handleOnChangePlacesAutocomplete,
				}} />
				<button type="submit">Submit</button>
			</form>
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

const GeolocationEnabledScreen = withGeolocationEnabledScreen(renderGeolocationEnabledScreen);

export default GeolocationEnabledScreen;
