import React, { createRef, useEffect, useState } from "react";
import MapBox from "./components/MapBox";
import DebounceSelect from "./components/DebounceSelect";
import "./App.scss";
import useRefDimensions from "./hooks/useRefDimensions";

function App() {
  const [selectedValue, setSelectedValue] = useState(); // Changed variable name to selectedValue for clarity
  const [coordinates, setCoordinates] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Changed variable name to searchResults for clarity
  const divRef = createRef();

  const dimensions = useRefDimensions(divRef);

  const fetchCityList = (searchValue) => {
    // Changed parameter name to searchValue for clarity
    return fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${searchValue}&polygon_geojson=1&format=json`,
    )
      .then((response) => response.json())
      .then((body) => {
        if (Array.isArray(body)) {
          setSearchResults(body);
          const options = body
            .filter((result) => {
              return result.geojson?.type === "Polygon";
            })
            .map((result) => {
              return {
                label: result.display_name,
                value: result.place_id,
              };
            });
          console.log(options);
          return options;
        } else {
          setSearchResults([]);
          setCoordinates([]);
          setSelectedValue(undefined);
          return [];
        }
      });
  };

  useEffect(() => {
    if (selectedValue) {
      console.log(searchResults.find((el) => el.place_id === selectedValue));
      const newCoordinates = searchResults.find(
        (el) => el.place_id === selectedValue,
      )?.geojson?.coordinates;
      console.log(newCoordinates);
      setCoordinates(newCoordinates);
    }
  }, [searchResults, selectedValue]);

  return (
    <div className="App" ref={divRef}>
      <div className="search">
        <DebounceSelect
          value={selectedValue}
          showSearch={true}
          filterOption={false}
          placeholder="Select city"
          fetchOptions={fetchCityList}
          onChange={(newValue) => {
            setSelectedValue(newValue);
          }}
          style={{
            width: "100%",
          }}
        />
      </div>
      <div className="wrapper-map">
        <MapBox coordinates={coordinates} dimensions={dimensions} />
      </div>
    </div>
  );
}

export default App;
