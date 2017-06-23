import React from 'react';
import { get as g } from 'lodash';
import { compose, withHandlers, pure } from 'recompose';
import { connect } from 'react-redux';
import { receiveUser, post } from 'modules/flyover/actions';
import FacebookLogin from 'react-facebook-login';

const FB_APP_ID = process.env.FB_APP_ID;

const withAppScreen = compose(
	connect(
		(state) => {
			return {
				user: g(state, 'flyover.user'),
			};
		},
	),
	withHandlers(
		{
			handleFacebookCallback: ({ dispatch }) => (user) => {
				dispatch(receiveUser({ user }))
			},
			doPost: ({ dispatch, user }) => () => {
				dispatch(post({ data: {} }))
			},
		}
	),
	pure,
);

const renderAppScreen = ({
	user,
	handleFacebookCallback,
	doPost,
}) => {
	// console.log(process);
	// console.log(FB_APP_ID);

	return (
		<div>
			<h2>Fly Over</h2>
			{!user && (
				<FacebookLogin
					appId="305457849865465"
					scope="public_profile,publish_actions"
					autoLoad={true}
					fields="name,email,picture"
					icon="fa-facebook"
					textButton="Facebook Login"
					callback={handleFacebookCallback}
				/>
			)}
			<button onClick={doPost}>POST</button>
		</div>
	);
};

const AppScreen = withAppScreen(renderAppScreen);

export default AppScreen;
