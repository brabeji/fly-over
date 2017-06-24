import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import createStore from 'client-core/lib/utils/createStore';
import flyoverModule from 'modules/flyover';

// Styles
import './stylesheets/base.sass';

const store = createStore(
	{
		modules: [
			flyoverModule,
		],
		enhancers: [
			window.devToolsExtension ? window.devToolsExtension() : f => f,
		],
	},
);

ReactDOM.render(
	<Provider store={store}>
		<App
			loadingElement={
				<div className="Loading Loading--fixed">
					Loading...
				</div>
			}
			googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0xV8WndscdK7e11dUbaoA2A2migsqlPc&libraries=drawing,places"
		/>
	</Provider>,
	document.getElementById('root')
);
