import React from 'react';

const FB_APP_ID = process.env.FB_APP_ID;

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = `//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=${FB_APP_ID}`;
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

const App = () => {
    return (
        <div>
            <h2>Fly Over</h2>
        </div>
    );
};

export default App;
