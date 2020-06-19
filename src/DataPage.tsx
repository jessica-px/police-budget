import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Link } from "react-router-dom";
import { City, Alternative, DataLink } from 'Types';
import cities from 'cities.json';
import alternatives from 'alternatives.json';

// -------------------------------------------------------- //
//                          Helpers                         //
// -------------------------------------------------------- //

const otherData = alternatives.filter(a => !a.salary).sort();

const titleCase = (str: string): string => {
  const glue = ['of', 'for', 'and'];
  return str.replace(/(\w)(\w*)/g, function(_, i, r){
      var j = i.toUpperCase() + (r != null ? r : "");
      return (glue.indexOf(j.toLowerCase())<0)?j:j.toLowerCase();
  });
};

// -------------------------------------------------------- //
//                       Main Component                     //
// -------------------------------------------------------- //


export const DataPage = () => (
  <PageWrapper>
    <div>
      <PageTitle>About the Data</PageTitle>
      <DisclaimterSection />
      <GeneralFundsSection />
      <PageTitle>Sources</PageTitle>
      <CitySection />
      <SalarySection />
      <OtherDataSection />
    </div>
    <GoBackLinkWapper>
      <GoBackLink to='/'><BackArrow/> Back to Main Page</GoBackLink>
    </GoBackLinkWapper>
  </PageWrapper>
)


// -------------------------------------------------------- //
//                     Section Components                   //
// -------------------------------------------------------- //

const DisclaimterSection = () => (
  <CollapsibleSection title='Disclaimer' subSection={false}>
    <Paragraph>
      This site represents data in a very simplified, generalized way -- it's intended for starting conversations, not for basing financial decisions on.
    </Paragraph>
    <Paragraph>
      But honesty and transparency are still key. Nothing here is intended to mislead. So provided below
      are sources and rationale for the numbers used by this app.
    </Paragraph>
  </CollapsibleSection>
)

const GeneralFundsSection = () => (
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
)

const SalarySection =() => (
  <CollapsibleSection title='Salary Data' subSection={false}>
    <Paragraph>
      All salary data uses state averages taken from
      the <a href="">U.S. Bureau of Labor Statistics</a>.
      Note that this does not include any additional costs paid for
      by the employer, such as employee benefits.
    </Paragraph>
  </CollapsibleSection>
)

// -------------------------------------------------------- //
//                    City Budget Components                //
// -------------------------------------------------------- //

const CitySection = () => (
  <CollapsibleSection title='City Budgets' subSection={false}>
    {cities.sort().map(city => <CityData city={city} key={city.name} />)}
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
      {city.notes.length > 0 &&
        <React.Fragment>
          <h4>Notes</h4>
          <div>{city.notes.map((note, i) => <Paragraph key={i}>{note}</Paragraph>)}</div>
        </React.Fragment>
      }
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
  <CollapsibleSection title={titleCase(alternative.name)} subSection={true}>
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
//                           Styles                         //
// -------------------------------------------------------- //

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 20px 30px;
  margin: auto;
  max-width: 500px;
  height: 100%;
`

const DataSectionWrapper = styled.div`
  margin-left: 15px;
`

const Paragraph = styled.p`
  color: #EEE;
  font-size: 14px;
`

const PageTitle = styled.h3`
  color: yellow;
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
    border-color: white;
    color: white;
  `}
`

const BackArrow = styled.span`
  border: solid #CCC;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(135deg);
  color: #CCC;
  margin-bottom: 2px;
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
  color: white;
  font-weight: 400;
  &:hover{
    opacity: 0.8;
    cursor: pointer;
  }
`

const GoBackLinkWapper = styled.div`
  text-align: center;
  padding-bottom: 25px;
`

const GoBackLink = styled(Link)`
  color: #CCC;
  text-decoration: none;
`