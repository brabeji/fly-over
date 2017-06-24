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
		yield put(receiveGeolocation({ location }));
	} catch (error) {
		yield put(receiveGeolocationFailure({ error }));
	}
}

export default function* geolocationSaga() {
	yield takeEvery(GEOLOCATE, geolocationTask);
}
