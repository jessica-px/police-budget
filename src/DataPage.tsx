import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Link } from "react-router-dom";
import { City, Alternative, DataLink, CityData } from 'Types';
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

const getRentData = (): CityData[] => {
  return alternatives.filter(alt => alt.name === 'studio apartments')[0].cityData;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

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
      <RentSection />
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
      Unless otherwise noted, "city budget", for the purposes of this app, means General Funds.
    </Paragraph>
    <Paragraph>
      General Funds refers to money that the mayor and council members may
      freely distribute across different departments and services without any direct input
      from the average citizen. It is usually a very large portion of the city's total budget, and comes primarily from general taxes (property, income, sales, etc.).
    </Paragraph>
    <Paragraph>
      Note that there are many services which recieve money from both the General Funds and also other sources (specialty taxes, state/federal grants, etc.).
      The numbers shown here do not tell the entire store of the city's budget -- the focus is only on the General Funds, and what city leaders choose to do with it.
    </Paragraph>
    <Paragraph>
      In most cities in the US, police departments are given an very large cut of the General Funds money.
    </Paragraph>
  </CollapsibleSection>
)

const SalarySection =() => (
  <CollapsibleSection title='Salary Data' subSection={false}>
    <Paragraph>
      All salary data uses local averages taken from
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
    {cities.sort().map(city => <CityDataSection city={city} key={city.name} />)}
  </CollapsibleSection>
)

interface CityDataSectionProps {
  city: City
}

const CityDataSection = ({city}: CityDataSectionProps) => (
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
//                       Rent Components                    //
// -------------------------------------------------------- //


const RentSection = () => (
  <CollapsibleSection title='Rent Prices' subSection={false}>
    <Paragraph>
      This app uses data for the average cost for 12 months of rent in a studio apartment
       -- that's one year of housing for an individual or small family.
    </Paragraph>
    <Paragraph>
      Averages for each city are taken from the January 2020 data provided
       by <a href="https://www.apartmentlist.com/rentonomics/rental-price-data/" target="_blank" rel="noopener noreferrer">Apartment List</a>,
        which takes steps to avoid the biases of websites like apartments.com.
    </Paragraph>
    <Paragraph>
      Presented below are the monthly averages for each city.
       Note that Oakland, CA is not represented by the dataset, and instead uses
        the average for the nearby city of Hayward, CA.
    </Paragraph>
    {getRentData().map((cityData) => <RentData cityData={cityData} key={cityData.name} />)}
  </CollapsibleSection>
)

interface RentDataProps {
  cityData: CityData
}

const RentData = ({cityData}: RentDataProps) => (
  <RentDataWrapper>
    <RentSubHeader>{cityData.name}</RentSubHeader>
    <RentWrapper>
      {formatter.format(cityData.unitCost as number / 12)}
    </RentWrapper>
  </RentDataWrapper>
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

const RentSubHeader = styled.h3`
  display: inline;
  color: white;
  font-weight: 400;
`

const GoBackLinkWapper = styled.div`
  text-align: center;
  padding-bottom: 25px;
`

const GoBackLink = styled(Link)`
  color: #CCC;
  text-decoration: none;
`

const RentDataWrapper = styled.div`
  display: flex;
  max-width: 220px;
  justify-content: space-between;
  align-items: center;
`

const RentWrapper = styled.span`
  margin-left: 0px;
`