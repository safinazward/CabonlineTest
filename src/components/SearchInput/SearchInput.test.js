import React from 'react';
import { shallow } from 'enzyme';

import SearchInput, { StyledInput, StyledList } from './SearchInput';

describe('SearchInput', () => {
  it('renders without crashing', () => {
    shallow(<SearchInput handleOnChange={jest.fn()} handleOnClick={jest.fn()} />);
  });

  it('shows options on focus', () => {
    const options = [{ id: 1, streetName: 'street', city: 'city' }];
    const wrapper = shallow(
      <SearchInput options={options} handleOnChange={jest.fn()} handleOnClick={jest.fn()} />
    );
    expect(wrapper.find(StyledList).find('li').length).toBe(0);
    const searchInput = wrapper.find(StyledInput);
    searchInput.simulate('focus');
    expect(wrapper.find(StyledList).find('li').length).toBe(1);
  });

  it('hides options on blur', () => {
    const options = [{ id: 1, streetName: 'street', city: 'city' }];
    const wrapper = shallow(
      <SearchInput options={options} handleOnChange={jest.fn()} handleOnClick={jest.fn()} />
    );
    const searchInput = wrapper.find(StyledInput);
    searchInput.simulate('focus');
    expect(wrapper.find(StyledList).find('li').length).toBe(1);
    searchInput.simulate('blur');
    expect(wrapper.find(StyledList).find('li').length).toBe(0);
  });
});
