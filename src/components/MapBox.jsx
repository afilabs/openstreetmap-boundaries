import React, { useEffect, useState } from 'react';
import MapGL, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getMapBounds } from '../helper/common';

// Initial view state for the map
const initialViewState = {
  latitude: 1.29027,
  longitude: 103.851959,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

function MapBox({ coordinates }) {
  const [viewState, setViewState] = useState(initialViewState);

  useEffect(() => {
    if (coordinates?.length > 0) {
      const bounds = getMapBounds(coordinates[0]);
      setViewState((prevState) => ({
        ...prevState,
        ...bounds,
      }));
    }
  }, [coordinates]);

  return (
    <MapGL
      {...viewState}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      height="100vh"
      width="100vw"
      onMove={(evt) => setViewState(evt.viewState)}
    >
      {coordinates?.length > 0 && (
        <Source
          type="geojson"
          data={{
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: coordinates,
            },
          }}
        >
          <Layer
            {...{
              id: 'layer-fill',
              type: 'fill',
              paint: {
                'fill-outline-color': 'white',
                'fill-color': '#E14C48',
                'fill-opacity': 0.15,
              },
            }}
          />
          <Layer
            {...{
              id: 'layer-line',
              type: 'line',
              paint: {
                'line-color': '#000',
                'line-width': 3,
              },
            }}
          />
        </Source>
      )}
    </MapGL>
  );
}

export default MapBox;
