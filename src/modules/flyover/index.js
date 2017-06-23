import createModule from 'client-core/lib/utils/createModule';
import reducer from './reducer';
import * as actions from './actions';
import sagas from './sagas';

export default createModule('flyover', reducer,sagas);
export {
	reducer,
	actions,
};
