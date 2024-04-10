import React, { createRef, useEffect, useState } from "react";
import MapBox from "./components/MapBox";
import DebounceSelect from "./components/DebounceSelect";
import "./App.scss";
import useRefDimensions from "./hooks/useRefDimensions";

function App() {
  const [value, setValue] = useState();
  const [coordinates, setCoordinates] = useState([]);
  const [rsSearch, setRsSearch] = useState([]);
  const divRef = createRef();

  const dimensions = useRefDimensions(divRef);

  const fetchCityList = (valueSearch) => {
    return fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${valueSearch}&polygon_geojson=1&format=json`,
    )
      .then((response) => response.json())
      .then((body) => {
        if (Array.isArray(body)) {
          setRsSearch(body);
          const options = body
            .filter((s) => {
              return s.geojson?.type === "Polygon";
            })
            .map((s) => {
              return {
                label: s.display_name,
                value: s.place_id,
              };
            });
          console.log(options);
          return options;
        } else {
          setRsSearch([]);
          setCoordinates([]);
          setValue(undefined);
          return [];
        }
      });
  };

  useEffect(() => {
    if (value) {
      console.log(rsSearch.find((el) => el.place_id === value));
      const newCoordinates = rsSearch.find((el) => el.place_id === value)
        ?.geojson?.coordinates;
      console.log(newCoordinates);
      setCoordinates(newCoordinates);
    }
  }, [rsSearch, value]);

  return (
    <div className="App" ref={divRef}>
      <div className="search">
        <DebounceSelect
          value={value}
          showSearch={true}
          filterOption={false}
          placeholder="Select city"
          fetchOptions={fetchCityList}
          onChange={(newValue) => {
            setValue(newValue);
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
