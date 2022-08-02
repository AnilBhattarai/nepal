import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar';

const PropertiesByPrice = props => {
  const { data } = props;

  const lineData =
    data && data.length > 0
      ? data.map(function chart(each) {
        return {
          segment: `${each._id}`,
          properties: each.amt,
          propertiesColor: '#38bcb2',
        };
      })
      : [];

  return (
    <>
      <ResponsiveBar
        layout="Horizontal"
        data={lineData}
        keys={['properties']}
        indexBy="segment"
        margin={{ top: 50, right: 20, bottom: 50, left: 100 }}
        padding={0.3}
        colors={{ scheme: 'paired' }}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        // fill={[
        //   {
        //     match: {
        //       id: 'properties',
        //     },
        //     id: 'dots',
        //   },
        // ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Properties',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </>
  );
};

export default PropertiesByPrice;
