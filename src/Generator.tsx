import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'

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
      <div>
        Instead, {city.name}'s spending looks like this:
      </div>
      <BudgetComparison city={city} alternative={alternative} />
    </PageWrapper>
  )
}

interface City {
  name: string,
  state: string,
  generalFund: number,
  policeBudget: number
  alternatives: Alternative[]
}

interface Alternative {
  name: string,
  cost: number,
  dept: string,
  deptBudget: number
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
    <WhiteText>{name}:</WhiteText>
    <BoldText>{numToWord(budget)}</BoldText>
    <SmallText>{findPercent(budget, generalFund)}%</SmallText>
  </BudgetSectionStyle>
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
  margin: 20px;
  margin-top: 40px;
`

const HeadlineWrapper = styled.div`
  font-size: 18px;
  text-align: center;
  margin-bottom: 25px;
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
  font-size: 36px;
`

const AlternativeDropdown = styled.div`
  color: yellow;
  text-decoration: underline;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
`

const BudgetComparisonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

const WhiteText = styled.div`
  color: white;
`

const BoldText = styled.div`
  font-weight: 600;
`

const SmallText = styled.div`
  font-size: 14px;
`

interface BudgetSectionStyleProps {
  type: string
}

const BudgetSectionStyle = styled.div<BudgetSectionStyleProps>`
  ${props => props.type === 'police' && css`
    text-align: left;
    color: red;
  `}
  ${props => props.type === 'alt' && css`
    text-align: right;
    color: yellow;
  `}
`