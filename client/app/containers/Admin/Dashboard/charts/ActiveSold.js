import React from 'react';
import PropTypes from 'prop-types';
import { ResponsivePie } from '@nivo/pie';

const ActiveSold = props => {
  const { data } = props;

  const lineData =
    data && data.not_sold_out_count
      ? [
        {
          id: 'Not_Sold',
          label: 'Not Sold',
          value: data.not_sold_out_count,
          color: 'hsl(287, 70%, 50%)',
        },
        {
          id: 'Sold',
          label: 'Sold',
          value: data.sold_out_count,
          color: 'hsl(355, 70%, 50%',
        },
      ]
      : [];

  return (
    <>
      <ResponsivePie
        data={lineData}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'paired' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['brighter', 2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'Sold',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'Not_Sold',
            },
            id: 'lines',
          },
        ]}
        legends={[]}
      />
    </>
  );
};

export default ActiveSold;
