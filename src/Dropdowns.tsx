import React from 'react'
import styled from 'styled-components'
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import { City, Alternative } from 'Types';

// -------------------------------------------------------- //
//                        City Dropdown                     //
// -------------------------------------------------------- //

interface CityDropdownProps {
  city: City
}

export const CityDropdown = ({city}: CityDropdownProps) => {
  return (
    <Dropdown onSelect={value => console.log(`Selected: ${value}`)}>
        <Trigger>
        <CityDropdownStyle>
            {city.name}, {city.state} <CityArrow />
        </CityDropdownStyle>
        </Trigger>
        <Menu placement="bottom" maxHeight="200px">
        <Item value="option-1">Los Angeles, CA</Item>
        <Item value="option-2">New York, NY</Item>
        <Item value="option-3">Boston, MI</Item>
        <Item value="option-1">San Fransisco, CA</Item>
        <Item value="option-1">Atlanta, GO</Item>
        <Item value="option-1">Detroit, MI</Item>
        </Menu>
    </Dropdown>
  )
}


// -------------------------------------------------------- //
//                     Alternative Dropdown                 //
// -------------------------------------------------------- //

interface AlternativeDropdownProps {
  alternative: Alternative
}

export const AlternativeDropdown = ({alternative}:AlternativeDropdownProps) => {
  return (
    <CenterWrapper>
      <Dropdown onSelect={value => console.log(`Selected: ${value}`)}>
          <Trigger>
          <AlternativeDropdownStyle>
              {alternative.name} <DropdownArrow />
          </AlternativeDropdownStyle>
          </Trigger>
          <Menu placement="bottom" maxHeight="200px">
          <Item value="option-1">miles of repaved roads</Item>
          <Item value="option-2">studio apartments</Item>
          <Item value="option-3">playgrounds</Item>
          <Item value="option-1">librarians</Item>
          <Item value="option-1">social workers</Item>
          <Item value="option-1">afterschool programs</Item>
          <Item value="option-2">4 year scholarships</Item>
          </Menu>
      </Dropdown>
    </CenterWrapper>
  )
}

// -------------------------------------------------------- //
//                       Sub-Components                     //
// -------------------------------------------------------- //

const DropdownArrow = styled.div`
  border: solid yellow;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  margin-bottom: 3px;
`

const CityArrow = styled.div`
  border: solid white;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
  transform: rotate(45deg);
  margin-bottom: 3px;
`

// -------------------------------------------------------- //
//                          Styling                         //
// -------------------------------------------------------- //

const CityDropdownStyle = styled.div`
  display:inline-block;
  color: white;
  padding-bottom: 2px;
  border-bottom: 1px solid white;
  &:hover {
    cursor: pointer;
  }
`

const AlternativeDropdownStyle = styled.div`
  display:inline-block;
  color: yellow;
  font-weight: 800;
  font-size: 22px;
  padding-bottom: 10px;
  margin: auto;
  margin-bottom: 15px;
  border-bottom: 1px solid yellow;
  &:hover {
    cursor: pointer;
  }
`

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`