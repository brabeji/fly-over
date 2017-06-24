import Immutable from 'seamless-immutable';
import t from 'tcomb';

import createReducer from 'client-core/lib/utils/createReducer';

import {
	RECEIVE_USER,
	GEOLOCATE,
	RECEIVE_GEOLOCATION,
	RECEIVE_GEOLOCATION_FAILURE,
} from './actions';

const defaultCenter = {
	lat: 50.0835754,
	lng: 14.448092999999998
};

export default createReducer(
	t.struct({
		user: t.maybe(t.Object),
		geolocating: t.Boolean,
		geolocation: t.maybe(t.Object),
	}),
	Immutable.from({
		zoom: 5,
		center: defaultCenter,
		bounds: undefined,
		geolocating: false,
		geolocation: null,
		geolocationError: null,
	}),
	{
		[RECEIVE_USER]: [
			t.Any,
			(state, { payload: { user } }) => {
				return state.set('user', user);
			},
		],
		[GEOLOCATE]: [
			t.Any,
			(state) => {
				return state
					.set('geolocating', true)
					.set('geolocationError', null)
					;
			},
		],
		[RECEIVE_GEOLOCATION]: [
			t.Any,
			(state, { payload: { location } }) => {
				return state
					.set('geolocating', false)
					.set('geolocation', location)
					.set('geolocationError', null)
					;
			},
		],
		[RECEIVE_GEOLOCATION_FAILURE]: [
			t.Any,
			(state, { payload: { error } }) => {
				return state
					.set('geolocating', false)
					.set('geolocation', null)
					.set('geolocationError', error)
					;
			},
		],
	},
	'flyover'
);
