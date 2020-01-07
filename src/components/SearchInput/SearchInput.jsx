import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchIconSvg from './search_icon.svg';

const SearchBox = styled.div`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.22);
  position: absolute;
  left: 0px;
  margin: 16px;
  top: 0px;
  z-index: 1;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  width: 380px;
`;

const SearchInputWrapper = styled.div`
  border-bottom: 1px solid #dadce0;
  padding: 10px 50px 10px 15px;
`;

const StyledSearchIcon = styled.img`
  float: right;
  cursor: pointer;
  width: 30px;
  position: absolute;
  right: 15px;
  top: 8px;
`;

export const StyledInput = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

export const StyledList = styled.ul`
  list-style: none;
  margin-top: 0;
  overflow-y: auto;
  padding-left: 0;
  width: 100%;
  li {
    padding: 0.5rem;
  }
  li:hover,
  li.active {
    background-color: #dddddd;
  }
`;

const SearchInput = ({ searchTxt, options, handleOnChange, handleOnClick }) => {
  const [activeOption, setActiveOption] = useState(-1);
  const [showOptions, setShowOptions] = useState(false);

  const onChange = e => {
    const inputValue = e.target.value;
    handleOnChange(inputValue);
    setShowOptions(true);
  };

  const onClick = id => {
    setActiveOption(-1);
    handleOnClick(id);
  };
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      setActiveOption(-1);
      setShowOptions(false);
      handleOnClick(options[activeOption].id);
    } else if (e.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(old => old - 1);
    } else if (e.keyCode === 40) {
      if (activeOption - 1 === options.length) {
        return;
      }
      setActiveOption(old => old + 1);
    }
  };
  const optionsList = () => {
    if (showOptions) {
      if (options.length) {
        return (
          <StyledList>
            {options.map((option, index) => {
              let className;
              if (index === activeOption) {
                className = 'active';
              }

              return (
                <li
                  key={option.id}
                  role="presentation"
                  className={className}
                  onMouseDown={() => onClick(option.id)}
                >
                  {`${option.streetName} , ${option.city}`}
                </li>
              );
            })}
          </StyledList>
        );
      }
    }
    return null;
  };
  return (
    <SearchBox>
      <SearchInputWrapper>
        <StyledInput
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => options.length && setShowOptions(true)}
          onBlur={() => setShowOptions(false)}
          value={searchTxt}
          placeholder="Search..."
        />
        <StyledSearchIcon src={SearchIconSvg} alt="icon" />
      </SearchInputWrapper>
      {optionsList()}
    </SearchBox>
  );
};

SearchInput.propTypes = {
  searchTxt: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      city: PropTypes.string,
      streetName: PropTypes.string
    })
  ),
  handleOnChange: PropTypes.func.isRequired,
  handleOnClick: PropTypes.func.isRequired
};

SearchInput.defaultProps = {
  searchTxt: '',
  options: []
};

export default SearchInput;
