import Immutable from 'seamless-immutable';
import t from 'tcomb';

import createReducer from 'client-core/lib/utils/createReducer';

import { RECEIVE_USER } from './actions';

const defaultCenter = {
	lat: 50.0835754,
	lng: 14.448092999999998
};

export default createReducer(
	t.struct({
		user: t.maybe(t.Object),
	}),
	Immutable.from({
		zoom: 5,
		center: defaultCenter,
		bounds: undefined,
	}),
	{
		[RECEIVE_USER]: [
			t.Any,
			(state, { payload: { user } }) => {
				return state.set('user', user);
			},
		]
	},
	'flyover'
);
