import React from 'react'
import styled from 'styled-components'
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import { City, Alternative } from 'Types';

// -------------------------------------------------------- //
//                             Helpers                      //
// -------------------------------------------------------- //


// The dropdown component yells if we just pass the object directly
// so instead we're using the name field to look it up again...
const getAlternative = (name: string, allAlternatives: Alternative[]) => {
  return allAlternatives.filter(alternative => alternative.name === name)[0];
}

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
  currAlt: Alternative
  allAlternatives: Alternative[]
  setAlternative: (x: Alternative) => void;
}

export const AlternativeDropdown = ({currAlt, allAlternatives, setAlternative}: AlternativeDropdownProps) => {
  return (
    <CenterWrapper>
      <Dropdown onSelect={value => setAlternative(getAlternative(value, allAlternatives))}>
          <Trigger>
          <AlternativeDropdownStyle>
              {currAlt.name} <DropdownArrow />
          </AlternativeDropdownStyle>
          </Trigger>
          <Menu placement="bottom" maxHeight="200px">
          {allAlternatives.map(alternative => (
            <Item value={alternative.name}>{alternative.name}</Item>
          ))}
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
  margin-bottom: 22px;
  border-bottom: 1px solid yellow;
  &:hover {
    cursor: pointer;
  }
`

const CenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`