import React from 'react';
import { shallow } from 'enzyme';

import HereMap from './HereMap';

describe('HereMap', () => {
  it('renders without crashing', () => {
    shallow(
      <HereMap
        selectedAddress={{
          latitude: 59.334591,
          longitude: 18.06324
        }}
      />
    );
  });

  it('renders with vehicles markers', () => {
    const vehicles = [{ lat: 50, lng: 5 }];
    shallow(
      <HereMap
        selectedAddress={{
          latitude: 59.334591,
          longitude: 18.06324
        }}
        vehicles={vehicles}
      />
    );
  });
});
