import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

const CitySelect = ({ setCoordinates }) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [listCities, setListCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState();

  useEffect(() => {
    if (selectedCity) {
      const newCoordinates = listCities.find(
        (el) => el.place_id === selectedCity
      )?.geojson?.coordinates;
      setCoordinates(newCoordinates || []); // Step 4
    }
    // console.log("new coords:" + newCoordinates);
  }, [selectedCity]);

  const debounceFetchListCity = debounce(async (searchValue) => {
    setListCity([]);
    setOptions([]);

    if (searchValue?.length > 5) {
      try {
        console.log('fetching');
        setFetching(true);
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search.php?q=${searchValue}&polygon_geojson=1&format=json`
        );
        const body = await response.json();
        if (Array.isArray(body)) {
          // console.log(body);
          setListCity(body);
          const options = body
            .filter((result) => result.geojson?.type === 'Polygon')
            .map((result) => ({
              label: result.display_name,
              value: result.place_id,
            }));
          // console.log(options);
          setOptions(options);
        }
      } catch (error) {
        console.error('Error fetching city list:', error);
      } finally {
        setFetching(false);
      }
    }
  }, 800);

  return (
    <Select
      showSearch
      filterOption={false}
      value={selectedCity}
      placeholder="Select city"
      onSearch={debounceFetchListCity} // Step 1
      notFoundContent={fetching ? <Spin size="small" /> : null}
      onChange={setSelectedCity} // Step 3 (When user clicks on an option)
      options={options}
      style={{ width: '100%' }}
    />
  );
};

export default CitySelect;
