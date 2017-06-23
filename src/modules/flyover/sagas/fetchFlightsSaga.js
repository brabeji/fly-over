import {call} from 'redux-saga/effects';

import fetch from 'isomorphic-fetch';

const query = `
fragment RouteStop on RouteStop {
  airport {
    city {
      name
    }
    locationId
  }
}

query AllFlights($search: FlightsSearchInput!) {
  allFlights(search: $search, first: 1) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        price {
          amount
          currency
        }
        legs {
          flightNumber
          recheckRequired
          duration
          departure {
            ...RouteStop
          }
          arrival {
            ...RouteStop
          }
          airline {
            name
            code
            logoUrl
            isLowCost
          }
        }
      }
    }
  }
}
`;

const variables = {
	search: {
		from: {
			radius: { // Prague
				lat: 50.08,
				lng: 14.44,
				radius: 100
			}
		},
		to: [
			{ location: 'Brno' },
			{ location: 'London' }
		],
		dateFrom: '2017-12-24',
		dateTo: '2017-12-30',
	},
};

export default function* fetchFlightsSaga() {

	const requestConfig = {
		method: 'POST',
			body: JSON.stringify({ query, variables }),
	};

	try {
		yield call(fetch, requestConfig);
	}catch (e) {

	}

}
