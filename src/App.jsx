import React, { useState } from 'react';
import MapBox from './components/MapBox';
import './App.scss';
import CitySelect from './components/CitySelect';

function App() {
  const [coordinates, setCoordinates] = useState([]);

  return (
    <div className="App">
      <div className="search">
        <CitySelect setCoordinates={setCoordinates} />
      </div>
      <div className="wrapper-map">
        <MapBox coordinates={coordinates} />
      </div>
    </div>
  );
}

export default App;
