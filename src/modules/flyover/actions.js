export const RECEIVE_USER = 'flyover/RECEIVE_USER';
export function receiveUser({ user }) {
	return { type: RECEIVE_USER, payload: { user } };
}

export const GEOLOCATE = 'flyover/GEOLOCATE';
export function geolocate() {
	return { type: GEOLOCATE };
}

export const RECEIVE_GEOLOCATION = 'flyover/RECEIVE_GEOLOCATION';
export function receiveGeolocation({ location }) {
	return { type: RECEIVE_GEOLOCATION, payload: { location } };
}

export const RECEIVE_GEOLOCATION_FAILURE = 'flyover/RECEIVE_GEOLOCATION_FAILURE';
export function receiveGeolocationFailure({ error }) {
	return { type: RECEIVE_GEOLOCATION_FAILURE, payload: { error } };
}

export const POST = 'flyover/POST';
export function post({ data }) {
	return { type: POST, payload: { data } };
}

export const FETCH_FLIGHTS = 'flyover/FETCH_FLIGHTS';
export function fetchFlights({ query }) {
	return { type: FETCH_FLIGHTS, payload: { query } };
}

export const RECEIVE_FLIGHTS = 'flyover/RECEIVE_FLIGHTS';
export function receiveFlights({ flights }) {
	return { type: RECEIVE_FLIGHTS, payload: { flights } };
}

export const RECEIVE_FETCH_FLIGHTS_ERROR = 'flyover/RECEIVE_FETCH_FLIGHTS_ERROR';
export function receiveFetchFlightsError({ flights }) {
	return { type: RECEIVE_FETCH_FLIGHTS_ERROR, payload: { flights } };
}
