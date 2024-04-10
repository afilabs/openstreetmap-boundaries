import WebMercatorViewport from "viewport-mercator-project";

// Helper function to calculate the minimum or maximum latitude and longitude from a list of coordinates
const getMinOrMax = (coordinates, minOrMax) => {
  if (minOrMax === "max") {
    let maxLat = -Infinity;
    let maxLng = -Infinity;

    coordinates.forEach((coordinate) => {
      const [lng, lat] = coordinate;
      maxLat = Math.max(maxLat, lat);
      maxLng = Math.max(maxLng, lng);
    });
    return [maxLat, maxLng];
  } else {
    let minLat = Infinity;
    let minLng = Infinity;

    coordinates.forEach((coordinate) => {
      const [lng, lat] = coordinate;
      minLat = Math.min(minLat, lat);
      minLng = Math.min(minLng, lng);
    });
    return [minLat, minLng];
  }
};

// Helper function to calculate the bounding box of a list of coordinates
const getBounds = (coordinates) => {
  const [maxLat, maxLng] = getMinOrMax(coordinates, "max");
  const [minLat, minLng] = getMinOrMax(coordinates, "min");

  const southWest = [Number(minLng), Number(minLat)];
  const northEast = [Number(maxLng), Number(maxLat)];
  const result = [southWest, northEast];
  return result;
};

// Main function to calculate the map bounds based on the coordinates, width, and height
export const getMapBounds = (coordinates, width, height) => {
  const pointsBounds = getBounds(coordinates);

  // Use WebMercatorViewport to get center longitude/latitude and zoom
  const newViewport = new WebMercatorViewport({
    width,
    height,
  });
  const bounds = newViewport.fitBounds(pointsBounds, {
    padding: 100,
    // offset: [0, -100],
  }); // Can also use option: offset: [0, -100]

  // Adjust zoom level if there's only one coordinate
  const { longitude, latitude, zoom } = bounds;
  return {
    longitude,
    latitude,
    zoom: coordinates.length === 1 ? 14 : zoom - 1,
  };
};
