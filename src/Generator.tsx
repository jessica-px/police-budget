import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { PieChart } from 'react-minimal-pie-chart';
import { City, Alternative } from 'Types';

// DUMMY DATA
const dummyCity = {
  name: 'Oakland',
  state: 'CA',
  generalFund: 655127232,
  policeBudget: 301809379,
  alternatives: [
    {
      name: 'new playgrounds',
      cost: 105000,
      dept: 'Parks and Rec',
      deptBudget: 18558125
    }
  ]
}

const generateChartData = (policePercent: number, altPercent: number) => {
  const general = 100 - policePercent - altPercent;
  return [
    { title: 'General', value: general, color: '#444' },
    { title: 'Police', value: policePercent, color: 'red' },
    { title: 'Alternative', value: altPercent, color: 'yellow' }
  ]
}

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};


// -------------------------------------------------------- //
//                       Main Component                     //
// -------------------------------------------------------- //

export const Generator = () => {
  const [city, setCity] = useState<City>(dummyCity);
  const [alternative, setAlternative] = useState<Alternative>(dummyCity.alternatives[0]);
  const [alternativeAmount, setAlternativeAmount] = useState<number>();

  useEffect(() => {
    const amount = (city.policeBudget / 2) / alternative.cost;
    setAlternativeAmount(parseInt(amount.toFixed(0)));
  })

  return (
    <PageWrapper>
      <HeadlineWrapper>
        With 50% of the <CityDropdown>{city.name}, {city.state}</CityDropdown><br/>
        <HeadlinePolice> police budget</HeadlinePolice>, we could pay for
      </HeadlineWrapper>
      <AlternativeNumber>{alternativeAmount}</AlternativeNumber>
      <AlternativeDropdown>{alternative.name}</AlternativeDropdown>
      <CenteredText>
        Instead, city spending looks like this:
      </CenteredText>
      <BudgetComparison city={city} alternative={alternative} />
      <Chart
        policePercent={findPercent(city.policeBudget, city.generalFund)}
        altPercent={findPercent(alternative.deptBudget, city.generalFund)}
      />
      <DefundMessage>Tell {city.name} to <strong>#defundthepolice</strong>.</DefundMessage>
    </PageWrapper>
  )
}


// -------------------------------------------------------- //
//                        Sub-Components                    //
// -------------------------------------------------------- //

interface BudgetComparisonProps {
  city: City,
  alternative: Alternative
}


const BudgetComparison = ({city, alternative}: BudgetComparisonProps) => (
  <BudgetComparisonWrapper>
    <BudgetSection
      name='Police'
      budget={city.policeBudget}
      generalFund={city.generalFund}
      type='police'
    />
    <BudgetSection
      name={alternative.dept}
      budget={alternative.deptBudget}
      generalFund={city.generalFund}
      type='alt'
    />
  </BudgetComparisonWrapper>
)

interface BudgetSectionProps {
  name: string,
  budget: number,
  generalFund: number,
  type: string
}

const BudgetSection = ({name, budget, generalFund, type}: BudgetSectionProps) => (
  <BudgetSectionStyle type={type}>
    <BudgetPercent>{findPercent(budget, generalFund)}%</BudgetPercent>
    <BudgetLabel>&nbsp;{name}</BudgetLabel>
    <BoldText>{numToWord(budget)}</BoldText>
  </BudgetSectionStyle>
)

interface ChartProps {
  policePercent: string,
  altPercent: string
}

const Chart = ({policePercent, altPercent}: ChartProps) => (
  <ChartWrapper>
    <PieChart
      data={generateChartData(parseInt(policePercent), parseInt(altPercent))}
      startAngle={270}
      labelStyle={{
        ...defaultLabelStyle,
      }}
      lineWidth={40}
    />
  </ChartWrapper>
)

// -------------------------------------------------------- //
//                           Helpers                        //
// -------------------------------------------------------- //

const findPercent = (smallNum: number, bigNum: number) => {
  const decimal = (smallNum / bigNum);
  return (decimal * 100).toFixed(0);
}

const getStartingDigits = (number: number, numToRemove: number) => {
  const numString = number.toString();
  return numString.substring(0, numString.length - numToRemove);
}

const numToWord = (number: number): string => {
  const length = Math.ceil(Math.log10(number + 1));
  if (length > 9) {
    const digits = getStartingDigits(number, 9);
    return `${digits} billion`;
  }
  else if (length > 6) {
    const digits = getStartingDigits(number, 6);
    return `${digits} million`;
  }
  else if (length > 3) {
    const digits = getStartingDigits(number, 3);
    return `${digits} thousand`;
  }
  else {
    return number.toString();
  }
}

// -------------------------------------------------------- //
//                           Styles                         //
// -------------------------------------------------------- //

const PageWrapper = styled.div`
  padding: 30px;
  padding-top: 40px;
  margin: auto;
  max-width: 360px;
`

const HeadlineWrapper = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
`

const CityDropdown = styled.span`
  text-decoration: underline;
`

const HeadlinePolice = styled.span`
  color: red;
  font-weight: 600;
`

const AlternativeNumber = styled.div`
  text-align: center;
  color: yellow;
  font-size: 38px;
  font-weight: 800;
`

const AlternativeDropdown = styled.div`
  color: yellow;
  font-weight: 800;
  font-size: 22px;
  text-align: center;
  margin-bottom: 25px;
`

const BudgetComparisonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

const CenteredText = styled.div`
  text-align: center;
`

const BoldText = styled.div`
  font-size: 14px;
`

const BudgetLabel = styled.span`
  font-size: 15px;
  font-weight: 600;
`

const BudgetPercent = styled.span`
  font-size: 20px;
  font-weight: 600;
`

interface BudgetSectionStyleProps {
  type: string
}

const BudgetSectionStyle = styled.div<BudgetSectionStyleProps>`
  font-size: 14px;
  ${props => props.type === 'police' && css`
    text-align: left;
    color: red;
  `}
  ${props => props.type === 'alt' && css`
    text-align: right;
    color: yellow;
  `}
`

const ChartWrapper = styled.div`
  max-width: 150px;
  margin: auto;
  margin-top: 20px;
`

const DefundMessage = styled.div`
  margin-top: 30px;
  text-align: center;
`