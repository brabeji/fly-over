import React from 'react';
import { compose, withHandlers, pure } from 'recompose';
import FacebookLogin from 'react-facebook-login';

const FB_APP_ID = process.env.FB_APP_ID;

const withAppScreen = compose(
    withHandlers({
        handleFacebookLoginButtonClick: () => () => console.log('Click'),
        handleFacebookCallback: () => (e) => console.log(e),
    }),
    pure,
);

const renderAppScreen = ({
    handleFacebookLoginButtonClick,
    handleFacebookCallback,
}) => {
    console.log(process);

    console.log(FB_APP_ID);

    return (
        <div>
            <h2>Fly Over</h2>
            <FacebookLogin
                // appId={`${FB_APP_ID}`}
                appId="305457849865465"
                autoLoad={true}
                fields="name,email,picture"
                icon="fa-facebook"
                textButton="Facebook Login"
                onClick={handleFacebookLoginButtonClick}
                callback={handleFacebookCallback}
            />
        </div>
    );
};

const AppScreen = withAppScreen(renderAppScreen);

export default AppScreen;
