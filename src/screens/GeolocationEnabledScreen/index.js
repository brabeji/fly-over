import React from 'react';
import { compose, pure, withHandlers } from 'recompose';
import { connect } from 'react-redux';

// Components
import Map from '../../components/Map';
import InvitationForm from 'components/InvitationForm';

// Actions
import { fetchFlights } from 'modules/flyover/actions';

// Lodash
import { get as g, noop } from 'lodash';

// MapElement
const mapElement = <div style={{ height: '100%' }} />;

const withGeolocationEnabledScreen = compose(
	connect(
		(state) => {
			return {
				geolocation: g(state, 'flyover.geolocation'),
				flights: g(state, 'flyover.flights'),
				bounds: g(state, 'flyover.bounds'),
				zoom: g(state, 'flyover.zoom'),
				center: g(state, 'flyover.center'),
			};
		},
	),
	withHandlers({
		handleFetchFlights: ({ dispatch, user }) => ({flyFromMulti}) => {
			dispatch(fetchFlights({ query: { flyFrom: flyFromMulti.map((airport) => airport.code), to: 'SK' } }))
		},
	}),
	pure,
);

const renderGeolocationEnabledScreen = (props) => {
	const {
		handleFetchFlights,
		bounds,
		center,
		zoom,
		geolocation,
		flights,
	} = props;

	return (
		<div>
			<h2>Geolocation Screen</h2>

			you are here:
			<pre>{JSON.stringify(geolocation, null, 2)}</pre>

			fly my frined from these airports
			<InvitationForm onSubmitInvitation={handleFetchFlights} />

			<ul>
				{
					flights.map((flight) => {
						return (
							<li>{flight.price}</li>
						);
					})
				}
			</ul>

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
