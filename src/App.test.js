import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('The app', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});
