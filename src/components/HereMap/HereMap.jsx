/* global H */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { platform } from './platform';

const StyledMapWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const AddVehicles = (vehicle, map) => {
  const carMarker =
    '<svg width="20px" height="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 47.032 47.032" style="enable-background:new 0 0 47.032 47.032;" xml:space="preserve">' +
    '<g>' +
    '<path d="M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759' +
    '	c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z' +
    '	 M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713' +
    '	v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336' +
    '	h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805z"/> ' +
    '<g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>' +
    '<g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g>' +
    '</g><g></g></svg>';
  const icon = new H.map.Icon(carMarker);
  const coords = { lat: vehicle.lat, lng: vehicle.lng };
  const marker = new H.map.Marker(coords, { icon });

  map.addObject(marker);
};

const HereMap = ({ selectedAddress, vehicles }) => {
  const mapRef = useRef(null);

  React.useLayoutEffect(() => {
    if (!mapRef.current) return;

    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: selectedAddress.latitude, lng: selectedAddress.longitude },
      zoom: 14,
      pixelRatio: window.devicePixelRatio || 1,
      zoomControl: true
    });

    window.addEventListener('resize', () => hMap.getViewPort().resize());

    // eslint-disable-next-line no-unused-vars
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    // eslint-disable-next-line no-unused-vars
    const ui = H.ui.UI.createDefault(hMap, defaultLayers);
    // eslint-disable-next-line array-callback-return
    vehicles.map(v => {
      AddVehicles(v, hMap);
    });

    hMap.setCenter({ lat: selectedAddress.latitude, lng: selectedAddress.longitude });

    // eslint-disable-next-line consistent-return
    return () => {
      hMap.dispose();
    };
  }, [mapRef, selectedAddress.latitude, selectedAddress.longitude, vehicles]); // This will run this hook every time this ref is updated

  return <StyledMapWrapper id="map-container" className="map" ref={mapRef} />;
};

HereMap.propTypes = {
  selectedAddress: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }).isRequired,
  vehicles: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  )
};

HereMap.defaultProps = {
  vehicles: []
};

export default HereMap;
