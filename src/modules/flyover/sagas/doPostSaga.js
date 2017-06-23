import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { POST } from 'modules/flyover/actions';

const fbApiCall = (url, action, data) => {
	return new Promise((resolve, reject) => {
		FB.api(url, action, data, function (response) {
			if (!response || response.error) {
				reject(response.error);
			} else {
				resolve(response);
			}
		});
	});
};

function* postTask({ payload: { data } }) {
	try {
		const response = yield call(fbApiCall, '/me/photos', 'post', data);
		debugger;
	} catch (e) {
		debugger;
	}
}

export default function* watchPost() {
	yield takeEvery(POST, postTask);
}
