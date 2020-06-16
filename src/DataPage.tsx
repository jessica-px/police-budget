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
  <PageWrapper>
    <PageTitle>About the Data</PageTitle>
    <CollapsibleSection title='Disclaimer' subSection={false}>
      <Paragraph>
        This site represents data in a very simplified, generalized way -- it's intended for starting conversations, not for basing financial decisions on.
      </Paragraph>
      <Paragraph>
        But honesty and transparency are still key. Nothing here is intended to mislead. So provided below
        are sources and rationale for the numbers used by this app.
      </Paragraph>
    </CollapsibleSection>
    <CollapsibleSection title='General Funds' subSection={false}>
      <Paragraph>
        Unless otherwise noted, "City Budget", for the purposes of this app, means General Funds.
      </Paragraph>
      <Paragraph>
        General Funds (also called discretionary funds) is money that can be
        freely distributed by the mayor and council members without any direct input
        from the average citizen. It is usually the majority of the city's total budget, and comes primarily from general taxes.
      </Paragraph>
      <Paragraph>
        In every major city in the U.S., police departments are given an enormous percentage of the General Funds money.
      </Paragraph>
    </CollapsibleSection>
    <PageTitle>Sources</PageTitle>
    <CitySection />
    <CollapsibleSection title='Salary Data' subSection={false}>
      <Paragraph>All salary data uses state averages taken from
        the <a href="">U.S. Bureau of Labor Statistics</a>.
      </Paragraph>
    </CollapsibleSection>
    <OtherDataSection />
  </PageWrapper>
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
        <CollapsibleHeader onClick={() => toggleShowChildren()}>
          { title } <Arrow open={showChildren} subSection={subSection} />
        </CollapsibleHeader>
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
    {cities.map(city => <CityData city={city} key={city.name} />)}
  </CollapsibleSection>
)

interface CityDataProps {
  city: City
}

const CityData = ({city}: CityDataProps) => (
  <CollapsibleSection title={city.name} subSection={true}>
    <DataSectionWrapper>
      <h4>Links</h4>
      <div>{city.links.map(link => <LinkDisplay link={link} key={link.url}/>)}</div>
      <h4>Notes</h4>
      <div>{city.notes.map((note, i) => <Paragraph key={i}>{note}</Paragraph>)}</div>
    </DataSectionWrapper>
  </CollapsibleSection>
)

interface LinkDisplayProps {
  link: DataLink
}

const LinkDisplay = ({link}: LinkDisplayProps) => (
  <Paragraph>
    <a href={link.url} target='_blank' rel="noopener noreferrer">{link.linkText}</a>
  </Paragraph>
)

// -------------------------------------------------------- //
//                     Other Data Components                //
// -------------------------------------------------------- //

const OtherDataSection = () => (
  <CollapsibleSection title='Other Data' subSection={false}>
    {otherData.map(alt => <AlternativeData alternative={alt} key={alt.name}/>)}
  </CollapsibleSection>
)

interface AnternativeDataProps {
  alternative: Alternative
}

const AlternativeData = ({alternative}: AnternativeDataProps) => (
  <CollapsibleSection title={alternative.name} subSection={true}>
    {
      alternative.links &&
      <DataSectionWrapper>
        <h4>Links</h4>
        <div>{alternative.links.map(link => <LinkDisplay link={link} key={link.url}/>)}</div>
      </DataSectionWrapper>
    }
    {
      alternative.notes &&
      <DataSectionWrapper>
        <h4>Notes</h4>
        <div>{alternative.notes.map((note, i) => <Paragraph key={i}>{note}</Paragraph>)}</div>
      </DataSectionWrapper>
    }
  </CollapsibleSection>
)

// -------------------------------------------------------- //
//                           Styles                         //
// -------------------------------------------------------- //

const PageWrapper = styled.div`
  padding: 20px 30px;
  margin: auto;
  max-width: 500px;
`

const DataSectionWrapper = styled.div`
  margin-left: 15px;
`

const Paragraph = styled.p`
  color: #EEE;
  font-size: 14px;
`

const PageTitle = styled.h3`
  text-align: center;
  color: #DDD;
`

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

const CollapsibleHeader = styled.h2`
  padding-bottom: 5px;
  border-bottom: 2px solid #555;
  &:hover{
    opacity: 0.8;
    cursor: pointer;
  }
`

const CollapsibleSubHeader = styled.h3`
  color: yellow;
  &:hover{
    opacity: 0.8;
    cursor: pointer;
  }
`