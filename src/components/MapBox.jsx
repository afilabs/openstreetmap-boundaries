import React, { useEffect, useState } from "react";
import MapGL, { Layer, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getMapBounds } from "../helper/common";

// Initial view state for the map
const initialViewState = {
  latitude: 1.29027,
  longitude: 103.851959,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

function MapBox({ coordinates, dimensions }) {
  // State to manage the view state of the map
  const [viewState, setViewState] = useState(initialViewState);

  // State to track if the map needs to fit the bounds
  const [fitBounded, setFitBounded] = useState(false);

  useEffect(() => {
    // When the coordinates and dimensions change, update the map bounds
    if (!fitBounded && coordinates?.length > 0 && dimensions.width) {
      setFitBounded(true);
      const bounds = getMapBounds(
        coordinates[0],
        dimensions.width,
        dimensions.height,
      );
      setViewState((prevState) => ({
        ...prevState,
        ...bounds,
      }));
      setFitBounded(false);
    }
  }, [fitBounded, dimensions, coordinates]);

  return (
    <MapGL
      {...viewState}
      mapStyle="mapbox://styles/mapbox/light-v9"
      mapboxAccessToken="pk.eyJ1IjoidGhlcHJvZiIsImEiOiJjazRxaTFpMDUwMXd6M21uMHRvYXBlanY1In0.7v5Itqbe2GQvWxtkefhcug"
      style={{
        height: "100%",
        width: "100%",
      }}
      onMove={(viewport) => setViewState(viewport)}
    >
      {/* Display the polygon layer if coordinates are available */}
      {coordinates?.length > 0 && (
        <Source
          type="geojson"
          data={{
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: coordinates,
            },
            id: "abc123",
          }}
        >
          <Layer
            {...{
              id: "abc123",
              type: "fill",
              paint: {
                "fill-outline-color": "white",
                "fill-color": "#E14C48",
                "fill-opacity": 0.7,
              },
            }}
          />
        </Source>
      )}
    </MapGL>
  );
}

export default MapBox;
