import { get as g, reduce, isArray } from 'lodash';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { FETCH_FLIGHTS, receiveFlights, receiveFetchFlightsError } from 'modules/flyover/actions';

import fetch from 'isomorphic-fetch';
import axios from 'axios';

const API_URL = 'https://api.skypicker.com/flights_multi';

function* fetchFlightsTask({ payload: { query } }) {

	let to = g(query, 'to', []);
	if (!isArray(to)) {
		to = [to];
	}
	const body = {
		requests: to.map((toValue) => {
			return {
				flyFrom: g(query, 'flyFrom'),
				to: toValue,
			}
		})
	};
	try {
		const result = yield call(axios.post, API_URL, body, { params: { partner: 'picky' } });
		yield put(receiveFlights({ flights: g(result, 'data') }));
	} catch (error) {
		yield put(receiveFetchFlightsError({ error }))
	}

}

export default function* watchFetchFlights() {
	yield takeEvery(FETCH_FLIGHTS, fetchFlightsTask);
}
