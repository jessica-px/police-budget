import React from 'react'
import styled from 'styled-components'
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import { Alternative } from 'Types';

// -------------------------------------------------------- //
//                       Main Component                     //
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

// -------------------------------------------------------- //
//                          Styling                         //
// -------------------------------------------------------- //

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