import React from 'react'
import styled from 'styled-components'
import { PieChart } from 'react-minimal-pie-chart';

// -------------------------------------------------------- //
//                       Main Component                     //
// -------------------------------------------------------- //

interface ChartProps {
  policePercent: number,
  altPercent: number
}

export const Chart = ({policePercent, altPercent}: ChartProps) => (
  <ChartWrapper>
    <PieChart
      data={generateChartData(policePercent, altPercent)}
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

interface ChartDataItem {
  title: string,
  value: number,
  color: string
}

const generateChartData = (policePercent: number, altPercent: number): ChartDataItem[] => {
  const general = 100 - policePercent - altPercent;
  return [
    { title: 'General', value: general, color: '#444' },
    { title: 'Police', value: policePercent, color: 'red' },
    { title: 'Alternative', value: altPercent, color: 'yellow' }
  ]
}

// -------------------------------------------------------- //
//                            Styles                        //
// -------------------------------------------------------- //

const ChartWrapper = styled.div`
  max-width: 150px;
  margin: auto;
  margin-top: 20px;
`

const defaultLabelStyle = {
  fontSize: '5px',
  fontFamily: 'sans-serif',
};

