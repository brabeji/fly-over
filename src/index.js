import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import createStore from 'client-core/lib/utils/createStore';
import formsModule from 'client-core/lib/modules/forms';
import flyoverModule from 'modules/flyover';
import Loading from 'components/Loading'

// Styles
import './stylesheets/base.sass';

const store = createStore(
	{
		modules: [
			formsModule,
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
				<Loading />
			}
			googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA0xV8WndscdK7e11dUbaoA2A2migsqlPc&libraries=drawing,places"
		/>
	</Provider>,
	document.getElementById('root')
);
