import Immutable from 'seamless-immutable';
import t from 'tcomb';

import createReducer from 'client-core/lib/utils/createReducer';

import { RECEIVE_USER } from './actions';

export default createReducer(
	t.struct({
		user: t.maybe(t.Object),
	}),
	Immutable.from({}),
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
