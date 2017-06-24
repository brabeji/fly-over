import React from 'react';
import { compose, pure } from 'recompose';
import FacebookLogin from 'react-facebook-login';

// Components
import Logo from '../../components/Logo';
import Planet from '../../components/Planet';
import LoginButton from '../../components/LoginButton';

const withLoginScreen = compose(
	pure,
);

const renderLoginScreen = (props) => {
	const {
		facebookLoginButtonClick,
	} = props;

	return (
		<div>
			<Logo />
			<Planet />

			<div className="LoginButton-holder">
				<FacebookLogin
					appId="305457849865465"
					scope="public_profile,publish_actions"
					autoLoad={true}
					fields="name,email,picture"
					icon="fa-facebook"
					textButton=" Login"
					callback={facebookLoginButtonClick}
				/>
			</div>

		</div>
	);
};

const LoginScreen = withLoginScreen(renderLoginScreen);

export default LoginScreen;
