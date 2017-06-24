import geolocator from 'geolocator';
import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { GEOLOCATE, receiveGeolocation, receiveGeolocationFailure } from 'modules/flyover/actions';

const geolocate = (options) => {
	return new Promise((resolve, reject) => {
		geolocator.locate(options, function (err, location) {
			if (err) {
				return reject(err);
			}
			resolve(location);
		});
	});
};

const delocate = (location) => {
	return new Promise((resolve, reject) => {
		const geocoder = new google.maps.Geocoder;
		geocoder.geocode({'location': {
			lat: location.coords.latitude,
			lng: location.coords.longitude,
		}}, (results, status) => {
			if(status !== 'OK') {
				reject('Error');
			} else {
				resolve(results);
			}
		});
	});
};

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumWait: 10000,     // max wait time for desired accuracy
	maximumAge: 0,          // disable cache
	desiredAccuracy: 30,    // meters
	// fallbackToIP: true,     // fallback to IP if Geolocation fails or rejected
};

function* geolocationTask() {
	try {
		const location = yield call(geolocate, options);
		const places = yield call(delocate, location);

		yield put(receiveGeolocation({ location, places }));
	} catch (error) {
		yield put(receiveGeolocationFailure({ error }));
	}
}

export default function* geolocationSaga() {
	yield takeEvery(GEOLOCATE, geolocationTask);
}
