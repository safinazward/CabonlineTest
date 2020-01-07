import React, { useState } from 'react';
import HereMap from './components/HereMap';
import cabonlineService from './services/cabonlineService';
import SearchInput from './components/SearchInput';

function App() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({
    latitude: 59.334591,
    longitude: 18.06324
  });
  const [vehicles, setVehicles] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleOnChange = searchTxt => {
    setUserInput(searchTxt);
    if (searchTxt)
      cabonlineService.getAddresses(searchTxt).then(res => {
        setAddresses(res);
      });
    else setAddresses([]);
  };

  const handleOnClick = addressId => {
    const selected = addresses.find(a => a.id === addressId);
    setUserInput(`${selected.streetName} , ${selected.city}`);
    setSelectedAddress(selected);
    cabonlineService.getVehicles(selected.latitude, selected.longitude).then(res => {
      setVehicles(res);
    });
  };

  return (
    <div className="App">
      <SearchInput
        searchTxt={userInput}
        options={addresses}
        handleOnChange={handleOnChange}
        handleOnClick={handleOnClick}
      />
      <HereMap selectedAddress={selectedAddress} vehicles={vehicles} />
    </div>
  );
}

export default App;
