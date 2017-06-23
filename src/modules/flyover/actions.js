export const RECEIVE_USER = 'flyover/RECEIVE_USER';
export function receiveUser({ user }) {
	return { type: RECEIVE_USER, payload: { user } };
}

export const POST = 'flyover/POST';
export function post({ data }) {
	return { type: POST, payload: { data } };
}
