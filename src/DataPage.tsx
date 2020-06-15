import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { City, Alternative, DataLink } from 'Types';
import cities from 'cities.json';
import alternatives from 'alternatives.json';

// -------------------------------------------------------- //
//                          Helpers                         //
// -------------------------------------------------------- //

const otherData = alternatives.filter(a => !a.salary);

// -------------------------------------------------------- //
//                       Main Component                     //
// -------------------------------------------------------- //


export const DataPage = () => (
  <div>
    <CitySection />
    <OtherDataSection />
  </div>
)

// -------------------------------------------------------- //
//                       Sub-Components                     //
// -------------------------------------------------------- //

interface CollapsibleSectionProps {
  title: string,
  children: React.ReactNode,
  subSection: boolean
}

const CollapsibleSection = ({ title, children, subSection }: CollapsibleSectionProps) => {
  const [showChildren, setShowChildren] = useState<boolean>(false);

  const toggleShowChildren = () => {
    setShowChildren(!showChildren);
  }

  return (
    <React.Fragment>
      {subSection
        ?
        <CollapsibleSubHeader onClick={() => toggleShowChildren()}>
          { title } <Arrow open={showChildren} subSection={subSection} />
        </CollapsibleSubHeader>
        :
        <h1 onClick={() => toggleShowChildren()}>
          { title } <Arrow open={showChildren} subSection={subSection} />
        </h1>
      }
      { showChildren && children }
    </React.Fragment>
  )
}


// -------------------------------------------------------- //
//                    City Budget Components                //
// -------------------------------------------------------- //

const CitySection = () => (
  <CollapsibleSection title='City Budgets' subSection={false}>
    {cities.map(city => <CityData city={city} />)}
  </CollapsibleSection>
)

interface CityDataProps {
  city: City
}

const CityData = ({city}: CityDataProps) => (
  <CollapsibleSection title={city.name} subSection={true}>
    <h3>Links</h3>
    <div>{city.links.map(link => <LinkDisplay link={link} />)}</div>
    <h3>Notes</h3>
    <div>{city.notes.map(note => <p>{note}</p>)}</div>
  </CollapsibleSection>
)

interface LinkDisplayProps {
  link: DataLink
}

const LinkDisplay = ({link}: LinkDisplayProps) => (
  <a href={link.url}>{link.linkText}</a>
)

// -------------------------------------------------------- //
//                     Other Data Components                //
// -------------------------------------------------------- //

const OtherDataSection = () => (
  <CollapsibleSection title='Other Data' subSection={false}>
    {otherData.map(alt => <AlternativeData alternative={alt} />)}
  </CollapsibleSection>
)

interface AnternativeDataProps {
  alternative: Alternative
}

const AlternativeData = ({alternative}: AnternativeDataProps) => (
  <CollapsibleSection title={alternative.name} subSection={true}>
    {
      alternative.links &&
      <React.Fragment>
        <h3>Links</h3>
        <div>{alternative.links.map(link => <LinkDisplay link={link} />)}</div>
      </React.Fragment>
    }
    {
      alternative.notes &&
      <React.Fragment>
        <h3>Notes</h3>
        <div>{alternative.notes.map(note => <p>{note}</p>)}</div>
      </React.Fragment>
    }
  </CollapsibleSection>
)

// -------------------------------------------------------- //
//                           Styles                         //
// -------------------------------------------------------- //

interface ArrowProps {
  open: boolean;
  subSection: boolean;
}

const Arrow = styled.span<ArrowProps>`
  border: solid white;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: ${props => props.open ? `rotate(45deg)` : `rotate(-45deg)`};
  color: white;
  margin-bottom: 3px;
  ${props => props.subSection && css`
    border-color: yellow;
    color: yellow;
  `}
`

const CollapsibleSubHeader = styled.h2`
  color: yellow;
`