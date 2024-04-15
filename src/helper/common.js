import WebMercatorViewport from "viewport-mercator-project";

// Helper function to calculate the minimum or maximum latitude and longitude from a list of coordinates
const calculateMinMaxCoordinates = (coordinates, minOrMax) => {
  // Initialize variables for storing minimum or maximum latitude and longitude
  let minLatOrMaxLat;
  let minLngOrMaxLng;

  // Determine whether to calculate minimum or maximum values
  if (minOrMax === "max") {
    minLatOrMaxLat = -Infinity;
    minLngOrMaxLng = -Infinity;
  } else {
    minLatOrMaxLat = Infinity;
    minLngOrMaxLng = Infinity;
  }

  // Iterate through the list of coordinates to find the minimum or maximum values
  coordinates.forEach((coordinate) => {
    const [lng, lat] = coordinate;
    // Update the minimum or maximum latitude and longitude accordingly
    minLatOrMaxLat =
      minOrMax === "max"
        ? Math.max(minLatOrMaxLat, lat)
        : Math.min(minLatOrMaxLat, lat);
    minLngOrMaxLng =
      minOrMax === "max"
        ? Math.max(minLngOrMaxLng, lng)
        : Math.min(minLngOrMaxLng, lng);
  });

  // Return the calculated minimum or maximum latitude and longitude
  return [minLatOrMaxLat, minLngOrMaxLng];
};

// Helper function to calculate the bounding box of a list of coordinates
const calculateBounds = (coordinates) => {
  // Calculate the minimum and maximum latitude and longitude
  const [maxLat, maxLng] = calculateMinMaxCoordinates(coordinates, "max");
  const [minLat, minLng] = calculateMinMaxCoordinates(coordinates, "min");

  // Define the southwest and northeast corners of the bounding box
  const southwestCorner = [Number(minLng), Number(minLat)];
  const northeastCorner = [Number(maxLng), Number(maxLat)];

  // Combine the southwest and northeast corners to form the bounding box
  const bounds = [southwestCorner, northeastCorner];

  // Return the bounding box
  return bounds;
};

// Main function to calculate the map bounds based on the coordinates, width, and height
export const getMapBounds = (coordinates, width, height) => {
  // Calculate the bounding box of the coordinates
  const pointsBounds = calculateBounds(coordinates);

  // Use WebMercatorViewport to get center longitude/latitude and zoom
  const newViewport = new WebMercatorViewport({
    width,
    height,
  });

  // Fit the bounding box to the viewport with padding
  const bounds = newViewport.fitBounds(pointsBounds, {
    padding: 100,
  });

  // Adjust zoom level if there's only one coordinate
  const { longitude, latitude, zoom } = bounds;

  // Return the longitude, latitude, and zoom level
  return {
    longitude,
    latitude,
    zoom: coordinates.length === 1 ? 14 : zoom - 1,
  };
};
