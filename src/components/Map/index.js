import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import { compose, pure } from 'recompose';

class Map extends Component {
	constructor() {
		super();

		this.handleMapLoad = this.handleMapLoad.bind(this);
	}

	componentWillMount() {
		const { bounds } = this.props;
		this.initialBounds = bounds;
	}

	componentWillReceiveProps(nextProps) {
		const { bounds } = this.props;
		const { bounds: nextBounds } = nextProps;
		if (nextBounds && bounds !== nextBounds) {
			this.map.fitBounds(nextBounds);
		}
	}

	handleMapLoad(map) {
		const { onMapLoad } = this.props;
		this.map = map;
		if (this.initialBounds && this.map) {
			console.log('setting initial bounds', this.initialBounds);
			this.map.fitBounds(this.initialBounds);
		}
		this.initialBounds = null;
		onMapLoad(map);
	}


	render() {
		const {
			markers = [],
			center,
			zoom,
			bounds,
		} = this.props;

		return (
			<div>
				<GoogleMap
					ref={this.handleMapLoad}
					defaultZoom={13}
					defaultCenter={center}
					bounds={bounds}
					center={center}
					zoom={zoom}
					options={{
						maxZoom: 17,
					}}
				>
					{markers.map((marker) => {
						return (
							<Marker
								key={marker.id}
								options={marker}
								position={marker.location}
							/>
						);
					})}

					<Polyline options={{
						strokeColor: '#BB0817',
						strokeWeight: 3,
						zIndex: 1,
						geodesic: true,
						path: [
							{
								lat: 50.0835754,
								lng: 14.448092999999998,
							},
							{
								lat: 48.1458923,
								lng: 17.1071373,
							}
						]
					}}
					/>

					<Polyline options={{
						strokeColor: '#BB0817',
						strokeWeight: 3,
						zIndex: 1,
						geodesic: true,
						path: [
							{
								lat: 50.0835754,
								lng: 14.448092999999998,
							},
							{
								lat: 51.509865,
								lng: -0.118092,
							},
						]
					}}
					/>
				</GoogleMap>
			</div>
		);
	}
}

// export default withScriptjs(withGoogleMap(Map));
// export default withGoogleMap(Map);
export default compose(
	pure,
	withGoogleMap
)(Map);
